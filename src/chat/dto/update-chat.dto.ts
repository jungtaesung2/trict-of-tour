import { PartialType } from '@nestjs/mapped-types';
import { CreateChatDto } from '../dto/create-chat.dto';

export class UpdateChatDto extends PartialType(CreateChatDto) {
  id: number;
}
