/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Center } from 'src/domain/center.entity';
import { Like, Repository } from 'typeorm';
import { FindFilterDTO } from './dto/findFilter-center.dto';
import * as XLSX from 'xlsx';
import * as moment from 'moment-timezone';

@Injectable()
export class CenterService {
  constructor(
    @InjectRepository(Center)
    private centerRepository: Repository<Center>,
  ) {}

  findOne(id: string) {
    return this.centerRepository.findOne({
      where: {
        id: +id,
      },
    });
  }

  findFilter(dto: FindFilterDTO) {
    const findCenterList = this.centerRepository
      .createQueryBuilder('center')
      .addSelect(
        `6371 * acos(cos(radians(${dto.lat})) * cos(radians(lat)) * cos(radians(lon) - radians(${dto.lon})) + sin(radians(${dto.lat})) * sin(radians(lat)))`,
        'distance',
      )
      .where('operation_status != "폐지"')
      .having(`distance <= ${dto?.radius ?? 50}`)
      .orderBy('distance', 'ASC')
      .limit(50)
      .getMany();

    return findCenterList;
  }

  async createCenterToExcel(
    dto:
      | Express.Multer.File[]
      | {
          [fieldname: string]: Express.Multer.File[];
        },
  ) {
    const workbook = await XLSX.read(dto[0].buffer, { type: 'buffer' });

    const sheetName = workbook.SheetNames[0];

    // 첫번째 sheet 를 사용합니다.
    const sheet = workbook.Sheets[sheetName];

    // sheet 의 정보를 json array 로 변환합니다.
    const rows = XLSX.utils.sheet_to_json(sheet, {
      // cell 에 값이 비어있으면 '' 을 기본값으로 설정합니다.
      defval: null,
    });
    let count = 0;
    let count1 = 0;
    let count2 = 0;
    for (const row of rows) {
      count2++;
      const values = Object.keys(row).map((key) => row[key]);
      let [
        시도,
        시군구,
        name,
        type,
        운영,
        우편번호,
        주소,
        tel,
        fax,
        보육실수,
        보육실면적,
        놀이터수,
        보육교직원수,
        정원수,
        현원수,
        위도,
        경도,
        통학차량운행,
        홈페이지,
        인가일자,
        휴지시작일자,
        휴지종료일자,
        폐지일자,
      ] = values;

      주소 = `${주소}`.trim();
      name = `${name}`.trim();
      인가일자 = moment(인가일자).format('YYYY-MM-DD');
      휴지시작일자 = moment(휴지시작일자).format('YYYY-MM-DD');
      휴지종료일자 = moment(휴지종료일자).format('YYYY-MM-DD');
      폐지일자 = moment(폐지일자).format('YYYY-MM-DD');

      const findCenter = await this.centerRepository.findOne({
        where: {
          address_detail: 주소,
          name: name,
        },
      });

      if (findCenter) {
        count++;
        await this.centerRepository.save({
          ...findCenter,
          city: 시도,
          city_detail: 시군구,
          type: type,
          operation_status: 운영,
          address_number: 우편번호,
          nursery_count: 보육실수,
          nursery_roomarea: 보육실면적,
          student_max: 정원수,
          student_count: 현원수,
          lat: 위도,
          lon: 경도,
          school_vehicle: 통학차량운행,
          homepage: 홈페이지,
          abolition_date: 폐지일자,
          authorization_date: 인가일자,
          rest_start_date: 휴지시작일자,
          rest_end_date: 휴지종료일자,
          tel: tel,
          fax: fax,
          playground_count: +놀이터수 ?? 0,
          teaching_staff_count: 보육교직원수,
        });
      } else {
        count1++;
        await this.centerRepository.save({
          city: 시도,
          city_detail: 시군구,
          type: type,
          operation_status: 운영,
          address_number: 우편번호,
          nursery_count: 보육실수,
          nursery_roomarea: 보육실면적,
          student_max: 정원수,
          student_count: 현원수,
          lat: 위도,
          lon: 경도,
          school_vehicle: 통학차량운행,
          homepage: 홈페이지,
          abolition_date: 폐지일자,
          authorization_date: 인가일자,
          rest_start_date: 휴지시작일자,
          rest_end_date: 휴지종료일자,
          tel: tel,
          fax: fax,
          playground_count: +놀이터수 ?? 0,
          teaching_staff_count: 보육교직원수,
          address_detail: 주소,
          name: name,
        });
      }
    }

    return {
      '총 배열수': count2,
      'Save ': count1,
      'Find Update': count,
    };

    // return;
  }

