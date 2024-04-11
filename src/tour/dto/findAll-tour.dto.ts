import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TourType } from '../types/tourtypes.enum';

export class FindAllTourDto {
  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsEnum(TourType)
  tourType?: TourType;

  // @IsString()
  // star : string
}
