import { PickType } from '@nestjs/mapped-types';
import { Tour } from '../entities/tour.entity';
// import { CreateRegionDto } from './create-region.dto';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTourDto extends PickType(Tour, [
  'guideId',
  'title',
  'startDate',
  'endDate',
  'price',
  'tourType',
  'people',
  'content',
  'latitude',
  'longitude',
]) {
  // @ValidateNested()
  // @Type(() => CreateRegionDto)
  @IsNumber()
  regionId: number;
}
