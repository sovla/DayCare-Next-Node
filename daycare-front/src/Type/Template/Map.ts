/* eslint-disable no-unused-vars */
import { dummyCenter } from '@src/assets/global/Dummy';
import { SimpleCenterProps } from '@src/Type/Atom/Center';
import { NextImageSrc } from '../Atom/Card';

export interface CentersProps {
  centerList: SimpleCenterProps[];
  onClickCenter: (id: number) => any;
  selectCenter: typeof dummyCenter | null;
}

export interface DetailCenterProps {
  image: NextImageSrc;
  onClickDetailInformation: () => void;
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
