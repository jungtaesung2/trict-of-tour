import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@WebSocketGateway()
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('createChat')
  creat(@MessageBody() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @SubscribeMessage('findAllchat')
  findAll() {
    return this.chatService.findAllchat();
  }

  @SubscribeMessage('findAllchat')
  findOne(@MessageBody() id: number) {
    return this.chatService.findOnebyId(id);
  }
  // // 업데이트
  // @SubscribeMessage('')
  // update(@MessageBody() id: number , updateChatDto: UpdateChatDto) {
  //   return this.chatService.update(id, updateChatDto);
  // }

  @SubscribeMessage('removeChat')
  remove(@MessageBody() id: number) {
    return this.chatService.remove(id);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
