import CategoryButton from '@src/Components/Atom/Button/CategoryButton';
import { CategoriesProps } from '@src/Type/Template/Board';
import React from 'react';
import styled from 'styled-components';

const ContainerDiv = styled.div`
  & > button {
    margin-right: 10px;
  }
  @media (max-width: 768px) {
    display: flex;
    width: max-content;
    overflow-y: hidden;
    overflow-x: scroll;
    *::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 0px rgba(0, 0, 0, 0.3);
      background-color: #f5f5f5;
    }

    *::-webkit-scrollbar {
      width: 0px;
      height: 0px;
      background-color: #f5f5f5;
    }

    *::-webkit-scrollbar-thumb {
      background-color: #000000;
    }
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
