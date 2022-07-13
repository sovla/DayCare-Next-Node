import React from 'react';
import { Card } from 'stories/Atom/Card.stories';
import styled from 'styled-components';
import Dummy from '@src/assets/image/dummy1.png';
import { CardsProps } from '@src/Type/Template/Introduction';

const ContainerDiv = styled.div<Pick<CardsProps, 'width'>>`
  display: flex;
  width: ${(p) => p.width ?? '1440px'};
  justify-content: space-between;
`;

const Cards: React.FC<CardsProps> = (props) => {
  const { CardList, width } = props;
  return (
    <ContainerDiv width={width}>
      {CardList.map((v) => (
        <Card
          key={v.title}
          title={v.title}
          content={v.content}
          image={v?.image ?? Dummy}
        />
      ))}
    </ContainerDiv>
  );
};

export default Cards;
