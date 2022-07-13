import { NextImageSrc } from './Card';

export interface SimpleCenterProps {
  name: string;
  address: string;
  tel: string;
  homepage?: string;
  image: NextImageSrc;
  type: string;
  isSchoolBus: boolean;
}
