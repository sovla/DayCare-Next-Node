import { IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
  category_id?: number;

  center_id?: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  image1?: File;

  image2?: File;

  image3?: File;

  image4?: File;

  image5?: File;
}
