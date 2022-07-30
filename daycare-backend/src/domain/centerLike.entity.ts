import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Center } from './center.entity';
import { User } from './user.entity';

@Entity()
export class CenterLike {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @ManyToOne(() => Center, (center) => center.center_likes)
  @JoinColumn({ name: 'centerLike_center_id' })
  center: Center;

  @ManyToOne(() => User, (user) => user.center_likes)
  @JoinColumn({ name: 'centerLike_user_id' })
  user: User;
}
