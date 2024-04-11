import { PickType } from '@nestjs/mapped-types';
import { ChatMessage } from '../entities/chat.entity';

export class ChatMessageDto extends PickType(ChatMessage, [
  'senderId',
  'receiverId',
  'message',
]) {}
