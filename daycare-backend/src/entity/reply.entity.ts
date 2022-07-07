import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
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
  user_id: number;

  @Column({
    type: 'int',
  })
  review_id: number;

  @Column({
    type: 'int',
  })
  like_count: number;
}
