import { SimpleCenterProps } from '@src/Type/Atom/Center';
import { NextImageSrc } from '../Atom/Card';

export interface CentersProps {
  centerList: SimpleCenterProps[];
}

export interface DetailCenterProps {
  image: NextImageSrc;
  center: {
    name: string;
    city: string;
    authorizationDate: string;
    tel: string;
    operatingTime: string;
    address: string;
    representativeName: string;
    directorName: string;
  };
  classList: {
    title: string;
    value: string;
  }[];
}
