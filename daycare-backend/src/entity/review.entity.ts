import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
  title: string;

  @Column({
    type: 'varchar',
  })
  content: string;

  @Column({
    type: 'varchar',
  })
  image1: string;

  @Column({
    type: 'varchar',
  })
  image2: string;
  @Column({
    type: 'varchar',
  })
  image3: string;

  @Column({
    type: 'varchar',
  })
  image4: string;
  @Column({
    type: 'varchar',
  })
  image5: string;

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
  category: number;

  @Column({
    type: 'int',
  })
  user_id: number;

  @Column({
    type: 'int',
  })
  code: number;

  @Column({
    type: 'int',
  })
  like_count: number;

  @Column({
    type: 'int',
  })
  view_count: number;
}
