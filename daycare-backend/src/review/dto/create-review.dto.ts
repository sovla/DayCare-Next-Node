import { IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  id: number;

  category_id?: number;

  center_id?: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;
}
