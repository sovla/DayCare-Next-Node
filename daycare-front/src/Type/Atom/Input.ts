import { MouseEventHandler } from 'react';
import { StyledComponentProps } from 'styled-components';

export interface InputTextProps
  extends StyledComponentProps<'input', any, {}, never> {
  width?: string;
  height?: string;
  type: 'text' | 'password' | 'email';
}

export interface SearchProps {
  inputProps: StyledComponentProps<'input', any, {}, never>;
  width?: string;
  height?: string;
  onClick: MouseEventHandler<HTMLElement>;
}

export interface SelectProps
  extends StyledComponentProps<'select', any, {}, never> {
  menuList: string[];
  width: string;
}
