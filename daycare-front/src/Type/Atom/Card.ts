import { StaticImageData } from 'next/image';

export interface CardProps {
  title: string;
  content: string;
  image:
    | string
    | {
        default: StaticImageData;
      }
    | StaticImageData;
}
