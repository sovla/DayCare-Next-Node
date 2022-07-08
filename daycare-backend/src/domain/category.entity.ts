import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
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
    type: 'timestamp',
  })
  join_date: Date;
}
