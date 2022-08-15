import { Reply } from 'src/domain/reply.entity';
import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Review } from 'src/domain/review.entity';
import { Center } from 'src/domain/center.entity';
import { Category } from 'src/domain/category.entity';
import { ReviewLike } from 'src/domain/reviewlike.entity';
import { User } from 'src/domain/user.entity';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptions } from 'src/lib/multerOption';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Review,
      Center,
      Category,
      ReviewLike,
      User,
      Reply,
    ]),
    JwtModule.register({
      secret: `${process.env.JWT_SECRET_KEY}`,
      signOptions: {
        expiresIn: '2d',
      },
    }),
    MulterModule.register(multerOptions),
  ],
  exports: [TypeOrmModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
