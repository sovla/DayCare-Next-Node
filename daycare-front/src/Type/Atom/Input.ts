import { MouseEventHandler } from 'react';
import { StyledComponentProps } from 'styled-components';

export interface InputTextProps
  extends StyledComponentProps<'input', any, {}, never> {
  width?: string;
  height?: string;
  type: 'text' | 'password';
}

export interface SearchProps {
  inputProps: StyledComponentProps<'input', any, {}, never>;
  width?: string;
  height?: string;
  onClick: MouseEventHandler<HTMLElement>;
}
