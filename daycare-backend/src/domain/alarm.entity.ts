import { Center } from './center.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Review } from './review.entity';
import { User } from './user.entity';

@Entity()
export class Alarm {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 200,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 200,
  })
  content: string;

  @Column({
    type: 'tinyint',
    default: 0,
  })
  read_status: 0 | 1;

  @Column({
    type: 'timestamp',
  })
  join_date: Date;

  @ManyToOne(() => User, (user) => user.alarm, { eager: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Review, (review) => review.alarm, { eager: false })
  @JoinColumn({ name: 'review_id' })
  review: Review;

  @ManyToOne(() => Center, (center) => center.alarm, { eager: false })
  @JoinColumn({ name: 'center_id' })
  center: Center;
}
