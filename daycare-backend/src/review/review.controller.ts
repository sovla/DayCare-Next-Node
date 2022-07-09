import { DeleteReviewDTO } from './dto/delete-review.dto.ts';
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
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Response } from 'express';
import { JWTGuard } from './guard/jwt.guard';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(JWTGuard)
  async writeReview(
    @Body() createReviewDto: CreateReviewDto,
    @Res() res: Response,
  ) {
    const saveReview = await this.reviewService.writeReview(createReviewDto);
    if (!saveReview) {
      throw new HttpException('리뷰 저장에 실패했습니다', 400);
    }
    res.statusCode = 200;

    return res.send({
      message: '리뷰 작성 완료',
      statusCode: res.statusCode,
      review: saveReview,
    });
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

  @Patch()
  @UseGuards(JWTGuard)
  @UsePipes(ValidationPipe)
  async updateReview(
    @Body() updateReviewDto: UpdateReviewDto,
    @Res() res: Response,
  ) {
    const saveReview = await this.reviewService.updateReview(updateReviewDto);

    res.statusCode = 200;

    return res.send({
      statusCode: res.statusCode,
      message: '리뷰 변경 완료',
      review: saveReview,
    });
  }

  @Delete()
  @UseGuards(JWTGuard)
  async removeReview(
    @Body() deleteReviewDto: DeleteReviewDTO,
    @Res() res: Response,
  ) {
    await this.reviewService.removeReview(deleteReviewDto);
    res.statusCode = 200;
    return res.send({
      statusCode: res.statusCode,
      message: '리뷰 삭제 완료',
    });
  }
}
