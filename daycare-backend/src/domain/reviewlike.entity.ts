import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Review } from './review.entity';
import { User } from './user.entity';

@Entity()
export class ReviewLike {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @ManyToOne(() => Review, (review) => review.likes)
  @JoinColumn({ name: 'review_id' })
  review: Review;

  @ManyToOne(() => User, (user) => user.likes, {
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
