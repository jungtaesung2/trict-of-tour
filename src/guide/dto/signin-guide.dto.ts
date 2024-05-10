import { PickType } from '@nestjs/mapped-types';
import { Guide } from '../entities/guide.entity';

export class SignInGuideDto extends PickType(Guide, ['email', 'password']) {}
