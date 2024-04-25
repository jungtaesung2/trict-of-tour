import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLikeDto {
  @IsNotEmpty({ message: '투어 ID를 입력해주세요' })
  @IsNumber()
  tourId: number;

  // @IsNotEmpty({ message: '유저 ID를 입력해주세요' })
  // @IsNumber()
  // userId: number;
}
