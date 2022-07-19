import React from 'react';
import styled from 'styled-components';
import Dummy from '@src/assets/image/dummy1.png';
import { CardsProps } from '@src/Type/Template/Introduction';
import CardComponents from '@src/Components/Atom/Card/Card';

const ContainerDiv = styled.div<Pick<CardsProps, 'width'>>`
  display: flex;
  width: ${(p) => p.width ?? '1440px'};
  justify-content: space-between;
`;

const Cards: React.FC<CardsProps> = (props) => {
  const { CardList, width } = props;
  return (
    <ContainerDiv width={width}>
      {CardList.map((v, i) => (
        <CardComponents
          key={v.title}
          title={v.title}
          content={v.content}
          image={v?.image ?? Dummy}
          objectFit={i !== 1 ? 'cover' : 'contain'}
          onClick={v?.onClick}
        />
      ))}
    </ContainerDiv>
  );
};

export default Cards;
