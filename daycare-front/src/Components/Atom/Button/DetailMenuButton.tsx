import { DetailMenuButtonProps } from '@src/Type/Atom/Button';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .menu-text {
    margin-top: 5px;
  }
`;

const DetailMenuButton: React.FC<DetailMenuButtonProps> = (props) => {
  const { image, menu, alt, buttonProps } = props;
  return (
    <Button {...buttonProps}>
      <Image src={image} alt={alt} width={40} height={40} />
      <span className="menu-text">{menu}</span>
    </Button>
  );
};

export default DetailMenuButton;
