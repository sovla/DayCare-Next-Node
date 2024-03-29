import { StyledComponentProps } from 'styled-components';
import { NextImageSrc } from './Card';

export interface CategoryButtonProps
  extends StyledComponentProps<'button', any, {}, never> {
  content: string;
  isSelect: boolean;
}

export interface DetailMenuButtonProps {
  buttonProps: StyledComponentProps<'button', any, {}, never>;
  menu: string;
  image: NextImageSrc;
  alt: string;
}

export interface BlueButtonProps {
  content: string;
  buttonProps: StyledComponentProps<'button', any, {}, never>;
}

export interface ButtonProps {
  content: string;
  color?: string;
  buttonProps: StyledComponentProps<'button', any, {}, never>;
}

export interface IconButtonProps {
  image: NextImageSrc;
  imageSize?: {
    width: number;
    height: number;
  };
  buttonProps: StyledComponentProps<'button', any, {}, never>;
}
