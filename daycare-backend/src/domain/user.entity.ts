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
}
