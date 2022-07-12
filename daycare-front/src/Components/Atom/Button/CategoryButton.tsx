/* eslint-disable object-curly-newline */

import Theme from '@src/assets/global/Theme';
import { CategoryButtonProps } from '@src/Type/Atom/Button';
import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 'fit-content';
  height: '40px';
  padding: 8px 20px;
  text-align: center;
  border-radius: 30px;
  border: 1px solid ${Theme.color.gray_99};
  background-color: #fff0;
`;

const CategoryButton: React.FC<CategoryButtonProps> = (props) => {
  const { content, ...buttonProps } = props;
  return (
    <Button type="button" {...buttonProps}>
      <p>{content}</p>
    </Button>
  );
};

export default CategoryButton;
