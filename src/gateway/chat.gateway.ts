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

  @SubscribeMessage('joinChatForInquiry')
  async handleCreateChatForReservation(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: { tourId: number },
  ) {
    const tourId = data.tourId;
    console.log(data.tourId);

    // const chatId = data.chatId;
    // console.log(data.chatId);

    const chat = await this.tourService.createChatForTour(tourId);

    const { userId, guideId } = await this.chatService.getParticipantsByChatId(
      chat.id,
    );

    const userSocket = this.connectedClients[socket.id];
    const guideSocket = Object.values(this.connectedClients).find(
      (client) => client.id === guideId && client.isGuide,
    );
    if (userSocket && userSocket.id === userId) {
      socket.join(chat.id + '');
      if (guideSocket) {
        this.server
          .to(this.getSocketIdByUserId(guideId))
          .emit('chatRoom', { roomId: chat.id });
      }
    } else if (guideSocket && guideSocket.id === guideId) {
      socket.join(chat.id + '');
      if (userSocket) {
        this.server
          .to(this.getSocketIdByUserId(userId))
          .emit('chatRoom', { roomId: chat.id });
      }
    }
    await this.chatService.saveChatRoom(chat.id);
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
    this.server.to(data.room).emit('chatMessage', {
      userId: user.id,
      message: data.message,
      room: data.room,
    });
    await this.chatService.saveChatMessage({
      message: data.message,
      room: data.room,
      userId: user.id,
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
