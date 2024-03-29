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
import * as moment from 'moment-timezone';

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
    default: moment().format('YYYY-MM-DD HH:mm:ss'),
  })
  write_date: Date;
  @Column({
    type: 'timestamp',
    nullable: true,
  })
  update_date: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  delete_date: Date;

  @OneToMany(() => ReplyLike, (replyLike) => replyLike.reply, { eager: true })
  likes: ReplyLike[];

  @ManyToOne(() => Review, (review) => review.reply, {
    eager: false,
    lazy: true,
  })
  @JoinColumn({ name: 'reply_review_id' })
  review: Review;

  @ManyToOne(() => User, (user) => user.reply, { eager: true })
  @JoinColumn({
    name: 'reply_user_id',
  })
  user: User;
}
