import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(4000, { namespace: 'chat' }) // 안에 port와 namespace를 속성으로 넣어줄 수 있다.
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  connectedClients: { [socketId: string]: boolean } = {};
  clientName: { [socketId: string]: string } = {};
  roomUsers: { [key: string]: string[] } = {};

  //client.emit(). 연결된 소켓 인스턴스에 액세스하려면 @ConnectedSocket()데코레이터를 사용
  handleConnection(@ConnectedSocket() client: Socket): void {
    // 이미 연결된 클라이언트인지 확인
    if (this.connectedClients[client.id]) {
      client.disconnect(true);
      return;
    }
    this.connectedClients[client.id] = true;
  }

  handleDisconnect(client: Socket): void {
    delete this.connectedClients[client.id];
  }

  @SubscribeMessage('chatMessage')
  handleChatMessage(
    @MessageBody() data: { message: string; room: string },
    @ConnectedSocket() client: Socket,
  ): void {
    //클라이언트가 보낸 채팅 메시지를 해당 방으로 전달합니다.
    this.server.to(data.room).emit('chatMessage', {
      userId: this.clientName[client.id],
      message: data.message,
      room: data.room,
    });
  }
}
