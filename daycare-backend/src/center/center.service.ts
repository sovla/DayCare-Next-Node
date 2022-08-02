import { Length } from 'class-validator';
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prefer-const */
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Center } from 'src/domain/center.entity';
import {
  Brackets,
  IsNull,
  Like,
  Not,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { FindFilterDTO } from './dto/findFilter-center.dto';
import * as XLSX from 'xlsx';
import * as moment from 'moment-timezone';
import axios from 'axios';
import { LikeDto } from './dto/like-center.dto';
import { User } from 'src/domain/user.entity';
import { CenterLike } from 'src/domain/centerLike.entity';

const FormData = require('form-data');

@Injectable()
export class CenterService {
  constructor(
    @InjectRepository(Center)
    private centerRepository: Repository<Center>,

    @InjectRepository(CenterLike)
    private centerLikeRepository: Repository<CenterLike>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findCenters(str: string) {
    const likeStr = `%${str}%`;
    const findCenters = await this.centerRepository
      .createQueryBuilder('center')
      .where('operation_status != "폐지"')
      .andWhere(
        new Brackets(async (qb) => {
          qb.orWhere(`name Like :str`, { str: likeStr });
          qb.orWhere(`address_detail Like :str`, { str: likeStr });
          qb.orWhere(`city Like :str`, { str: likeStr });
          qb.orWhere(`city_detail Like :str`, { str: likeStr });
        }),
      )
      .limit(50)
      .getMany();

    return findCenters;
  }
  async likeCenter(likeDto: LikeDto) {
    const findCenter = await this.centerRepository.findOne({
      where: {
        id: +likeDto.center_id,
      },
      select: {
        id: true,
      },
    });
    if (!findCenter) {
      throw new HttpException('해당 센터는 존재하지 않습니다', 400);
    }

    const findUser = await this.userRepository.findOne({
      where: {
        id: +likeDto.id,
      },
      select: {
        id: true,
      },
    });

    if (!findUser) {
      throw new HttpException('존재하지 않는 유저입니다', 400);
    }
    const findCenterLike = await this.centerLikeRepository.findOne({
      where: {
        center: findCenter,
        user: findUser,
      },
    });
    if (findCenterLike) {
      this.centerLikeRepository.delete({
        id: findCenterLike.id,
      });
      return false;
    }

    this.centerLikeRepository.insert({
      center: findCenter,
      user: findUser,
    });

    return true;
  }

  async findOne(id: string) {
    const findCenter = await this.centerRepository.findOne({
      where: {
        id: +id,
      },
    });
    if (!findCenter) {
      throw new HttpException('존재하지 않는 센터입니다', 400);
    }
    if (findCenter.code.length === 0) {
      // 찾은 센터명에서 코드가 없을 경우
      const formData = new FormData();

      formData.append('latitude', `${findCenter.lat}`);
      formData.append('longitude', `${findCenter.lon}`);
      formData.append('distance', '1');
      // 폼데이터 생성 및 위도 경도 거리 필수 데이터 추가후

      const response = await axios.post(
        'https://e-childschoolinfo.moe.go.kr/kinderMt/kinderLocalFind.do',
        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          },
        },
      );

      if (Array.isArray(response.data)) {
        // 배열인지 여부 확인
        const apiFindCenter = response.data.find(
          (v) =>
            (+v.latitude == +findCenter.lat &&
              +v.longitude == +findCenter.lon) ||
            v.name === findCenter.name,
          // 위도 경도가 같거나 이름이 같은 경우
        );

        await this.centerRepository.update(
          {
            id: findCenter.id,
          },
          {
            code: apiFindCenter.id,
          }, // code 명을 변경 해준뒤
        );
        findCenter.code = apiFindCenter.id;
        // 기존에 찾은 findCenter의 code값을 변경
      }
    }
    return findCenter;
  }

  async findCentersByLocation(dto: FindFilterDTO) {
    // type property employee empty_class 의 경우 "a,b,c" 이런식으로 값을 전달
    const type = dto?.type?.length && dto.type.split(',');
    const property = dto?.property?.length && dto.property.split(',');
    const employee = dto?.employee?.length && dto.employee.split(',');
    const empty_class = dto?.empty_class?.length && dto.empty_class.split(',');

    const findCenterList = this.centerRepository
      .createQueryBuilder('center')
      // 필요한 값만 select
      // .select('homepage,address,tel,name,lat,lng,school_vehicle,type,id')
      // 현재 위치 기준으로 전체 거리 값을 계산해 distance로 select
      .addSelect(
        `6371 * acos(cos(radians(${dto.lat})) * cos(radians(lat)) * cos(radians(lon) - radians(${dto.lon})) + sin(radians(${dto.lat})) * sin(radians(lat)))`,
        'distance',
      )
      .where('operation_status != "폐지"') // 폐지가 아닌경우
      .andWhere(`city Like '%${dto?.city ?? ''}%'`) // city 값이 없을경우 전체 검색
      .andWhere(`city_detail Like '%${dto?.city_detail ?? ''}%'`) // city_detail 값이 없을경우 전체 검색
      .andWhere(
        new Brackets(async (qb) => {
          Array.isArray(type)
            ? type.forEach((v, i) => {
                // 여러 타입이 있을 경우 or 조건으로 검색 type = "공립" ||  type = "사립"
                qb.orWhere(`type = :type${i}`, {
                  [`type${i}`]: `${v}`,
                });
              })
            : qb.where("type Like '%%'");
        }),
      )
      .andWhere(
        new Brackets(async (qb) => {
          Array.isArray(property) &&
            // 여러 특성이 있을 경우 or 조건으로 검색 property 값의 경우 DB 컬럼명과 동일한 값이 들어옴 "Y" 인지 체크
            property.forEach((v) => {
              qb.orWhere(`${v} = 'Y'`);
            });
        }),
      )
      .andWhere(
        new Brackets(async (qb) => {
          // 여러 직원이 있을 경우 or 조건으로 검색 employee 값의 경우 DB 컬럼명과 동일한 값이 들어옴 0이상 인지 체크
          Array.isArray(employee) &&
            employee.forEach((v) => {
              qb.orWhere(`${v} > 0`);
            });
        }),
      )
      .andWhere(
        new Brackets(async (qb) => {
          // 비어있는 교실 수가 있을 경우 or 조건으로 검색 empty_class 값의 경우 DB 컬럼명과 동일한 값이 들어옴 0이상 인지 체크
          Array.isArray(empty_class) &&
            empty_class.forEach((v) => {
              qb.orWhere(`${v} > 0`);
            });
        }),
      )
      .andWhere(
        // 직원 수 n 이상인 경우
        `employee_count >= ${
          // length 는 string의 기본 메소드중 하나로 undefined 값이 들어올 경우 0으로 검색하도록
          dto?.employee_count?.length ? +dto.employee_count : 0
        }`,
      )
      .having(`distance <= ${dto?.radius ?? 50}`) // radius 반경 값이 있을경우
      .orderBy('distance', 'ASC') // 거리 기준으로 값 받아오기
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
    Array.isArray(dto) &&
      dto.forEach(async (value) => {
        const workbook = await XLSX.read(value.buffer, { type: 'buffer' });

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
        rows.forEach(async (row) => {
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
              lat: 위도,
              lon: 경도,
            },
            select: {
              id: true,
            },
          });

          console.log(
            '총길이 : ',
            rows.length,
            '업데이트 :',
            count,
            '추가 :',
            count1,
          );

          if (findCenter) {
            count++;
            await this.centerRepository.update(
              {
                id: findCenter.id,
              },
              {
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
                rest_start_date: 휴지시작일자,
                rest_end_date: 휴지종료일자,
                tel: tel,
                fax: fax,
                playground_count: +놀이터수 ?? 0,
                teaching_staff_count: 보육교직원수,
              },
            );
          } else {
            count1++;
            await this.centerRepository.insert({
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
        });
      });

    return {};

    // return;
  }

  async createCenterToExcelDetail(dto: Express.Multer.File[]) {
    const equalsNameArr = [];
    const notFoundArr = [];

    let count = 0;
    let count1 = 0;
    let count2 = 0;
    dto.forEach((item) => {
      const workbook = XLSX.read(item.buffer, { type: 'buffer' });

      const sheetName = workbook.SheetNames[0];

      // 첫번째 sheet 를 사용합니다.
      const sheet = workbook.Sheets[sheetName];

      // sheet 의 정보를 json array 로 변환합니다.
      const rows = XLSX.utils.sheet_to_json(sheet, {
        // cell 에 값이 비어있으면 '' 을 기본값으로 설정합니다.
        defval: null,
      });
      rows.forEach(async (row) => {
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
        if (student_count === '연령별현원' || student_count === '계') {
          return;
        }
        name = new String(name).trim();
        city = new String(city).trim();
        city_detail = new String(city_detail).trim();
        authorization_date = moment(authorization_date).format('YYYY-MM-DD');

        const findCenter = await this.centerRepository.findOne({
          where: {
            city: city,
            city_detail: city_detail,
            name: Like(`%${name}%`),
          },
          select: {
            id: true,
          },
        });

        console.log(
          `총 배열길이: ${
            rows.length
          } 카운트수 : ${count2} 업데이트 수 : ${count} ${!!findCenter}`,
        );

        if (findCenter) {
          count++;
          await this.centerRepository.update(
            {
              id: findCenter.id,
            },
            {
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
            },
          );
        } else {
          return;
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
              ...findByName,
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
      });
    });

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
