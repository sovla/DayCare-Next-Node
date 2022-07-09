import { UpdateReplyDto } from './dto/update-reply.dto';
import { CreateReplyDto } from './dto/create-reply.dto';
import { Injectable, HttpException } from '@nestjs/common';
import { ReviewLike } from '../domain/reviewlike.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment-timezone';
import { Category } from 'src/domain/category.entity';
import { Center } from 'src/domain/center.entity';
import { Review } from 'src/domain/review.entity';
import { Repository } from 'typeorm';
import { User } from 'src/domain/user.entity';

@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,

    @InjectRepository(Center)
    private centerRepository: Repository<Center>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(ReviewLike)
    private reviewLikeRepository: Repository<ReviewLike>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async writeReply(createReviewDto: CreateReplyDto) {}

  async findOne(id: number) {}

  async updateReview(updateReviewDto: UpdateReplyDto) {}

  async removeReview(deleteReviewDto: UpdateReplyDto): boolean {}

  async likeReview(review_id: number, user_id: number) {
    const findReview = await this.reviewRepository.findOne({
      where: {
        id: review_id,
      },
    });

    const findUser = await this.userRepository.findOne({
      where: {
        id: user_id,
      },
    });

    if (!findReview) {
      throw new HttpException('존재하지 않는 리뷰입니다.', 400);
    }

    const findLike = await this.reviewLikeRepository.findOne({
      where: {
        review: findReview,
        user: findUser,
      },
    });

    if (findLike) {
      await this.reviewLikeRepository.delete(findLike);
      return false;
    } else {
      await this.reviewLikeRepository.save({
        user: findUser,
        review: findReview,
      });
      return true;
    }
  }
}
