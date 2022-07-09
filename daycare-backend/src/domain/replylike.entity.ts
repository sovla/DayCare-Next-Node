import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ReplyLike {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Column({
    type: 'int',
  })
  reply_id: number;

  @Column({
    type: 'int',
  })
  user_id: number;
}
