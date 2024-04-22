import { PickType } from '@nestjs/mapped-types';
import { Mileage } from '../entities/mileages.entity';
import { IsInt, Min } from 'class-validator';

export class CreateMileageDto extends PickType(
    Mileage,
    ['mileageAmount']) {
    @IsInt()
    @Min(0)
    mileageAmount: number;
}