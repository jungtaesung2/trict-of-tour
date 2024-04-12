import { PickType } from '@nestjs/mapped-types';
import { Chat } from '../entities/chat.entity';

export class CreateChatDto extends PickType(Chat, [
  'title',
  'sender',
  'recipient',
]) {}
