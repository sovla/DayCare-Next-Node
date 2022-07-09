import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Res,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Response } from 'express';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  writeReview(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.writeReview(createReviewDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const [type, typeId] = id.split('=');

    const findReviews = await this.reviewService.findOne(type, +typeId);

    if (findReviews) {
      res.statusCode = 200;
      return res.send({
        statusCode: res.statusCode,
        message: '리뷰 받아오기 완료',
        review: findReviews,
      });
    }
  }

  @Patch(':id')
  updateReview(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewService.updateReview(+id, updateReviewDto);
  }

  @Delete()
  removeReview(@Body() id: string) {
    return this.reviewService.removeReview(+id);
  }
}
