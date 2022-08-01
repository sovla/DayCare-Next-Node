/* eslint-disable no-unused-vars */
import { MouseEventHandler } from 'react';
import { StyledComponentProps } from 'styled-components';

export interface InputTextProps
  extends StyledComponentProps<'input', any, {}, never> {
  width?: string;
  height?: string;
  type: 'text' | 'password' | 'email' | 'number';
}

export interface InputFileProps
  extends StyledComponentProps<'input', any, {}, never> {}

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

export interface CheckBoxProps {
  content: string;
  isCheck: boolean;
  setIsCheck: (check: boolean) => void;
}
