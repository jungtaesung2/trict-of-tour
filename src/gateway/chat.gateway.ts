import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserService } from 'src/user/user.service';

@WebSocketGateway(4000, { namespace: 'chat' }) // 안에 port와 namespace를 속성으로 넣어줄 수 있다.
export class ChatGateway {
  @WebSocketServer()
  server: Server;
  userService: UserService;

  connectedClients: { [socketId: string]: boolean } = {};
  clientNickName: { [socketId: string]: string } = {};
  roomUsers: { [key: string]: string[] } = {};

  handleConnection(@ConnectedSocket() client: Socket): void {
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
    @MessageBody() nick: string,
  ) {
    this.clientNickName[client.id] = nick;
    console.log('닉네임 설정', nick);
  }

  @SubscribeMessage('join')
  handleJoin(@ConnectedSocket() client: Socket, @MessageBody() room: string) {
    if (client.rooms.has(room)) {
      return;
    }

    client.join(room);

    if (!this.roomUsers[room]) {
      this.roomUsers[room] = [];
    }

    this.roomUsers[room].push(this.clientNickName[client.id]);
    this.server
      .to(room)
      .emit('userjoined', { userId: this.clientNickName[client.id], room });
    this.server
      .to(room)
      .emit('userList', { room, userList: this.roomUsers[room] });

    this.server.emit('userList'),
      { room: null, userList: Object.keys(this.connectedClients) };
  }

  @SubscribeMessage('exit')
  handleExist(
    @ConnectedSocket() client: Socket,
    @MessageBody() room: string,
  ): void {
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
  ): void {
    this.server
      .to(room)
      .emit('userList', { room, userList: this.roomUsers[room] });
  }

  @SubscribeMessage('chatMessage')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { message: string; room: string },
  ): void {
    // 클라이언트가 보낸 채팅 메시지를 해당 방으로 전달하기!
    this.server.to(data.room).emit('chatMessage', {
      userId: this.clientNickName[client.id],
      message: data.message,
      room: data.room,
    });
  }
}
