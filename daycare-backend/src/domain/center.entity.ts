import * as moment from 'moment-timezone';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Center {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Column({
    type: 'varchar',
    default: '',
    nullable: true,
  })
  code: string;

  @Column({
    type: 'varchar',
    default: '',
    nullable: true,
  })
  city: string;

  @Column({ type: 'varchar', default: '', nullable: true })
  city_detail: string;

  @Column({ type: 'varchar', default: '', nullable: true })
  city_dong: string; // 행정동

  @Column({ type: 'varchar', default: '', nullable: true })
  city_scale: string; // 도시 규모

  @Column({ type: 'varchar', default: '', nullable: true })
  name: string;

  @Column({ type: 'varchar', default: '', nullable: true })
  type: string;

  @Column({ type: 'varchar', default: '', nullable: true })
  support: string; // 지원여부

  @Column({ type: 'varchar', default: '', nullable: true })
  property_normal: string; // 일반여부

  @Column({ type: 'varchar', default: '', nullable: true })
  property_infants: string; // 영아전담여부

  @Column({ type: 'varchar', default: '', nullable: true })
  property_impaired: string; // 장애아전담여부

  @Column({ type: 'varchar', default: '', nullable: true })
  property_impaired_combine: string; // 장애아통합여부

  @Column({ type: 'varchar', default: '', nullable: true })
  property_after: string; // 방과후여부

  @Column({ type: 'varchar', default: '', nullable: true })
  property_after_combine: string; // 방과후통합여부

  @Column({ type: 'varchar', default: '', nullable: true })
  property_time_extension: string; // 시간연장형

  @Column({ type: 'varchar', default: '', nullable: true })
  property_holiday: string; // 주말여부

  @Column({ type: 'varchar', default: '', nullable: true })
  property_allday: string; // 24시간여부

  // 위탁 관련
  @Column({ type: 'varchar', default: '', nullable: true })
  consignment_status: string; // 위탁여부

  @Column({ type: 'varchar', default: '', nullable: true })
  consignment_type: string; // 위탁업체유형

  @Column({ type: 'varchar', default: '', nullable: true })
  consignment_name: string; // 위탁업체명

  @Column({ type: 'varchar', default: '', nullable: true })
  operation_status: string;

  @Column({ type: 'varchar', default: '', nullable: true })
  address_number: string;

  @Column({ type: 'varchar', default: '', nullable: true })
  address_detail: string;

  @Column({ type: 'varchar', default: '', nullable: true })
  tel: string;

  @Column({ type: 'varchar', default: '', nullable: true })
  fax: string;

  @Column({ type: 'varchar', default: '', nullable: true })
  homepage: string;

  @Column({ type: 'varchar', default: '', nullable: true })
  nursery_count: string;

  @Column({ type: 'varchar', default: '', nullable: true })
  nursery_roomarea: string;

  @Column({ type: 'int', default: 0, nullable: true })
  playground_count: number;

  @Column({ type: 'int', default: 0, nullable: true })
  cctv_count: number;

  @Column({ type: 'int', default: 0, nullable: true })
  teaching_staff_count: number;

  @Column({ type: 'int', default: 0, nullable: true })
  student_max: number;

  @Column({ type: 'int', default: 0, nullable: true })
  student_count: number;

  @Column({ type: 'varchar', default: '', nullable: true })
  lat: string;

  @Column({ type: 'varchar', default: '', nullable: true })
  lon: string;

  @Column({ type: 'varchar', default: '', nullable: true })
  school_vehicle: string;

  @Column({ type: 'varchar', default: '', nullable: true })
  accreditation: string;

  @Column({ type: 'varchar', default: '', nullable: true })
  characteristics: string;

  @Column({
    type: 'varchar',
    default: moment().format('YYYY-MM-DD HH:mm:ss'),
    nullable: true,
  })
  server_date: string;

  @Column({ type: 'int', default: 0, nullable: true })
  class_count0: number;

  @Column({ type: 'int', default: 0, nullable: true })
  class_count1: number;

  @Column({ type: 'int', default: 0, nullable: true })
  class_count2: number;

  @Column({ type: 'int', default: 0, nullable: true })
  class_count3: number;

  @Column({ type: 'int', default: 0, nullable: true })
  class_count4: number;

  @Column({ type: 'int', default: 0, nullable: true })
  class_count5: number;

  @Column({ type: 'int', default: 0, nullable: true })
  class_count_mix2: number;

  @Column({ type: 'int', default: 0, nullable: true })
  class_count_mix5: number;

  @Column({ type: 'int', default: 0, nullable: true })
  class_count_special: number;

  @Column({ type: 'int', default: 0, nullable: true })
  class_count: number;

  @Column({ type: 'int', default: 0, nullable: true })
  child_count_age0: number;

  @Column({ type: 'int', default: 0, nullable: true })
  child_count_age1: number;

  @Column({ type: 'int', default: 0, nullable: true })
  child_count_age2: number;

  @Column({ type: 'int', default: 0, nullable: true })
  child_count_age3: number;

  @Column({ type: 'int', default: 0, nullable: true })
  child_count_age4: number;

  @Column({ type: 'int', default: 0, nullable: true })
  child_count_age5: number;

  @Column({ type: 'int', default: 0, nullable: true })
  child_count_age6: number;

  @Column({ type: 'int', default: 0, nullable: true })
  child_count_age7: number;

  //  일반 아동반
  @Column({ type: 'int', default: 0, nullable: true })
  nuri_impaired_count: number; // 누리 장애아반

  @Column({ type: 'int', default: 0, nullable: true })
  impaired_allday_count: number; // 장애아종일반

  @Column({ type: 'int', default: 0, nullable: true })
  impaired_after_count: number; // 장애아방과후반

  @Column({ type: 'int', default: 0, nullable: true })
  normal_child_count_age0: number; // 일반0세반

  @Column({ type: 'int', default: 0, nullable: true })
  normal_child_count_age1: number; // 일반1세반

  @Column({ type: 'int', default: 0, nullable: true })
  normal_child_count_age2: number; // 일반2세반

  @Column({ type: 'int', default: 0, nullable: true })
  normal_child_count_age3: number; // 일반3세반

  @Column({ type: 'int', default: 0, nullable: true })
  normal_child_count_age4: number; // 일반4세반 이상

  @Column({ type: 'int', default: 0, nullable: true })
  normal_child_count_mix01: number; // 혼합 01세반

  @Column({ type: 'int', default: 0, nullable: true })
  normal_child_count_mix12: number; // 혼합 12세반

  @Column({ type: 'int', default: 0, nullable: true })
  normal_child_count_mix23: number; // 혼합 23세반

  @Column({ type: 'int', default: 0, nullable: true })
  normal_child_count_mix34: number; // 혼합 34세반

  @Column({ type: 'int', default: 0, nullable: true })
  normal_after_child_count: number; // 방과후반

  @Column({ type: 'int', default: 0, nullable: true })
  normal_holiday_child_count: number; // 시간연장

  @Column({ type: 'int', default: 0, nullable: true })
  child_count: number; // 아이총원

  //  취약,특수보육현원

  @Column({ type: 'int', default: 0, nullable: true })
  infant_child_count: number; // 영아현원

  @Column({ type: 'int', default: 0, nullable: true })
  impaired_child_count: number; // 취약특수 총원

  @Column({ type: 'int', default: 0, nullable: true })
  impaired_after_child_count: number; // 취약특수 방과후

  @Column({ type: 'int', default: 0, nullable: true })
  impaired_extension_child_count: number; // 취약특수 시간연장

  @Column({ type: 'int', default: 0, nullable: true })
  impaired_holiday_child_count: number; // 취약특수 휴일

  @Column({ type: 'int', default: 0, nullable: true })
  impaired_allday_child_count: number; // 취약특수 24시간

  @Column({ type: 'int', default: 0, nullable: true })
  employee_count0: number;

  @Column({ type: 'int', default: 0, nullable: true })
  employee_count1: number;

  @Column({ type: 'int', default: 0, nullable: true })
  employee_count2: number;

  @Column({ type: 'int', default: 0, nullable: true })
  employee_count4: number;

  @Column({ type: 'int', default: 0, nullable: true })
  employee_count6: number;

  @Column({ type: 'int', default: 0, nullable: true })
  employee_count_director: number;

  @Column({ type: 'int', default: 0, nullable: true })
  employee_count_nursery: number;

  @Column({ type: 'int', default: 0, nullable: true })
  employee_count_special: number;

  @Column({ type: 'int', default: 0, nullable: true })
  employee_count_cure: number;

  @Column({ type: 'int', default: 0, nullable: true })
  employee_count_nutritionist: number;

  @Column({ type: 'int', default: 0, nullable: true })
  employee_count_nurse: number;

  @Column({ type: 'int', default: 0, nullable: true })
  employee_count_nursingassistant: number;

  @Column({ type: 'int', default: 0, nullable: true })
  employee_count_cook: number;

  @Column({ type: 'int', default: 0, nullable: true })
  employee_count_officeworker: number;

  @Column({ type: 'int', default: 0, nullable: true })
  employee_count_other: number;

  @Column({ type: 'int', default: 0, nullable: true })
  employee_count: number;

  @Column({ type: 'varchar', default: '', nullable: true })
  representative_name: string;

  @Column({ type: 'varchar', default: '', nullable: true })
  director_name: string;

  @Column({ type: 'varchar', default: '', nullable: true })
  service: string;

  @Column({ type: 'timestamp', default: null, nullable: true })
  abolition_date: Date; // 휴지일자

  @Column({ type: 'timestamp', default: null, nullable: true })
  rest_start_date: Date;

  @Column({ type: 'timestamp', default: null, nullable: true })
  rest_end_date: Date;

  @Column({ type: 'timestamp', default: null, nullable: true })
  authorization_date: Date; // 인가 일자

  @Column({ type: 'varchar', default: null, nullable: true })
  insurance_detriment: string; // 보험

  @Column({ type: 'varchar', default: null, nullable: true })
  insurance_fire: string; // 보험

  @Column({ type: 'varchar', default: null, nullable: true })
  insurance_compensation: string; // 보험

  @Column({ type: 'varchar', default: null, nullable: true })
  certification: string; // 평가인증여부
}
