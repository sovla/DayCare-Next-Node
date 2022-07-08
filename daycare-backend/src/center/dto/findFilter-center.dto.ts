export class FindFilterDTO {
  lat: string;
  lon: string;
  type: string | null;
  city: string | null;
  city_detail: string | null;
  max: boolean | null;
  property: string | null;
  empty_class: string | null;
  employee_count: number | null;
  employee: string | null;
  radius: number | null;
}
