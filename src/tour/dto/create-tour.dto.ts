import { PickType } from '@nestjs/mapped-types';

// import { CreateRegionDto } from './create-region.dto';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { Tour } from '../entities/tour.entity';

export class CreateTourDto extends PickType(Tour, [
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
