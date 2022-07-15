/* eslint-disable no-unused-vars */
import { SimpleCenterProps } from '@src/Type/Atom/Center';
import { NextImageSrc } from '../Atom/Card';

export interface CentersProps {
  centerList: SimpleCenterProps[];
  onClickCenter: (id: number) => void;
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
    id: number;
  };
  classList: {
    title: string;
    value: string;
  }[];
}
