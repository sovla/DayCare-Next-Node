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
import { JWTGuard } from 'src/user/guard/jwt.guard';

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

  @Patch(':id')
  @UseGuards(JWTGuard)
  @UsePipes(ValidationPipe)
  updateReview(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewService.updateReview(+id, updateReviewDto);
  }

  @Delete()
  @UseGuards(JWTGuard)
  removeReview(@Body() id: string) {
    return this.reviewService.removeReview(+id);
  }
}
