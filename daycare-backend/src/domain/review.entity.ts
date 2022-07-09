import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
    type: 'varchar',
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
  })
  user_id: number;

  @Column({
    type: 'int',
    default: 0,
  })
  like_count: number;

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

  @Column({
    type: 'int',
    nullable: true,
  })
  category_id: number;
}
