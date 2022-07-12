import { StyledComponentProps } from 'styled-components';
import { NextImageProps } from './Card';

export interface CategoryButtonProps
  extends StyledComponentProps<'button', any, {}, never> {
  content: string;
}

export interface DetailMenuButtonProps {
  buttonProps: StyledComponentProps<'button', any, {}, never>;
  menu: string;
  image: NextImageProps;
  alt: string;
}
