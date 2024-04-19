import { IsNotEmpty, IsString } from "class-validator";
import { User } from "../entities/user.entity";
import { PickType } from "@nestjs/mapped-types";
import { Column } from "typeorm";

export class CreateUserDto extends PickType(User, [
    `name`,
    `password`,
    `email`,
    `tourType`,
    `nickname`,
    `phoneNumber`
  ]) {
    // @IsNotEmpty( {message: '이름을 입력해주세요.'} )
    // name: string;
  
    // @IsNotEmpty({message: '비밀번호를 입력해주세요.'})
    // password: string;

    // @IsNotEmpty({ message: '이메일을 입력해주세요.' })
    // email: string;

    @IsString()
    @Column( { type: "varchar", select : false, nullable : false } )
    @IsNotEmpty({message: '확인 비밀번호를 입력해주세요.'})
    confirmpassword: string;

    // @IsNotEmpty({ message: '투어타입을 입력해주세요' })
    // tourType: string;
      
    // @IsNotEmpty({ message: '전화번호를 입력해주세요.' })
    // phoneNumber: string;
  }

