import { PickType } from '@nestjs/mapped-types';
import { Guide } from '../entities/guide.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class CreateGuideDto extends PickType(Guide, [
  'email',
  'password',
  'name',
  'tourType',
  'fileUrl',
]) {
  @IsString()
  @Column({ type: 'varchar', select: false, nullable: false })
  @IsNotEmpty({ message: '확인 비밀번호를 입력해주세요.' })
  confirmpassword: string;
}
