import { IsNotEmpty } from 'class-validator';

export class DeleteReviewDTO {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  review_id: number;
}
