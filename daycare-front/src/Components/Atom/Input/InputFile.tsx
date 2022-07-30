import Theme from '@src/assets/global/Theme';
import { InputTextProps } from '@src/Type/Atom/Input';
import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  width: 100px;
  height: 100px;
  border-radius: 4px;
  color: #000000;
  border: 1px solid ${Theme.color.gray_C1};
  opacity: 0;
  z-index: 100;
  cursor: pointer;
`;

const StyledDiv = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border: 1px solid ${Theme.color.gray_C1};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${Theme.color.yellow_FFE};
  }
  & > span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 25px;
    font-weight: bold;
    font-family: '';
  }
`;

const InputFile: React.FC<InputTextProps> = (props) => (
  <StyledDiv>
    <Input {...props} type="file" />
    <span>+</span>
  </StyledDiv>
);

export default InputFile;
