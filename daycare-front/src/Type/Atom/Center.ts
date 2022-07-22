import { NextImageSrc } from './Card';

export interface SimpleCenterProps {
  id: number;
  name: string;
  address: string;
  tel: string;
  homepage?: string;
  image: NextImageSrc;
  type: string;
  isSchoolBus: boolean;
  isActive?: boolean;
}
