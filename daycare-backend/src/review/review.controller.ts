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
  Query,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Response } from 'express';
import { JWTGuard } from './guard/jwt.guard';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('/like/:review_id')
  // review/like/[review_id] 로 컨트롤
  async likeReview(
    @Param('review_id') review_id: number,
    // 파라미터로 전달되는 리뷰 아이디
    @Query('id') id: number,
    // 쿼리스트링으로 전달되는 유저 아이디 값
    @Res() res: Response,
  ) {
    const result = await this.reviewService.likeReview(+review_id, +id);

    res.statusCode = 200;

    return res.send({
      message: '좋아요 완료',
      statusCode: res.statusCode,
      like: result,
    });
  }

  @Post()
  @UsePipes(ValidationPipe)
  // usePipes 를 통해 아래에 만든 Dto 클래스에 지정한 정규식에 맞는지 확인후 맞지 않을경우 에러
  // @UseGuards(JWTGuard)
  // 리뷰 작성의 경우 유저 권한이 있어야만 가능해 JWT Guard를 통해 JWT토큰 여부를 확인하였습니다.
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
  @Get('/category/:id')
  async findListByCategoryId(
    @Param('id') id: string,
    @Query('page') page: string,
    @Res() res: Response,
  ) {
    // category_id 를 param 으로 받아옵니다.
    // 페이징 기능을 위한 page 변수를 쿼리스트링으로 받아옵니다
    console.log('카테고리기준');
    const result = await this.reviewService.findListByCategoryId(+id, +page);

    if (result.findReviews) {
      res.statusCode = 200;
      return res.send({
        statusCode: res.statusCode,
        message: '리뷰 받아오기 완료',
        review: result.findReviews,
        totalCount: result.totalCount,
      });
    }
  }
  @Get('/center/:id')
  async findListByCenterId(
    @Param('id') id: string,
    @Query('page') page: string,
    @Res() res: Response,
  ) {
    // 2022-08-06 준한
    // center_id 를 param 으로 받아옵니다.
    // 페이징 기능을 위한 page 변수를 쿼리스트링으로 받아옵니다

    console.log('센터기준');
    const result = await this.reviewService.findListByCenterId(+id, +page);

    if (result.findReviews) {
      res.statusCode = 200;
      return res.send({
        statusCode: res.statusCode,
        message: '리뷰 받아오기 완료',
        review: result.findReviews,
        totalCount: result.totalCount,
      });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    // review_id 를 param 으로 받아옵니다.

    const findReviews = await this.reviewService.findOne(+id);

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
  // Patch: 리소스의 일부를 업데이트 한다
  @UsePipes(ValidationPipe)
  @UseGuards(JWTGuard)
  // 정규식 및 JWT 확인 과정
  async updateReview(
    @Body() updateReviewDto: UpdateReviewDto,
    @Res() res: Response,
  ) {
    const updateReview = await this.reviewService.updateReview(updateReviewDto);

    res.statusCode = 200;

    return res.send({
      statusCode: res.statusCode,
      message: '리뷰 변경 완료',
      review: updateReview,
    });
  }

  @Delete()
  // review Method Delete 요청에 대한 캐치
  @UsePipes(ValidationPipe)
  @UseGuards(JWTGuard)
  // 정규식 및 JWT 체크
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
