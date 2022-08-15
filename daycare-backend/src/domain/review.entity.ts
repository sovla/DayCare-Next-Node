import { Reply } from './reply.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReviewLike } from './reviewlike.entity';
import { User } from './user.entity';
import { Alarm } from './alarm.entity';

@Entity()
export class Review {
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
    type: 'text',
  })
  content: string;

  @Column({
    type: 'varchar',
    default: '',
  })
  image1: string;

  @Column({
    type: 'varchar',
    default: '',
  })
  image2: string;
  @Column({
    type: 'varchar',
    default: '',
  })
  image3: string;

  @Column({
    type: 'varchar',
    default: '',
  })
  image4: string;
  @Column({
    type: 'varchar',
    default: '',
  })
  image5: string;

  @Column({
    type: 'timestamp',
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

  @Column({
    type: 'int',
    default: 0,
  })
  view_count: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  center_id: number;

  @ManyToOne(() => User, (user) => user.reviews, {
    eager: true,
  })
  @JoinColumn({ name: 'review_user_id' })
  user: User;

  @Column({
    type: 'int',
    nullable: true,
  })
  category_id: number;

  @OneToMany(() => ReviewLike, (reviewLike) => reviewLike.review, {
    eager: true,
  })
  likes: ReviewLike[];

  @OneToMany(() => Reply, (reply) => reply.review, {
    eager: true,
  })
  reply: Reply[];

  @OneToMany(() => Alarm, (alarm) => alarm.review)
  alarm: Alarm[];
}
