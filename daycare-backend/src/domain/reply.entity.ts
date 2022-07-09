import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReplyLike } from './replylike.entity';
import { Review } from './review.entity';
import { User } from './user.entity';

@Entity()
export class Reply {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Column({
    type: 'varchar',
  })
  content: string;

  @Column({
    type: 'timestamp',
  })
  write_date: Date;
  @Column({
    type: 'timestamp',
  })
  update_date: Date;

  @Column({
    type: 'timestamp',
  })
  delete_date: Date;

  @Column({
    type: 'int',
  })
  like_count: number;

  @OneToMany(() => ReplyLike, (replyLike) => replyLike.reply, {
    eager: true,
  })
  likes: ReplyLike[];

  @ManyToOne(() => Review, (review) => review.reply)
  @JoinColumn({ name: 'review_id' })
  review: Review;

  @ManyToOne(() => User, (user) => user.reply)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
