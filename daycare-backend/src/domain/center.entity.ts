import * as moment from 'moment-timezone';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CenterLike } from './centerLike.entity';

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
    comment: '어린이집 id Code',
  })
  code: string;

  @Column({
    type: 'varchar',
    default: '',
    nullable: true,
    comment: '시도',
  })
  city: string;

  @Column({ type: 'varchar', default: '', nullable: true, comment: '시군구' })
  city_detail: string;

  @Column({ type: 'varchar', default: '', nullable: true, comment: '행정동' })
  city_dong: string; // 행정동

  @Column({ type: 'varchar', default: '', nullable: true, comment: '도시규모' })
  city_scale: string; // 도시 규모

  @Column({
    type: 'varchar',
    default: '',
    nullable: true,
    comment: '어린이집 명',
  })
  name: string;

  @Column({
    type: 'varchar',
    default: '',
    nullable: true,
    comment: '공립/민간',
  })
  type: string;

  @Column({ type: 'varchar', default: '', nullable: true, comment: '지원여부' })
  support: string; // 지원여부

  @Column({ type: 'varchar', default: '', nullable: true, comment: '일반여부' })
  property_normal: string; // 일반여부

  @Column({
    type: 'varchar',
    default: '',
    nullable: true,
    comment: '영아전담여부',
  })
  property_infants: string; // 영아전담여부

  @Column({
    type: 'varchar',
    default: '',
    nullable: true,
    comment: '장애아전담여부',
  })
  property_impaired: string; // 장애아전담여부

  @Column({
    type: 'varchar',
    default: '',
    nullable: true,
    comment: '장애아통합여부',
  })
  property_impaired_combine: string; // 장애아통합여부

  @Column({
    type: 'varchar',
    default: '',
    nullable: true,
    comment: '방과후여부',
  })
  property_after: string; // 방과후여부

  @Column({
    type: 'varchar',
    default: '',
    nullable: true,
    comment: '방과후통합여부',
  })
  property_after_combine: string; // 방과후통합여부

  @Column({
    type: 'varchar',
    default: '',
    nullable: true,
    comment: '시간연장형',
  })
  property_time_extension: string; // 시간연장형

  @Column({ type: 'varchar', default: '', nullable: true, comment: '주말여부' })
  property_holiday: string; // 주말여부

  @Column({
    type: 'varchar',
    default: '',
    nullable: true,
    comment: '24시간여부',
  })
  property_allday: string; // 24시간여부

  // 위탁 관련
  @Column({ type: 'varchar', default: '', nullable: true, comment: '위탁여부' })
  consignment_status: string; // 위탁여부

  @Column({
    type: 'varchar',
    default: '',
    nullable: true,
    comment: '위탁업체유형',
  })
  consignment_type: string; // 위탁업체유형

  @Column({
    type: 'varchar',
    default: '',
    nullable: true,
    comment: '위탁업체명',
  })
  consignment_name: string; // 위탁업체명

  @Column({ type: 'varchar', default: '', nullable: true, comment: '운영여부' })
  operation_status: string;

  @Column({
    type: 'varchar',
    default: '',
    nullable: true,
    comment: '주소 우편번호',
  })
  address_number: string;

  @Column({
    type: 'varchar',
    default: '',
    nullable: true,
    comment: '상세 주소',
  })
  address_detail: string;

  @Column({ type: 'varchar', default: '', nullable: true, comment: '전화번호' })
  tel: string;

  @Column({ type: 'varchar', default: '', nullable: true, comment: '팩스번호' })
  fax: string;

  @Column({ type: 'varchar', default: '', nullable: true, comment: '홈페이지' })
  homepage: string;

  @Column({ type: 'varchar', default: '', nullable: true, comment: '보육실수' })
  nursery_count: string;

  @Column({
    type: 'varchar',
    default: '',
    nullable: true,
    comment: '보육실면적',
  })
  nursery_roomarea: string;

  @Column({ type: 'int', default: 0, nullable: true, comment: '놀이터수' })
  playground_count: number;

  @Column({ type: 'int', default: 0, nullable: true, comment: 'cctv수' })
  cctv_count: number;

  @Column({ type: 'int', default: 0, nullable: true, comment: '보육교사수' })
  teaching_staff_count: number;

  @Column({ type: 'int', default: 0, nullable: true, comment: '정원' })
  student_max: number;

  @Column({ type: 'int', default: 0, nullable: true, comment: '현원' })
  student_count: number;

  @Column({ type: 'varchar', default: '', nullable: true, comment: '위도' })
  lat: string;

  @Column({ type: 'varchar', default: '', nullable: true, comment: '경도' })
  lon: string;

  @Column({
    type: 'varchar',
    default: '',
    nullable: true,
    comment: '통학버스 운영여부',
  })
  school_vehicle: string;

  @Column({ type: 'varchar', default: '', nullable: true, comment: '도시규모' })
  accreditation: string;

  @Column({ type: 'varchar', default: '', nullable: true, comment: '도시규모' })
  characteristics: string;

  @Column({
    type: 'varchar',
    default: moment().format('YYYY-MM-DD HH:mm:ss'),
    nullable: true,
    comment: '데이터 업데이트 날짜',
  })
  server_date: string;

  @Column({ type: 'int', default: 0, nullable: true, comment: '0세반 수' })
  class_count0: number;

  @Column({ type: 'int', default: 0, nullable: true, comment: '1세반 수' })
  class_count1: number;

  @Column({ type: 'int', default: 0, nullable: true, comment: '2세반 수' })
  class_count2: number;

  @Column({ type: 'int', default: 0, nullable: true, comment: '3세반 수' })
  class_count3: number;

  @Column({ type: 'int', default: 0, nullable: true, comment: '4세반 수' })
  class_count4: number;

  @Column({ type: 'int', default: 0, nullable: true, comment: '5세반 수' })
  class_count5: number;

  @Column({
    type: 'int',
    default: 0,
    nullable: true,
    comment: '0~2세혼합반 수',
  })
  class_count_mix2: number;

  @Column({
    type: 'int',
    default: 0,
    nullable: true,
    comment: '3~5세혼합반 수',
  })
  class_count_mix5: number;

  @Column({ type: 'int', default: 0, nullable: true, comment: '장애반 수' })
  class_count_special: number;

  @Column({ type: 'int', default: 0, nullable: true, comment: '총 반수' })
  class_count: number;

  @Column({ type: 'int', default: 0, nullable: true, comment: '0세 아이수' })
  child_count_age0: number;

  @Column({ type: 'int', default: 0, nullable: true, comment: '1세 아이수' })
  child_count_age1: number;

  @Column({ type: 'int', default: 0, nullable: true, comment: '2세 아이수' })
  child_count_age2: number;

  @Column({ type: 'int', default: 0, nullable: true, comment: '3세 아이수' })
  child_count_age3: number;

  @Column({ type: 'int', default: 0, nullable: true, comment: '4세 아이수' })
  child_count_age4: number;

  @Column({ type: 'int', default: 0, nullable: true, comment: '5세 아이수' })
  child_count_age5: number;

  @Column({ type: 'int', default: 0, nullable: true, comment: '6세 아이수' })
  child_count_age6: number;

  @Column({
    type: 'int',
    default: 0,
    nullable: true,
    comment: '7세 이상 아이수',
  })
  child_count_age7: number;

  //  일반 아동반
  @Column({ type: 'int', default: 0, nullable: true, comment: '누리 장애아반' })
  nuri_impaired_count: number; // 누리 장애아반

  @Column({ type: 'int', default: 0, nullable: true, comment: '장애아종일반' })
  impaired_allday_count: number; // 장애아종일반

  @Column({
    type: 'int',
    default: 0,
    nullable: true,
    comment: '장애아방과후반',
  })
  impaired_after_count: number; // 장애아방과후반

  @Column({ type: 'int', default: 0, nullable: true, comment: '일반0세반' })
  normal_child_count_age0: number; // 일반0세반

  @Column({ type: 'int', default: 0, nullable: true, comment: '일반1세반' })
  normal_child_count_age1: number; // 일반1세반

  @Column({ type: 'int', default: 0, nullable: true, comment: '일반2세반' })
  normal_child_count_age2: number; // 일반2세반

  @Column({ type: 'int', default: 0, nullable: true, comment: '일반3세반' })
  normal_child_count_age3: number; // 일반3세반

  @Column({
    type: 'int',
    default: 0,
    nullable: true,
    comment: '일반4세반 이상',
  })
  normal_child_count_age4: number; // 일반4세반 이상

  @Column({ type: 'int', default: 0, nullable: true, comment: '혼합 01세반' })
  normal_child_count_mix01: number; // 혼합 01세반

  @Column({ type: 'int', default: 0, nullable: true, comment: '혼합 12세반' })
  normal_child_count_mix12: number; // 혼합 12세반

  @Column({ type: 'int', default: 0, nullable: true, comment: '혼합 23세반' })
  normal_child_count_mix23: number; // 혼합 23세반

  @Column({ type: 'int', default: 0, nullable: true, comment: '혼합 34세반' })
  normal_child_count_mix34: number; // 혼합 34세반

  @Column({ type: 'int', default: 0, nullable: true, comment: '방과후반' })
  normal_after_child_count: number; // 방과후반

  @Column({ type: 'int', default: 0, nullable: true, comment: '시간연장' })
  normal_holiday_child_count: number; // 시간연장

  @Column({ type: 'int', default: 0, nullable: true, comment: '아이총원' })
  child_count: number; // 아이총원

  //  취약,특수보육현원

  @Column({
    type: 'int',
    default: 0,
    nullable: true,
    comment: '취약,특수보육 영아현원',
  })
  infant_child_count: number; // 영아현원

  @Column({
    type: 'int',
    default: 0,
    nullable: true,
    comment: '취약,특수보육 장애아현원',
  })
  impaired_child_count: number; // 취약특수 총원

  @Column({
    type: 'int',
    default: 0,
    nullable: true,
    comment: '취약,특수보육 방과후현원',
  })
  impaired_after_child_count: number; // 취약특수 방과후

  @Column({
    type: 'int',
    default: 0,
    nullable: true,
    comment: '취약,특수보육 시간연장현원 ',
  })
  impaired_extension_child_count: number; // 취약특수 시간연장

  @Column({
    type: 'int',
    default: 0,
    nullable: true,
    comment: '취약,특수보육 휴일현원 ',
  })
  impaired_holiday_child_count: number; // 취약특수 휴일

  @Column({
    type: 'int',
    default: 0,
    nullable: true,
    comment: '취약,특수보육 24시간현원 ',
  })
  impaired_allday_child_count: number; // 취약특수 24시간

  @Column({ type: 'int', default: 0, nullable: true, comment: '0년차 직원 수' })
  employee_count0: number;

  @Column({ type: 'int', default: 0, nullable: true, comment: '1년차 직원 수' })
  employee_count1: number;

  @Column({
    type: 'int',
    default: 0,
    nullable: true,
    comment: '2~3년차 직원 수',
  })
  employee_count2: number;

  @Column({
    type: 'int',
    default: 0,
    nullable: true,
    comment: '4~5년차 직원 수',
  })
  employee_count4: number;

  @Column({
    type: 'int',
    default: 0,
    nullable: true,
    comment: '6~년차 직원 수',
  })
  employee_count6: number;

  @Column({ type: 'int', default: 0, nullable: true, comment: '원장 수' })
  employee_count_director: number;

  @Column({ type: 'int', default: 0, nullable: true, comment: '보육교사 수' })
  employee_count_nursery: number;

  @Column({ type: 'int', default: 0, nullable: true, comment: '특수교사 수' })
  employee_count_special: number;

  @Column({ type: 'int', default: 0, nullable: true, comment: '치료교사 수' })
  employee_count_cure: number;

  @Column({ type: 'int', default: 0, nullable: true, comment: '영양사 수' })
  employee_count_nutritionist: number;

  @Column({ type: 'int', default: 0, nullable: true, comment: '간호사 수' })
  employee_count_nurse: number;

  @Column({ type: 'int', default: 0, nullable: true, comment: '간호조무사 수' })
  employee_count_nursingassistant: number;

  @Column({ type: 'int', default: 0, nullable: true, comment: '요리원 수' })
  employee_count_cook: number;

  @Column({ type: 'int', default: 0, nullable: true, comment: '사무원 수' })
  employee_count_officeworker: number;

  @Column({ type: 'int', default: 0, nullable: true, comment: '기타 수' })
  employee_count_other: number;

  @Column({ type: 'int', default: 0, nullable: true, comment: '직원 합계' })
  employee_count: number;

  @Column({ type: 'varchar', default: '', nullable: true, comment: '대표명' })
  representative_name: string;

  @Column({ type: 'varchar', default: '', nullable: true, comment: '원장명' })
  director_name: string;

  @Column({ type: 'varchar', default: '', nullable: true, comment: '서비스' })
  service: string;

  @Column({
    type: 'timestamp',
    default: null,
    nullable: true,
    comment: '폐지일자',
  })
  abolition_date: Date; // 휴지일자

  @Column({
    type: 'timestamp',
    default: null,
    nullable: true,
    comment: '휴지 시작일자',
  })
  rest_start_date: Date;

  @Column({
    type: 'timestamp',
    default: null,
    nullable: true,
    comment: '휴지 끝일자',
  })
  rest_end_date: Date;

  @Column({
    type: 'date',
    default: null,
    nullable: true,
    comment: '인가일자',
  })
  authorization_date: Date; // 인가 일자

  @Column({
    type: 'varchar',
    default: null,
    nullable: true,
    comment: '상해보험',
  })
  insurance_detriment: string; // 보험

  @Column({
    type: 'varchar',
    default: null,
    nullable: true,
    comment: '화재보험',
  })
  insurance_fire: string; // 보험

  @Column({
    type: 'varchar',
    default: null,
    nullable: true,
    comment: '배상보험',
  })
  insurance_compensation: string; // 보험

  @Column({
    type: 'varchar',
    default: null,
    nullable: true,
    comment: '평가인증여부',
  })
  certification: string; // 평가인증여부

  @OneToMany(() => CenterLike, (centerLike) => centerLike.center, {
    eager: true,
  })
  center_likes: CenterLike[];
}
