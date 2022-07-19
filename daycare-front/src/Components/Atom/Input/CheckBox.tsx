/* eslint-disable indent */
import Theme from '@src/assets/global/Theme';
import { CheckBoxProps } from '@src/Type/Atom/Input';
import React from 'react';
import styled, { css } from 'styled-components';

const StyledCheckBoxDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 10px;
`;

const StyledLabel = styled.label<{ isCheck: boolean }>`
  & {
    border-radius: 100%;
    width: 15px;
    height: 15px;
    border: 1px solid ${Theme.color.gray_C1};
    border-radius: 100%;
    position: relative;
    margin-right: 5px;
    cursor: pointer;
    ${(p) =>
      p.isCheck &&
      css`
        &::after {
          content: '●';
          font-size: 15px;
          color: ${Theme.color.blue_00};
          width: 15px;
          height: 15px;
          position: absolute;
          left: 0;
          top: 0;
        }
      `}

    & > input {
      display: none;
    }
  }
`;

const CheckBox: React.FC<CheckBoxProps> = (props) => {
  const { content, isCheck, setIsCheck } = props;
  return (
    <StyledCheckBoxDiv
      onClick={(e) => {
        e.preventDefault();
        setIsCheck(isCheck);
      }}
    >
      <StyledLabel isCheck={isCheck} htmlFor={content}>
        <input type="checkbox" id={content} />
      </StyledLabel>
      <span>{content}</span>
    </StyledCheckBoxDiv>
  );
};

export default CheckBox;
