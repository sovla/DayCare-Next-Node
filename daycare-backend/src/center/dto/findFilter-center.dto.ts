import { Center } from './../../domain/center.entity';
export class FindFilterDTO {
  lat: string;
  lon: string;
  type: string | undefined;
  city: string | undefined;
  city_detail: string | undefined;
  max: string | undefined;
  property:
    | 'property_after'
    | 'property_after_combine'
    | 'property_allday'
    | 'property_holiday'
    | 'property_impaired'
    | 'property_impaired_combine'
    | 'property_infants'
    | 'property_normal'
    | 'property_time_extension'
    | undefined;
  empty_class:
    | 'child_count_age0'
    | 'child_count_age1'
    | 'child_count_age2'
    | 'child_count_age3'
    | 'child_count_age4'
    | 'child_count_age5'
    | undefined;
  employee_count: string | undefined;
  employee:
    | 'employee_count_cook'
    | 'employee_count_director'
    | 'employee_count_cure'
    | 'employee_count_special'
    | 'employee_count_other'
    | 'employee_count_officeworker'
    | 'employee_count_nutritionist'
    | 'employee_count_nursingassistant'
    | 'employee_count_nursery'
    | 'employee_count_nurse'
    | undefined;
  radius: string | undefined;
}
