import { PartialType } from '@nestjs/mapped-types';
import { CreateCenterDto } from './create-center.dto';

export class UpdateCenterDto extends PartialType(CreateCenterDto) {}
