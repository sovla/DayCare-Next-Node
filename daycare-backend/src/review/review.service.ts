import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/domain/category.entity';
import { Center } from 'src/domain/center.entity';
import { Review } from 'src/domain/review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
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
  ) {}

  writeReview(createReviewDto: CreateReviewDto) {
    return 'This action adds a new review';
  }

  findOne(type: string, id: number) {
    if (type === 'center_id') {
      const center_id = id;
      const findCenter = this.centerRepository.findOne({
        where: {
          id: center_id,
        },
      });
      if (!findCenter) {
        throw new HttpException('존재하지 않는 어린이집입니다.', 400);
      }

      const findReviews = this.reviewRepository.find({
        where: {
          center_id: center_id,
        },
      });

      return findReviews;
    }

    if (type === 'category_id') {
      const category_id = id;
      const findCategory = this.categoryRepository.findOne({
        where: {
          id: category_id,
        },
      });
      if (!findCategory) {
        throw new HttpException('존재하지 않는 어린이집입니다.', 400);
      }

      const findReviews = this.reviewRepository.find({
        where: {
          category_id: category_id,
        },
      });

      return findReviews;
    }
  }

  updateReview(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  removeReview(id: number) {
    return `This action removes a #${id} review`;
  }
}
