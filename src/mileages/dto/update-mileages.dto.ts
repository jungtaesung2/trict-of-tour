import { PickType } from '@nestjs/mapped-types';
import { Mileage } from '../entities/mileages.entity';

export class UpdateMilegeDto extends PickType(Mileage, ['mileageAmount']) {
}