  async createCenterToExcelDetail(dto: Express.Multer.File[]) {
    const equalsNameArr = [];
    const notFoundArr = [];

    let count = 0;
    let count1 = 0;
    let count2 = 0;
    for (const item of dto) {
      const workbook = await XLSX.read(item.buffer, { type: 'buffer' });

      const sheetName = workbook.SheetNames[0];

      // 첫번째 sheet 를 사용합니다.
      const sheet = workbook.Sheets[sheetName];

      // sheet 의 정보를 json array 로 변환합니다.
      const rows = XLSX.utils.sheet_to_json(sheet, {
        // cell 에 값이 비어있으면 '' 을 기본값으로 설정합니다.
        defval: null,
      });

      for (const row of rows) {
        count2++;
        const values = Object.keys(row).map((key) => row[key]);
        let [
          name,
          type,
          city,
          city_detail,
          city_dong,
          city_scale,
          support,
          property_normal,
          property_infants,
          property_impaired,
          property_impaired_combine,
          property_after,
          property_after_combine,
          property_time_extension,
          property_holiday,
          property_allday,
          director_name,
          consignment_status,
          consignment_type,
          consignment_name,
          authorization_date,
          student_max,
          충족율,
          student_count,
          child_count_age0,
          child_count_age1,
          child_count_age2,
          child_count_age3,
          child_count_age4,
          child_count_age5,
          child_count_age6,
          child_count_age7,
          child_count,
          nuri_impaired_count,
          impaired_allday_count,
          impaired_after_count,
          normal_child_count_age0,
          normal_child_count_mix01,
          normal_child_count_age1,
          normal_child_count_mix12,
          normal_child_count_age2,
          normal_child_count_mix23,
          normal_child_count_age3,
          normal_child_count_mix34,
          normal_child_count_age4,
          normal_after_child_count,
          normal_holiday_child_count,
          infant_child_count,
          impaired_child_count,
          impaired_after_child_count,
          impaired_extension_child_count,
          impaired_holiday_child_count,
          impaired_allday_child_count,
          employee_count,
          employee_count_director,
          employee_count_nursery,
          employee_count_special,
          employee_count_cure,
          employee_count_nutritionist,
          employee_count_cook,
          employee_count_nurse,
          employee_count_officeworker,
          employee_count_other,
          certification,
          tel,
          fax,
          주소,
          insurance_detriment,
          insurance_fire,
          insurance_compensation,
        ] = values;

        주소 = `${주소}`.trim();
        name = `${name}`.trim();
        authorization_date = moment(authorization_date).format('YYYY-MM-DD');

        const findCenter = await this.centerRepository.findOne({
          where: {
            name: name,
            city: city,
            city_detail: city_detail,
            address_detail: Like(주소 + '%'),
          },
        });

        if (findCenter) {
          count++;
          this.centerRepository.save({
            ...findCenter,
            student_count,
            child_count_age0,
            child_count_age1,
            child_count_age2,
            child_count_age3,
            child_count_age4,
            child_count_age5,
            child_count_age6,
            child_count_age7,
            child_count,
            nuri_impaired_count,
            impaired_allday_count,
            impaired_after_count,
            normal_child_count_age0,
            normal_child_count_mix01,
            normal_child_count_age1,
            normal_child_count_mix12,
            normal_child_count_age2,
            normal_child_count_mix23,
            normal_child_count_age3,
            normal_child_count_mix34,
            normal_child_count_age4,
            normal_after_child_count,
            normal_holiday_child_count,
            infant_child_count,
            impaired_child_count,
            impaired_after_child_count,
            impaired_extension_child_count,
            impaired_holiday_child_count,
            impaired_allday_child_count,
            employee_count,
            employee_count_director,
            employee_count_nursery,
            employee_count_special,
            employee_count_cure,
            employee_count_nutritionist,
            employee_count_cook,
            employee_count_nurse,
            employee_count_officeworker,
            employee_count_other,
            certification,
            tel,
            fax,
            city_dong,
            city_scale,
            support,
            property_normal,
            property_infants,
            property_impaired,
            property_impaired_combine,
            property_after,
            property_after_combine,
            property_time_extension,
            property_holiday,
            property_allday,
            director_name,
            consignment_status,
            consignment_type,
            consignment_name,
            student_max,
            insurance_detriment,
            insurance_fire,
            insurance_compensation,
            address_detail: 주소,
          });
        } else {
          const findByName = await this.centerRepository.findOne({
            where: {
              name: name,
              type: type,
              city: city,
              city_detail: city_detail,
            },
          });
          if (findByName) {
            this.centerRepository.save({
              ...findCenter,
              student_count,
              child_count_age0,
              child_count_age1,
              child_count_age2,
              child_count_age3,
              child_count_age4,
              child_count_age5,
              child_count_age6,
              child_count_age7,
              child_count,
              nuri_impaired_count,
              impaired_allday_count,
              impaired_after_count,
              normal_child_count_age0,
              normal_child_count_mix01,
              normal_child_count_age1,
              normal_child_count_mix12,
              normal_child_count_age2,
              normal_child_count_mix23,
              normal_child_count_age3,
              normal_child_count_mix34,
              normal_child_count_age4,
              normal_after_child_count,
              normal_holiday_child_count,
              infant_child_count,
              impaired_child_count,
              impaired_after_child_count,
              impaired_extension_child_count,
              impaired_holiday_child_count,
              impaired_allday_child_count,
              employee_count,
              employee_count_director,
              employee_count_nursery,
              employee_count_special,
              employee_count_cure,
              employee_count_nutritionist,
              employee_count_cook,
              employee_count_nurse,
              employee_count_officeworker,
              employee_count_other,
              certification,
              tel,
              fax,
              city_dong,
              city_scale,
              support,
              property_normal,
              property_infants,
              property_impaired,
              property_impaired_combine,
              property_after,
              property_after_combine,
              property_time_extension,
              property_holiday,
              property_allday,
              director_name,
              consignment_status,
              consignment_type,
              consignment_name,
              student_max,
              insurance_detriment,
              insurance_fire,
              insurance_compensation,
            });
          } else {
            if (name != null && name != '' && name != 'null') {
              notFoundArr.push(values);
            }
          }
        }
      }
    }

    return {
      '총 배열수': count2,
      'Save ': count1,
      'Find Update': count,
      notFoundArrLength: notFoundArr.length,
      notFoundArr: notFoundArr,
    };

    // return;
  }
}
