import { PickType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';
import { Column } from 'typeorm';

export class UpdateUserDto extends PickType(User, [
    `name`,
    `password`,
    `nickname`,
    `phoneNumber`,
]) {

    @Column({ type: 'varchar', length: 30, default : null})
    name: string;

    @Column({ type: 'varchar', length: 30, default : null})
    nickname: string;
    
    @Column({ type: 'varchar', length: 30, default : null})
    email: string;
    
    @Column({ type: 'varchar', length: 12, default : null})
    phoneumber: string;
    
    @Column({ type: 'varchar', default : null})
    newPassword: string;
    
    @Column({ type: 'varchar', default : null })
    newPasswordConfirm: string;
}
