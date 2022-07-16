import Theme from '@src/assets/global/Theme';
import { BlueButtonProps } from '@src/Type/Atom/Button';
import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: ${Theme.color.blue_25};
  width: 240px;
  height: 30px;
  border-radius: 4px;
  vertical-align: auto;
  & > small {
    color: #ffffff;
  }
`;

const BlueButton: React.FC<BlueButtonProps> = (props) => {
  const { buttonProps, content } = props;
  return (
    <Button {...buttonProps}>
      <small>{content}</small>
    </Button>
  );
};

export default BlueButton;
