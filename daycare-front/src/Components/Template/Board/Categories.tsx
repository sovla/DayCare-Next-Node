import CategoryButton from '@src/Components/Atom/Button/CategoryButton';
import { CategoriesProps } from '@src/Type/Template/Board';
import React from 'react';
import styled from 'styled-components';

const ContainerDiv = styled.div`
  & > button {
    margin-right: 10px;
  }
`;

const Categories: React.FC<CategoriesProps> = (props) => {
  const { categoryList } = props;
  return (
    <ContainerDiv>
      {categoryList.map((v) => (
        <CategoryButton content={v} key={v} />
      ))}
    </ContainerDiv>
  );
};

export default Categories;
