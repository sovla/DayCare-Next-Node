import { IsNotEmpty } from 'class-validator';

export class DeleteReplyDTO {
  @IsNotEmpty({ message: '필수값 review_id가 없습니다.' })
  reply_id: number;

  @IsNotEmpty({ message: '필수값 id가 없습니다.' })
  id: number;
}
