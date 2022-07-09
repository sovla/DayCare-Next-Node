import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Reply } from './reply.entity';
import { ReplyLike } from './replylike.entity';
import { ReviewLike } from './reviewlike.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 200,
  })
  email: string;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
  })
  password: string;

  @Column({
    type: 'varchar',
    default: '',
  })
  image: string;

  @Column({
    type: 'varchar',
    default: '',
  })
  refresh_token: string;

  @Column({
    type: 'tinyint',
    default: 0,
  })
  delete_account: number;

  @OneToMany(() => ReviewLike, (reviewLike) => reviewLike.user, {
    eager: false,
  })
  likes: ReviewLike[];

  @OneToMany(() => Reply, (reply) => reply.user, {
    eager: false,
  })
  reply: Reply[];

  @OneToMany(() => ReplyLike, (replyLike) => replyLike.user, {
    eager: false,
  })
  reply_likes: ReplyLike[];
}
