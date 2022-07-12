import Theme from '@src/assets/global/Theme';
import { IconButtonProps } from '@src/Type/Atom/Button';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 70px;
  height: 70px;
  background-color: ${Theme.color.blue_007};
  border-radius: 16px;
`;

const IconButton: React.FC<IconButtonProps> = (props) => {
  const { buttonProps, image } = props;
  return (
    <Button {...buttonProps}>
      <i>
        <Image src={image} width={46} height={46} alt="icon" />
      </i>
    </Button>
  );
};

export default IconButton;
