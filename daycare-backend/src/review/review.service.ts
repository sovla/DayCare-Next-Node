import { ReviewLike } from './../domain/revielike.entity';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment-timezone';
import { Category } from 'src/domain/category.entity';
import { Center } from 'src/domain/center.entity';
import { Review } from 'src/domain/review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { DeleteReviewDTO } from './dto/delete-review.dto.ts';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,

    @InjectRepository(Center)
    private centerRepository: Repository<Center>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(ReviewLike)
    private reviewLikeRepository: Repository<ReviewLike>,
  ) {}

  async writeReview(createReviewDto: CreateReviewDto) {
    if (
      createReviewDto.category_id == null &&
      createReviewDto.center_id == null
    ) {
      throw new HttpException('필수 값이 없습니다.', 401);
    }

    if (createReviewDto.category_id) {
      const saveReview = await this.reviewRepository.save({
        title: createReviewDto.title,
        category_id: createReviewDto.category_id,
        content: createReviewDto.content,
        user_id: createReviewDto.id,
        write_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      });
      return saveReview;
    }

    if (createReviewDto.center_id) {
      const saveReview = await this.reviewRepository.save({
        title: createReviewDto.title,
        center_id: createReviewDto.center_id,
        content: createReviewDto.content,
        user_id: createReviewDto.id,
        write_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      });
      return saveReview;
    }
  }

  async findOne(type: string, id: number) {
    if (type === 'center_id') {
      const center_id = id;
      const findCenter = await this.centerRepository.findOne({
        where: {
          id: center_id,
        },
      });
      if (!findCenter) {
        throw new HttpException('존재하지 않는 어린이집입니다.', 400);
      }

      const findReview = await this.reviewRepository.findOne({
        where: {
          center_id: center_id,
        },
      });
      const { length } = await this.reviewLikeRepository.find({
        where: { review_id: findReview.id },
      });
      await this.reviewRepository.save({
        ...findReview,
        like_count: length,
      });

      const findReviews = await this.reviewRepository.find({
        where: {
          center_id: center_id,
        },
      });
      return findReviews;
    }

    if (type === 'category_id') {
      const category_id = id;
      const findCategory = await this.categoryRepository.findOne({
        where: {
          id: category_id,
        },
      });
      if (!findCategory) {
        throw new HttpException('존재하지 않는 어린이집입니다.', 400);
      }

      const findReview = await this.reviewRepository.findOne({
        where: {
          category_id: category_id,
        },
      });
      const { length } = await this.reviewLikeRepository.find({
        where: { review_id: findReview.id },
      });
      await this.reviewRepository.save({
        ...findReview,
        like_count: length,
      });

      const findReviews = await this.reviewRepository.find({
        where: {
          category_id: category_id,
        },
      });

      return findReviews;
    }
  }

  async updateReview(updateReviewDto: UpdateReviewDto) {
    const findReview = await this.reviewRepository.findOne({
      where: {
        id: updateReviewDto.review_id,
      },
    });
    if (!findReview) {
      throw new HttpException('존재하지 않는 리뷰입니다.', 400);
    }

    const saveReview = await this.reviewRepository.save({
      ...findReview,
      title: updateReviewDto.title,
      content: updateReviewDto.content,
    });

    return saveReview;
  }

  async removeReview(deleteReviewDto: DeleteReviewDTO) {
    const findReview = await this.reviewRepository.findOne({
      where: {
        user_id: deleteReviewDto.id,
        id: deleteReviewDto.review_id,
      },
    });

    if (!findReview) {
      throw new HttpException('존재하지 않는 리뷰입니다.', 400);
    }

    const saveReview = this.reviewRepository.save({
      ...findReview,
      delete_date: moment().format('YYYY-MM-DD HH:mm:ss'),
    });

    return saveReview;
  }

  async likeReview(review_id: number, user_id: number) {
    const findReview = await this.reviewRepository.findOne({
      where: {
        id: review_id,
      },
    });

    if (!findReview) {
      throw new HttpException('존재하지 않는 리뷰입니다.', 400);
    }

    const findLike = await this.reviewLikeRepository.findOne({
      where: {
        review_id: review_id,
        user_id: user_id,
      },
    });

    if (findLike) {
      await this.reviewLikeRepository.delete(findLike);
      return false;
    } else {
      await this.reviewLikeRepository.save({
        review_id: review_id,
        user_id: user_id,
      });
      return true;
    }
  }
}
