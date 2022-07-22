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
  const { categoryList, onClickCategory, selectCategory } = props;
  return (
    <ContainerDiv>
      {categoryList.map((v) => (
        <CategoryButton
          content={v.title}
          key={v.id}
          onClick={() => onClickCategory(v.id)}
          isSelect={selectCategory === v.id}
        />
      ))}
    </ContainerDiv>
  );
};

export default Categories;
