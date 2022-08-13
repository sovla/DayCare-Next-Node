import { User } from 'src/domain/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Reply } from './reply.entity';

@Entity()
export class ReplyLike {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @ManyToOne(() => Reply, (reply) => reply.likes, { eager: false })
  @JoinColumn({ name: 'like_reply_id' })
  reply: Reply;

  @ManyToOne(() => User, (user) => user.reply, { eager: false })
  @JoinColumn({ name: 'like_user_id' })
  user: User;
}
