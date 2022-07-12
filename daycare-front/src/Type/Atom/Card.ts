import { StaticImageData } from 'next/image';

export type NextImageProps =
  | string
  | {
      default: StaticImageData;
    }
  | StaticImageData;

export interface CardProps {
  title: string;
  content: string;
  image: NextImageProps;
}
