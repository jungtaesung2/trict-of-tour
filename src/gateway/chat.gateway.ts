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
import { TourService } from 'src/tour/tour.service';

interface Client {
  id: number;
  isGuide: boolean;
}

@WebSocketGateway(4000, { namespace: 'chat' })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly redisIoAdapter: RedisIoAdapter,
    private readonly tourService: TourService,
  ) {
    this.redisIoAdapter.connectToRedis();
  }

  connectedClients: { [socketId: string]: Client } = {};
  roomUsers: { [key: string]: string[] } = {};
  // users: User[] = [];
  // guides: Guide[] = [];

  handleConnection(@ConnectedSocket() client: Socket) {
    if (this.connectedClients[client.id]) {
      client.disconnect(true);
      return;
    }
    const { id, isGuide } = client.handshake.query;
    console.log(client.handshake.query);

    const userType = isGuide === 'true' ? 'Guide' : 'User';
    this.connectedClients[client.id] = { id: +id, isGuide: isGuide === 'true' };
    console.log(`New ${userType} client connected`);
  }

  @SubscribeMessage('joinRoom') //유저든 가이드든 상관없이 특정 룸에 조인, 조인하기 전 권한 확인 필요
  async handlejoinRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: { room: string },
  ) {
    const joinedSocket = this.connectedClients[socket.id];

    const chat = await this.chatService.getChatbyRoom(data.room);
    if (joinedSocket.isGuide && chat.guide.id === joinedSocket.id) {
      socket.join(data.room);
    } else if (!joinedSocket.isGuide && chat.user.id === joinedSocket.id) {
      socket.join(data.room);
    }
  }

  @SubscribeMessage('joinChatForInquiry')
  async handleCreateChat(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: { tourId: number },
  ) {
    const tourId = data.tourId;

    try {
      // 사용자 및 가이드의 소켓 확인
      const userSocket = this.connectedClients[socket.id];
      const userId = userSocket.id;
      const chat = await this.tourService.createChatForTour(tourId, userId);

      // 새로운 채팅방 생성
      await this.chatService.saveChatRoom(chat.id + '', chat.id);
      // console.log('chat', chat);
      const guideId = chat.guide.id;
      const guideSocket = Object.values(this.connectedClients).find(
        (client) => client.id === guideId && client.isGuide,
      );

      // 사용자가 소켓에 연결되어 있고, 사용자의 id가 userId와 일치하는 경우
      if (userSocket && userSocket.id === chat.user.id) {
        // 채팅방에 사용자를 추가하고, 가이드가 소켓에 연결되어 있다면 가이드에게 채팅방 알림 전송
        socket.join(chat.id + '');
        if (guideSocket) {
          this.server
            .to(this.getSocketIdByUserId(guideId))
            .emit('chatRoom', { room: chat.id + '' });
        }
      }
      // 가이드가 소켓에 연결되어 있고, 가이드의 id가 guideId와 일치하는 경우
      else if (guideSocket && guideSocket.id === guideId) {
        // 채팅방에 가이드를 추가하고, 사용자가 소켓에 연결되어 있다면 사용자에게 채팅방 알림 전송
        socket.join(chat.id + '');
        if (userSocket) {
          this.server
            .to(this.getSocketIdByUserId(chat.user.id))
            .emit('chatRoom', { room: chat.id + '' });
        }
      }
    } catch (error) {
      throw new WsException('채팅방을 생성할 수 없습니다.');
    }
  }

  @SubscribeMessage('exit')
  handleExit(@ConnectedSocket() client: Socket) {
    Object.keys(client.rooms).forEach((room) => {
      client.leave(room);

      const userId = this.connectedClients[client.id]?.id;
      const isGuide = this.connectedClients[client.id]?.isGuide || false;

      if (userId) {
        const index = this.roomUsers[room]?.indexOf(userId.toString());
        if (index !== -1) {
          this.roomUsers[room].splice(index, 1);
          this.server.to(room).emit('userLeft', { userId, isGuide });
          this.server
            .to(room)
            .emit('userList', { room, userList: this.roomUsers[room] });
        }
      }
    });

    this.server.emit('userList', {
      room: null,
      userList: Object.keys(this.connectedClients),
    });
  }

  @SubscribeMessage('chatMessage')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { message: string; room: string },
  ) {
    const user = this.connectedClients[client.id];
    if (!user) {
      throw new WsException('사용자를 찾을 수 없습니다.');
    }

    // 현재 채팅방에 참여중인 가이드의 정보
    const guideSocket = Object.values(this.connectedClients).find(
      (client) => client.isGuide && client.id === user.id,
    );

    // 가이드가 있을 경우 guideId 변수에 가이드의 id 저장, 없을 경우 null
    const guideId = guideSocket ? guideSocket.id : null;

    this.server.to(data.room).emit('chatMessage', {
      userId: user.id,
      isGuide: user.isGuide,
      guideId: guideId,
      message: data.message,
      room: data.room,
    });
    await this.chatService.saveChatMessage({
      message: data.message,
      room: data.room,
      userId: user.id,
      guideId: guideId,
    });
  }

  private getSocketIdByUserId(userId: number): string | undefined {
    const socketIds = Object.keys(this.connectedClients);

    for (const socketId of socketIds) {
      if (this.connectedClients[socketId].id === userId) {
        return socketId;
      }
    }

    return undefined;
  }
}
