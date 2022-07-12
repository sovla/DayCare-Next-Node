import { StaticImageData } from 'next/image';

export type NextImageSrc =
  | string
  | {
      default: StaticImageData;
    }
  | StaticImageData;

export interface CardProps {
  title: string;
  content: string;
  image: NextImageSrc;
}
