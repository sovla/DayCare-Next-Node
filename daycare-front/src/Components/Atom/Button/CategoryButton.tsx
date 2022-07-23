/* eslint-disable object-curly-newline */

import Theme from '@src/assets/global/Theme';
import { CategoryButtonProps } from '@src/Type/Atom/Button';
import React from 'react';
import styled from 'styled-components';

const Button = styled.button<{ isSelect: boolean }>`
  width: fit-content;
  height: 40px;
  padding: 8px 20px;
  text-align: center;
  border-radius: 30px;
  border: 1px solid ${Theme.color.gray_99};
  background-color: ${(p) => (p.isSelect ? Theme.color.blue_00 : '#FFFFFF')};

  cursor: pointer;
  & > p {
    color: ${(p) => (p.isSelect ? '#ffffff' : '#000000')};
  }
  @media (max-width: 768px) {
    overflow: visible;
    & > p {
      width: max-content;
    }
  }
`;

const CategoryButton: React.FC<CategoryButtonProps> = (props) => {
  const { content, isSelect, ...buttonProps } = props;
  return (
    <Button type="button" {...buttonProps} isSelect={isSelect}>
      <p>{content}</p>
    </Button>
  );
};

export default CategoryButton;
