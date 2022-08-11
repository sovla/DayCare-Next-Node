import { ReplyLike } from './../domain/replylike.entity';
import { Module } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { ReplyController } from './reply.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Review } from 'src/domain/review.entity';
import { Center } from 'src/domain/center.entity';
import { Category } from 'src/domain/category.entity';
import { User } from 'src/domain/user.entity';
import { Reply } from 'src/domain/reply.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Review,
      Center,
      Category,
      ReplyLike,
      User,
      Reply,
    ]),
    JwtModule.register({
      secret: `${process.env.JWT_SECRET_KEY}`,
      signOptions: {
        expiresIn: '2d',
      },
    }),
  ],
  exports: [TypeOrmModule],
  controllers: [ReplyController],
  providers: [ReplyService],
})
export class ReplyModule {}
