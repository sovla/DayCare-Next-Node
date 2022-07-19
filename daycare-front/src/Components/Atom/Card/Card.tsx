import React from 'react';

import styled from 'styled-components';
import Image from 'next/image';
import { CardProps } from '@src/Type/Atom/Card';
import Theme from '@src/assets/global/Theme';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 400px;
  background-color: #ffffff;
  border-radius: 24px;
  overflow: hidden;

  cursor: pointer;
  transition: 0.3s;
  &:hover {
    opacity: 0.7;
  }
  & > .image {
    width: 300px;
    height: 300px;
    overflow: hidden;
  }
  h5,
  p {
    margin: 5px 8px;
  }
  & > h5 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  & > p {
    color: ${Theme.color.gray_99};
    word-wrap: break-word;
    text-overflow: ellipsis;
    max-height: 64px;
    width: 284px;
    overflow: hidden;
  }
`;

const CardComponents: React.FC<CardProps> = (props) => {
  const { image, title, content, onClick } = props;
  return (
    <Card onClick={onClick}>
      <div className="image">
        <Image
          src={image}
          alt="CardImage"
          objectFit="contain"
          layout="intrinsic"
          width="300px"
          height="300px"
        />
      </div>
      <h5>{title}</h5>
      <p>{content}</p>
    </Card>
  );
};

export default CardComponents;
