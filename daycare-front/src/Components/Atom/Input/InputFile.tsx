/* eslint-disable react/destructuring-assignment */
import Theme from '@src/assets/global/Theme';
import { InputFileProps } from '@src/Type/Atom/Input';
import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  width: 100px;
  height: 100px;
  border-radius: 4px;
  color: #000000;
  border: 1px solid ${Theme.color.gray_C1};
  opacity: 0;
  z-index: 10;
  cursor: pointer;
`;

const StyledDiv = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border: 1px solid ${Theme.color.gray_C1};
  border-radius: 4px;
  cursor: pointer;
  background-color: #ffffff;
  transition: 0.3s;
  &:hover {
    background-color: ${Theme.color.gray_C1};
    opacity: 0.7;
  }
  & > span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 25px;
    font-weight: bold;
    font-family: '';
    z-index: 0;
  }
  & > img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100px;
    height: 100px;
    object-fit: cover;
    z-index: 5;
    background-color: #fff;
    border-radius: 4px;
  }
`;

const InputFile: React.FC<InputFileProps> = (props) => (
  <StyledDiv>
    <Input {...props} type="file" value="" />
    <span>+</span>
    {props.value && <img src={`${props.value}`} alt="dummyimages" />}
  </StyledDiv>
);

export default InputFile;
