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

@Module({
  imports: [
    TypeOrmModule.forFeature([Review, Center, Category, ReviewLike, User]),
    JwtModule.register({
      secret: `${process.env.JWT_SECRET_KEY}`,
      signOptions: {
        expiresIn: '300s',
      },
    }),
  ],
  exports: [TypeOrmModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
