/* eslint-disable no-unused-vars */

export interface LoginProps {
  setIsSignUp: () => any;
}

export interface SignUpProps {
  setIsLogin: () => any;
}

export interface filterType {
  type: string[];
  city: string | null;
  cityDetail: string | null;
  personnel: boolean | null;
  characteristic: string[];
  classType: string[];
  employeeCount: number | null;
  employee: string[];
}
export interface FilterProps {
  setIsShow: (filter: boolean) => void;
  isShow: boolean;
  returnFilter: ({
    type,
    city,
    cityDetail,
    personnel,
    characteristic,
    classType,
    employeeCount,
    employee,
  }: filterType) => void;
  filter: filterType;
}
