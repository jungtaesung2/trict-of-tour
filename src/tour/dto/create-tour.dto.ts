import { PickType } from '@nestjs/mapped-types';
import { Tour } from '../entities/tour.entity';

export class CreateTourDto extends PickType(Tour, [
  'guideId',
  'regionId',
  'title',
  'startDate',
  'endDate',
  'price',
  'tourType',
  'people',
  'image',
  'content',
  'latitude',
  'longitude',
]) {}
