import { StyledComponentProps } from 'styled-components';

export interface InputTextProps
  extends StyledComponentProps<'input', any, {}, never> {
  width?: string;
  height?: string;
}
