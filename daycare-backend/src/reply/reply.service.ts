import { DeleteReplyDTO } from './dto/delete-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { CreateReplyDto } from './dto/create-reply.dto';
import { Injectable, HttpException } from '@nestjs/common';
import { ReplyLike } from '../domain/Replylike.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment-timezone';
import { Category } from 'src/domain/category.entity';
import { Center } from 'src/domain/center.entity';
import { Reply } from 'src/domain/Reply.entity';
import { Repository } from 'typeorm';
import { User } from 'src/domain/user.entity';
import { Review } from 'src/domain/review.entity';

@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,

    @InjectRepository(Reply)
    private replyRepository: Repository<Reply>,

    @InjectRepository(ReplyLike)
    private replyLikeRepository: Repository<ReplyLike>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async writeReply(
    createReplyDto: CreateReplyDto,
  ): Promise<Omit<Reply, 'review' | 'user' | 'likes'>> {
    const findUser = await this.userRepository.findOne({
      where: { id: +createReplyDto.id },
    });

    if (!findUser || findUser.delete_account) {
      throw new HttpException('존재하지 않는 유저 입니다.', 400);
    }

    const findReview = await this.reviewRepository.findOne({
      where: { id: createReplyDto.review_id },
    });

    if (!findReview || findReview.delete_date != null) {
      throw new HttpException('존재하지 않는 리뷰 입니다.', 400);
    }

    const saveReply = await this.replyRepository.save({
      content: createReplyDto.content,
      user: findUser,
      review: findReview,
    });

    return {
      content: saveReply.content,
      id: saveReply.id,
      delete_date: saveReply.delete_date,
      update_date: saveReply.update_date,
      write_date: saveReply.write_date,
    };
  }

  async findOne(id: number) {
    const findReview = await this.reviewRepository.findOne({
      where: {
        id: +id,
      },
    });

    if (!findReview || findReview.delete_date != null) {
      throw new HttpException('존재하지 않는 리뷰 입니다.', 400);
    }

    const findReplys = await this.replyRepository
      .createQueryBuilder('reply')
      .where(`review_id=${findReview.id}`)
      .leftJoin('reply.likes', 'likes')
      .loadRelationCountAndMap('reply.like_count', 'reply.likes')
      .getMany();

    return findReplys;
  }

  async updateReply(updateReplyDto: UpdateReplyDto) {
    const findReply = await this.replyRepository.find({
      relations: {
        user: true,
      },
      where: {
        user: {
          id: +updateReplyDto.id,
        },
        id: +updateReplyDto.reply_id,
      },
      select: {
        user: {
          id: true,
        },
      },
    });

    if (findReply) {
      console.log(findReply);
    }
  }

  async removeReply(deleteReplyDto: DeleteReplyDTO) {
    const findReply = await this.replyRepository.findOne({
      where: {
        id: deleteReplyDto.reply_id,
      },
    });
    if (!findReply || findReply.delete_date != null) {
      throw new HttpException('존재하지 않는 댓글 입니다.', 400);
    }

    const saveReply = await this.replyRepository.save({
      ...findReply,
      delete_date: moment().format('YYYY-MM-DD HH:mm:ss'),
    });
    return !!saveReply;
  }

  async likeReply(reply_id: number, user_id: number) {
    const findReply = await this.replyRepository.findOne({
      where: {
        id: reply_id,
      },
    });

    if (!findReply || findReply.delete_date != null) {
      throw new HttpException('존재하지 않는 댓글 입니다.', 400);
    }

    const findUser = await this.userRepository.findOne({
      where: {
        id: user_id,
      },
    });

    if (!findUser || findUser.delete_account) {
      throw new HttpException('존재하지 않는 이용자 입니다.', 400);
    }
    const findReplyLike = await this.replyLikeRepository.findOne({
      where: {
        reply: findReply,
        user: findUser,
      },
    });

    if (findReplyLike) {
      await this.replyLikeRepository.delete(findReplyLike);
      return false;
    } else {
      await this.replyLikeRepository.save({
        reply: findReply,
        user: findUser,
      });
      return true;
    }
  }
}
