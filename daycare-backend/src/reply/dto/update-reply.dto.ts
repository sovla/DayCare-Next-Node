import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateReplyDto } from './create-reply.dto';

export class UpdateReplyDto extends PartialType(CreateReplyDto) {
  @IsNotEmpty({ message: '필수값 review_id가 없습니다.' })
  review_id: number;

  @IsNotEmpty({ message: '필수값 content가 없습니다.' })
  content: string;

  @IsNotEmpty({ message: '필수값 id가 없습니다.' })
  id: number;
}
