import Theme from '@src/assets/global/Theme';
import { ButtonProps } from '@src/Type/Atom/Button';
import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  width: 100px;
  height: 30px;
  border-radius: 4px;
  vertical-align: auto;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    opacity: 0.7;
  }
  & > small {
    color: #ffffff;
    font-size: 14px;
  }
`;

const Button: React.FC<ButtonProps> = (props) => {
  const { buttonProps, content, color = Theme.color.blue_25 } = props;
  return (
    <StyledButton {...buttonProps} style={{ backgroundColor: color }}>
      <small>{content}</small>
    </StyledButton>
  );
};

export default Button;
