/* eslint-disable prefer-const */
import { Reply } from 'src/domain/reply.entity';
import { ReviewLike } from '../domain/reviewlike.entity';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment-timezone';
import { Category } from 'src/domain/category.entity';
import { Center } from 'src/domain/center.entity';
import { Review } from 'src/domain/review.entity';
import { Brackets, IsNull, Repository, SelectQueryBuilder } from 'typeorm';
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

    @InjectRepository(Reply)
    private replyRepository: Repository<Reply>,
  ) {}

  async writeReview(createReviewDto: CreateReviewDto) {
    // 리뷰 작성 서비스

    const findUser = await this.userRepository.findOne({
      select: {
        id: true,
        // 필요한 id 값만 셀렉트
      },
      where: {
        id: createReviewDto.id,
        delete_account: 0,
        // 탈퇴한 회원인지 조회
      },
    });
    if (!findUser) {
      // 정상적인 유저인가 확인 하는 과정
      throw new HttpException('찾을 수 없는 회원입니다.', 401);
    }

    const saveReview = await this.reviewRepository.save({
      title: createReviewDto.title,
      category_id: createReviewDto?.category_id ?? null,
      center_id: createReviewDto?.center_id ?? null,
      content: createReviewDto.content,
      user: findUser,
      write_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      // 타이틀, 내용, id값, user_id 값을 저장 해주고 날짜를 TimeStamp 에 맞는 형식으로 변경 2022-07-31 10:00:00.000
    });
    return saveReview;
  }

  async findListByCategoryId(id: number, page: number) {
    // 게시물 리스트 서비스
    const findCategory = await this.categoryRepository.findOne({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

    if (!findCategory) {
      // 잘못된 카테고리일 경우
      throw new HttpException('존재하지 않는 카테고리입니다.', 400);
    }

    const [findReviews, totalCount] = await this.reviewRepository.findAndCount({
      select: {
        // API에 필요한 데이터만 true를 통해 가져가기
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
          password: false,
        },
      },
      where: {
        category_id: id,
        // 전달 받은 id 값 기준으로
        center_id: IsNull(),
        delete_date: IsNull(),
        // 삭제된 데이터는 불러오지 않기
      },
      order: {
        id: 'desc',
        // id desc 기준으로
      },
      loadEagerRelations: true,
      // user 외래키 연결
      take: 10 * page,
      // take 끝 인덱스
      skip: 10 * (page - 1) ? 10 * (page - 1) : 0,
      // skip 첫 시작 인덱스 10 *(page - 1)이 1 이상이면 그값을 아니면 0을
    });

    return {
      findReviews: findReviews.map((v) => ({
        ...v,
        likes: v.likes.length,
        reply: v.reply.filter((v) => v.delete_date == null).length,
        user: {
          id: v.user.id,
          name: v.user.name,
        },
      })),
      totalCount,
    };
  }

  async findListByCenterId(id: number, page: number) {
    // 2022-08-06 준한
    // 게시물 리스트 센터아이디 기준
    const findCenter = await this.centerRepository.findOne({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

    if (!findCenter) {
      // 잘못된 센터일경우
      throw new HttpException('존재하지 않는 카테고리입니다.', 400);
    }

    const [findReviews, totalCount] = await this.reviewRepository.findAndCount({
      where: {
        center_id: id,
        // 전달 받은 id 값 기준으로
        delete_date: IsNull(),
        // 삭제된 데이터는 불러오지 않기
      },

      order: {
        id: 'desc',
        // id desc 기준으로
      },
      loadEagerRelations: true,
      relations: {
        user: true,
        reply: true,
        likes: true,
      },
      // user 외래키 연결
      take: 10 * page,
      // take 끝 인덱스
      skip: 10 * (page - 1) ? 10 * (page - 1) : 0,
      // skip 첫 시작 인덱스 10 *(page - 1)이 1 이상이면 그값을 아니면 0을
    });

    return {
      findReviews: findReviews.map((v) => ({
        ...v,
        user: this.returnFormatterUser(v.user),
        reply: this.returnFormatterReply(v.reply),
        likes: this.returnFormatterLikes(v.likes),
      })),
      totalCount: totalCount,
    };
  }

  async findOne(id: number) {
    // 리뷰 상세보기 서비스
    const findReview = await this.reviewRepository.findOne({
      relations: {
        user: true,
        reply: true,
      },
      loadEagerRelations: true,
      where: {
        id,
        delete_date: IsNull(),
      },
    });

    if (!findReview) {
      throw new HttpException('존재하지 않는 리뷰 입니다.', 400);
    }

    await this.reviewRepository.update(
      {
        id: id,
      },
      {
        view_count: findReview.view_count + 1,
      },
    );

    const findLikes = await this.reviewLikeRepository
      .find({
        where: {
          review: {
            id: findReview.id,
          },
        },
        loadRelationIds: true,
        relations: ['user'],
      })
      .then((result) => result.map((v) => ({ user_id: v.user })));

    const findReply = await this.replyRepository.find({
      where: {
        review: {
          id: findReview.id,
        },
      },
      loadEagerRelations: true,
      relations: ['review'],
    });
    return {
      ...findReview,
      view_count: findReview.view_count + 1,
      user: this.returnFormatterUser(findReview.user),
      likes: findLikes,
      reply: this.returnFormatterReply(findReply),
    };
  }

  async find(type: string, id: number) {
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
  }

  returnFormatterUser(user: User) {
    // 유저 테이블 중요한 정보가 들어있어 필요한 값만 리턴하도록 하는 함수
    try {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    } catch (error) {
      throw new HttpException('user Error', 400);
    }
  }
  returnFormatterReply(reply: Reply[]) {
    // 리플의 경우 삭제된 데이터를 없에기 위해 사용
    try {
      return reply
        .filter((fv) => fv.delete_date == null)
        .map((v) => ({
          ...v,
          user: this.returnFormatterUser(v.user),
          // likes: this.returnFormatterLikes(v.likes),
        }));
    } catch (error) {
      throw new HttpException('reply Error', 400);
    }
  }

  returnFormatterLikes(
    likes: {
      user: {
        id: number;
      };
    }[],
  ) {
    // 좋아요 테이블에 필요없는 데이터를 없에고 필요한 user_id만 return
    try {
      return likes.map((v) => ({ user_id: v.user.id }));
    } catch (error) {
      throw new HttpException(`like Error ${JSON.stringify(likes)}`, 400);
    }
  }

  async updateReview(updateReviewDto: UpdateReviewDto) {
    // 리뷰 업데이트 서비스
    const findReview = await this.reviewRepository.findOne({
      where: {
        id: updateReviewDto.review_id,
        delete_date: IsNull(),
        // 삭제 날짜가 Null이 아닌 경우 삭제된 리뷰
      },
      select: {
        id: true,
      },
    });
    if (!findReview) {
      // 올바르지 않은 리뷰의 경우 에러 발생
      throw new HttpException('존재하지 않는 리뷰입니다.', 400);
    }

    const updateReview = await this.reviewRepository.save({
      id: findReview.id,
      update_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      // 업데이트 날짜 변경 해주기
      title: updateReviewDto.title,
      content: updateReviewDto.content,
    });

    return updateReview;
  }

  async removeReview(deleteReviewDto: DeleteReviewDTO) {
    // 리뷰 삭제 서비스
    const findReview = await this.reviewRepository.findOne({
      where: {
        id: deleteReviewDto.review_id,
        delete_date: IsNull(),
        // 삭제된 리뷰의 경우 두번 삭제가 불가하므로 체크
      },
      select: {
        id: true,
        // 필요한 데이터만 받아오기
      },
    });

    if (!findReview) {
      throw new HttpException('존재하지 않는 리뷰입니다.', 400);
    }

    const saveReview = this.reviewRepository.save({
      id: findReview.id,
      delete_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      // DateTime 형식에 맞게 변경
    });

    return saveReview;
  }

  async likeReview(review_id: number, user_id: number) {
    // 리뷰 좋아요 서비스
    const findReview = await this.reviewRepository.findOne({
      where: {
        id: review_id,
        delete_date: IsNull(),
        // 삭제된 리뷰가 아닌경우
      },
      select: {
        id: true,
        // 필요한 값만 셀렉트
      },
    });
    if (!findReview) {
      throw new HttpException('존재하지 않는 리뷰입니다.', 400);
    }

    const findUser = await this.userRepository.findOne({
      where: {
        id: user_id,
        delete_account: 0,
        // 탈퇴한 유저가 아닌경우
      },
      select: {
        id: true,
        // 필요한 값만 셀렉트
      },
    });

    if (!findUser) {
      throw new HttpException('존재하지 않는 회원입니다.', 400);
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
    // 좋아요 테이블에 해당 데이터가 존재한다면 ? 삭제후 false 반환
    // 좋아요 테이블에 데이터가 없다면? 삽입후 true 반환
  }
}
