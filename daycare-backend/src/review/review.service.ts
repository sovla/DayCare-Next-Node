import { ReviewLike } from '../domain/reviewlike.entity';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment-timezone';
import { Category } from 'src/domain/category.entity';
import { Center } from 'src/domain/center.entity';
import { Review } from 'src/domain/review.entity';
import { IsNull, Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { DeleteReviewDTO } from './dto/delete-review.dto.ts';
import { UpdateReviewDto } from './dto/update-review.dto';
import { User } from 'src/domain/user.entity';

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

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async writeReview(createReviewDto: CreateReviewDto) {
    if (
      createReviewDto.category_id == null &&
      createReviewDto.center_id == null
    ) {
      throw new HttpException('필수 값이 없습니다.', 401);
    }

    if (createReviewDto.category_id) {
      const findUser = await this.userRepository.findOne({
        select: {
          id: true,
        },
        where: {
          id: createReviewDto.id,
        },
      });
      if (!findUser) {
        throw new HttpException('찾을 수 없는 회원입니다.', 401);
      }

      const saveReview = await this.reviewRepository.save({
        title: createReviewDto.title,
        category_id: createReviewDto.category_id,
        content: createReviewDto.content,
        user: findUser,
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

      const findReviews = await this.reviewRepository
        .createQueryBuilder('review')
        .where(`center_id=${center_id}`)
        .leftJoin('review.likes', 'likes')
        .loadRelationCountAndMap('review.like_count', 'review.likes')
        .getMany();

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
      // const findReviews = await this.reviewRepository
      //   .createQueryBuilder('review')
      //   .where('review.category_id = :category_id', { category_id })
      //   .andWhere('review.delete_date IS NOT NULL')
      //   .leftJoinAndSelect('review.user_id', 'user')
      //   .getMany();

      const findReviews = await this.reviewRepository.find({
        select: {
          category_id: true,
          center_id: true,
          content: true,
          delete_date: true,
          id: true,
          likes: true,
          reply: true,
          title: true,
          update_date: true,
          view_count: true,
          write_date: true,
          user: {
            id: true,
            name: true,
          },
        },
        where: {
          category_id: category_id,
          delete_date: IsNull(),
        },
        order: {
          id: 'desc',
        },
        relations: ['user'],
      });
      return findReviews.map((v) => ({
        ...v,
        likes: v.likes.length,
        reply: v.reply.filter((v) => v.delete_date == null).length,
      }));
    }

    if (type === 'review_id') {
      const review_id = id;
      const findReview = await this.reviewRepository.findOne({
        where: {
          id: review_id,
        },
        relations: ['user'],
      });
      const saveReview = await this.reviewRepository.save({
        ...findReview,
        view_count: findReview.view_count + 1,
      });
      if (!findReview) {
        throw new HttpException('존재하지 않는 리뷰 입니다.', 400);
      }
      return {
        ...findReview,
        user: {
          id: findReview.user.id,
          name: findReview.user.name,
          email: findReview.user.email,
        },
        reply: findReview.reply
          .filter((v) => v.delete_date == null)
          .map((v) => ({
            ...v,
            user: {
              id: v.user.id,
              name: v.user.name,
              email: v.user.email,
            },
            likes: v.likes.map((v) => ({ user_id: v.user.id })),
          })),
      };
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
