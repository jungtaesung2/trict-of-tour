import { InjectRepository } from '@nestjs/typeorm';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from 'src/chat/chat.service';

@WebSocketGateway(4000, { namespace: 'chat' }) // 안에 port와 namespace를 속성으로 넣어줄 수 있다.
export class ChatGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly chatService: ChatService) {}

  connectedClients: { [socketId: string]: boolean } = {};
  clientNickName: { [socketId: string]: string } = {};
  roomUsers: { [key: string]: string[] } = {};

  handleConnection(@ConnectedSocket() client: Socket) {
    // 이미 연결된 클라이언트인지 확인
    if (this.connectedClients[client.id]) {
      client.disconnect(true);
      return;
    }
    this.connectedClients[client.id] = true;

    console.log('New client connected');
  }

  @SubscribeMessage('setnickName')
  handleSetNickName(
    @ConnectedSocket() client: Socket,
    @MessageBody() nickname: string,
  ) {
    // 이미 닉네임이 설정된 경우 오류 메시지 전송
    if (Object.values(this.clientNickName).includes(nickname)) {
      console.log(`중복된 닉네임입니다: ${nickname}`);
      client.emit('errorMessage', '이미 사용하고 있는 닉네임입니다..');
      return;
    }

    // 중복이 없다면 닉네임을 설정
    this.clientNickName[client.id] = nickname;

    client.emit('nicknameSet', nickname);
  }

  @SubscribeMessage('join')
  async handleJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody() room: string,
  ) {
    if (!client.rooms.has(room)) {
      client.join(room);

      await this.chatService.saveJoinedRoom(room);

      if (!this.roomUsers[room]) {
        this.roomUsers[room] = [];
      }
    }
    const nickname = this.clientNickName[client.id];

    if (!this.roomUsers[room]) {
      this.roomUsers[room] = [];
    }

    if (!this.roomUsers[room].includes(nickname)) {
      this.roomUsers[room].push(nickname);
    }

    // 새로운 사용자가 채팅방에 참여한 것을 알림
    this.server.to(room).emit('userjoined', { userId: nickname, room });

    // 해당 채팅방에 있는 모든 사용자에게 사용자 목록을 업데이트
    this.server
      .to(room)
      .emit('userList', { room, userList: this.roomUsers[room] });

    // 모든 클라이언트에게 전체 사용자 목록 업데이트 알림을 보냄
    this.server.emit('userList', {
      room: null,
      userList: Object.keys(this.clientNickName),
    });
  }

  @SubscribeMessage('exit')
  handleExist(@ConnectedSocket() client: Socket, @MessageBody() room: string) {
    // 방에 접속되어 있지 않은 경우 무시!!!
    if (!client.rooms.has(room)) {
      return;
    }
    client.leave(room);

    const index = this.roomUsers[room]?.indexOf(this.clientNickName[client.id]);
    {
      this.roomUsers[room].splice(index, 1);
      this.server.to(room).emit('userLeft'),
        { userId: this.clientNickName[client.id] };
      // 떠난 이후 방에 남아 있는 있는 userList 에도 반영이 될테니깐
      this.server
        .to(room)
        .emit('userList', { room, userList: this.roomUsers[room] });

      // 모든 방의 유저 목록을 업데이트하여 emit
      this.server.emit('userList', {
        room: null,
        userList: Object.keys(this.connectedClients),
      });
    }
  }

  @SubscribeMessage('getUserList')
  handleGetUserList(
    @ConnectedSocket() client: Socket,
    @MessageBody() room: string,
  ) {
    // 방 이름이 유효한지 확인
    if (!room || !this.roomUsers[room]) {
      // 클라이언트에게 유효하지 않은 방을 요청했다는 메시지를 보낸다.
      client.emit('invalidRoom');
      return;
    }
    // 해당 방에 속한 사용자 목록을 클라이언트에게 반환
    const userList = this.roomUsers[room];

    // 사용자 목록이 올바르게 포함된 'userList' 이벤트를 클라이언트에게 전송
    client.emit('userList', { room, userList });
  }

  @SubscribeMessage('chatMessage')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { message: string; room: string },
  ) {
    // 클라이언트가 보낸 채팅 메시지를 해당 방으로 전달하기!
    this.server.to(data.room).emit('chatMessage', {
      userId: this.clientNickName[client.id],
      message: data.message,
      room: data.room,
    });
    await this.chatService.saveChatMessage(data);
  }
}
