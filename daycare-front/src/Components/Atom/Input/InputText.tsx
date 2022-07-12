/* eslint-disable react/jsx-props-no-spreading */
import Theme from '@src/assets/global/Theme';
import { InputTextProps } from '@src/Type/Atom/Input';
import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  width: ${(p) => p.width ?? '240px'};
  height: ${(p) => p.height ?? '40px'};
  border-radius: 4px;
  color: #000000;
  border: 1px solid ${Theme.color.gray_C1};
  padding: 0px 10px;
  &::placeholder {
    color: ${Theme.color.gray_99};
  }
`;

const InputText: React.FC<InputTextProps> = (props) => <Input {...props} />;

export default InputText;
