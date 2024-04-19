import { PickType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';
import { Column } from 'typeorm';
import { IsString } from 'class-validator';
export class UpdateUserDto extends PickType(User, [
    `name`,
    `password`,
    `nickname`,
    `phoneNumber`,
]) {
    @IsString()
    name: string;

    @IsString()
    nickname: string;
    
    @IsString()
    email: string;
    
    @IsString()
    phoneumber: string;
    
    @IsString()
    newPassword: string;
    
    @IsString() 
    newPasswordConfirm: string;
}
