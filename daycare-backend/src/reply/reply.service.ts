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
        id: id,
      },
    });

    if (!findReview || findReview.delete_date != null) {
      throw new HttpException('존재하지 않는 리뷰 입니다.', 400);
    }

    const findReplys = await this.replyRepository.find({
      where: {
        review: findReview,
      },
    });

    return findReplys;
  }

  async updateReply(updateReplyDto: UpdateReplyDto) {}

  async removeReply(deleteReplyDto: UpdateReplyDto) {}

  async likeReply(Reply_id: number, user_id: number) {}
}
