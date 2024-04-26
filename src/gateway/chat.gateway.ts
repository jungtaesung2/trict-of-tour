import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RedisIoAdapter } from 'src/adapters/redis-io.adapter';
import { ChatService } from 'src/chat/chat.service';

interface User {
  clientId: string;
  userId: number;
}

@WebSocketGateway(4000, { namespace: 'chat' })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly redisIoAdapter: RedisIoAdapter,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.redisIoAdapter.connectToRedis();
  }

  connectedClients: { [socketId: string]: boolean } = {};
  clientNickName: { [socketId: string]: string } = {};
  roomUsers: { [key: string]: string[] } = {};
  users: User[] = [];

  handleConnection(@ConnectedSocket() client: Socket) {
    if (this.connectedClients[client.id]) {
      client.disconnect(true);
      return;
    }
    this.connectedClients[client.id] = true;
    const userId = +client.handshake.query.id;
    this.users.push({ clientId: client.id, userId });
    console.log('New client connected');
  }

  @SubscribeMessage('authenticate')
  handleAuthentication(client: Socket, accessToken: string | string[]) {
    try {
      const userId = this.verifyToken(accessToken);
      if (userId) {
        client.emit('authenticated');
      } else {
        throw new WsException('사용자 인증이 실패했습니다.');
      }
    } catch (error) {
      console.log(error);
      client.emit('unauthorized', { message: '로그인이 필요합니다.' });
      client.disconnect(true);
    }
  }

  verifyToken(token: string | string[]): number | null {
    try {
      if (typeof token !== 'string') {
        throw new WsException('토큰의 형식이 잘못 되었습니다.');
      }
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      });

      if (!payload) {
        throw new WsException('로그인이 필요합니다.');
      }

      const userId = payload.userId;
      return userId;
    } catch (error) {
      console.log(error);
      if (error.message === 'jwt expired') {
        return null;
      }
      throw new WsException('토큰 검증 중 오류가 발생했습니다.');
    }
  }

  @SubscribeMessage('createChatForReservation')
  async handleCreateChatForReservation(@MessageBody() reservationId: number) {
    // const { chatId, guideId, userId } =
    //   await this.chatService.createChatforReservation(reservationId);
    // // if (!guideId) {
    // //   throw new Error('guideId를 찾을 수 없습니다.');
    // // }
    // this.emitChatRoomToUser(guideId, chatId.toString(), userId);
    // this.emitChatRoomToUser(userId, chatId.toString(), guideId);
  }
  emitChatRoomToUser(userId: number, roomId: string, otherUserId: number) {
    const userSocketId = this.users.find(
      (user) => user.userId === userId,
    )?.clientId;

    if (userSocketId) {
      this.server
        .to(userSocketId)
        .emit('chatRoom', { roomId, guideId: userId, userId: otherUserId });
      this.joinRoom(userSocketId, roomId);
    }
  }

  async joinRoom(clientId: string, room: string) {
    const client = this.server.sockets.sockets[clientId];
    if (!client.rooms.has(room)) {
      client.join(room);
      await this.chatService.saveJoinedRoom(room);
      this.updateRoomUsers(room, clientId);
    }
  }

  updateRoomUsers(room: string, clientId: string) {
    const client = this.server.sockets.sockets[clientId];
    const nickname =
      this.clientNickName[clientId] ||
      `User${Math.floor(Math.random() * 10000)}`;

    if (!this.roomUsers[room]) {
      this.roomUsers[room] = [];
    }

    if (!this.roomUsers[room].includes(nickname)) {
      this.roomUsers[room].push(nickname);
    }

    this.server.to(room).emit('userjoined', { userId: nickname, room });
    this.server
      .to(room)
      .emit('userList', { room, userList: this.roomUsers[room] });
    this.server.emit('userList', {
      room: null,
      userList: Object.keys(this.clientNickName),
    });
  }

  @SubscribeMessage('setnickName')
  handleSetNickName(
    @ConnectedSocket() client: Socket,
    @MessageBody() nickname: string,
  ) {
    if (Object.values(this.clientNickName).includes(nickname)) {
      console.log(`중복된 닉네임입니다: ${nickname}`);
      client.emit('errorMessage', '이미 사용하고 있는 닉네임입니다..');
      return;
    }

    this.clientNickName[client.id] = nickname;
    client.emit('nicknameSet', nickname);
  }

  @SubscribeMessage('exit')
  handleExist(@ConnectedSocket() client: Socket) {
    Object.keys(client.rooms).forEach((room) => {
      client.leave(room);
      const index = this.roomUsers[room]?.indexOf(
        this.clientNickName[client.id],
      );
      if (index !== -1) {
        this.roomUsers[room].splice(index, 1);
        this.server.to(room).emit('userLeft'),
          { userId: this.clientNickName[client.id] };
        this.server
          .to(room)
          .emit('userList', { room, userList: this.roomUsers[room] });
      }
    });
    this.server.emit('userList', {
      room: null,
      userList: Object.keys(this.connectedClients),
    });
  }

  @SubscribeMessage('getUserList')
  handleGetUserList(
    @ConnectedSocket() client: Socket,
    @MessageBody() room: string,
  ) {
    if (!room || !this.roomUsers[room]) {
      client.emit('invalidRoom');
      return;
    }
    const userList = this.roomUsers[room];
    client.emit('userList', { room, userList });
  }

  @SubscribeMessage('chatMessage')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { message: string; room: string },
  ) {
    const user = this.users.find((el) => el.clientId === client.id);
    if (!user) {
      throw new WsException('사용자를 찾을 수 없습니다.');
    }
    this.server.to(data.room).emit('chatMessage', {
      userId: user.userId,
      message: data.message,
      room: data.room,
    });
    await this.chatService.saveChatMessage({
      message: data.message,
      room: data.room,
      userId: user.userId,
    });
  }
}
