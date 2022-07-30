import { IsNotEmpty } from 'class-validator';

export class LikeDto {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  center_id: string;
}
