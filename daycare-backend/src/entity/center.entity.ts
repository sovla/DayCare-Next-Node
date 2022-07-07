import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Column({
    type: 'int',
  })
  code: number;

  @Column({
    type: 'varchar',
  })
  city: string;

  @Column({ type: 'varchar' })
  city_detail: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'varchar' })
  operation_status: string;

  @Column({ type: 'varchar' })
  address_number: string;

  @Column({ type: 'varchar' })
  address_detail: string;

  @Column({ type: 'varchar' })
  tel: string;

  @Column({ type: 'varchar' })
  fax: string;

  @Column({ type: 'varchar' })
  homepage: string;

  @Column({ type: 'varchar' })
  nursery_count: string;

  @Column({ type: 'varchar' })
  nursery_roomarea: string;

  @Column({ type: 'int' })
  cctv_count: number;

  @Column({ type: 'int' })
  teaching_staff_count: number;

  @Column({ type: 'int' })
  student_max: number;

  @Column({ type: 'int' })
  student_count: number;

  @Column({ type: 'varchar' })
  lat: string;

  @Column({ type: 'varchar' })
  lon: string;

  @Column({ type: 'varchar' })
  school_vehicle: string;

  @Column({ type: 'varchar' })
  accreditation: string;

  @Column({ type: 'varchar' })
  characteristics: string;

  @Column({ type: 'varchar' })
  server_date: string;

  @Column({ type: 'int' })
  class_count0: number;

  @Column({ type: 'int' })
  class_count1: number;

  @Column({ type: 'int' })
  class_count2: number;

  @Column({ type: 'int' })
  class_count3: number;

  @Column({ type: 'int' })
  class_count4: number;

  @Column({ type: 'int' })
  class_count5: number;

  @Column({ type: 'int' })
  class_count_mix2: number;

  @Column({ type: 'int' })
  class_count_mix5: number;

  @Column({ type: 'int' })
  class_count_special: number;

  @Column({ type: 'int' })
  class_count: number;

  @Column({ type: 'int' })
  child_count0: number;

  @Column({ type: 'int' })
  child_count1: number;

  @Column({ type: 'int' })
  child_count2: number;

  @Column({ type: 'int' })
  child_count3: number;

  @Column({ type: 'int' })
  child_count4: number;

  @Column({ type: 'int' })
  child_count5: number;

  @Column({ type: 'int' })
  child_count_mix2: number;

  @Column({ type: 'int' })
  child_count_mix5: number;

  @Column({ type: 'int' })
  child_count: number;

  @Column({ type: 'int' })
  employee_count0: number;

  @Column({ type: 'int' })
  employee_count1: number;

  @Column({ type: 'int' })
  employee_count2: number;

  @Column({ type: 'int' })
  employee_count4: number;

  @Column({ type: 'int' })
  employee_count6: number;

  @Column({ type: 'int' })
  employee_count_ledger: number;

  @Column({ type: 'int' })
  employee_count_nursery: number;

  @Column({ type: 'int' })
  employee_count_special: number;

  @Column({ type: 'int' })
  employee_count_cure: number;

  @Column({ type: 'int' })
  employee_count_nutritionist: number;

  @Column({ type: 'int' })
  employee_count_nurse: number;

  @Column({ type: 'int' })
  employee_count_nursingassistant: number;

  @Column({ type: 'int' })
  employee_count_cook: number;

  @Column({ type: 'int' })
  employee_count_officeworker: number;

  @Column({ type: 'int' })
  employee_count: number;

  @Column({ type: 'varchar' })
  representative_name: string;

  @Column({ type: 'varchar' })
  service: string;

  @Column({ type: 'varchar' })
  abolition_date: string;

  @Column({ type: 'varchar' })
  rest_start_date: string;

  @Column({ type: 'varchar' })
  rest_end_date: string;
}
