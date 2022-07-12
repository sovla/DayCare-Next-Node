import CategoryButton from '@src/Components/Atom/Button/CategoryButton';
import { CategoriesProps } from '@src/Type/Template/Board';
import React from 'react';

const Categories: React.FC<CategoriesProps> = (props) => {
  const { categoryList } = props;
  return (
    <>
      {categoryList.map((v) => (
        <CategoryButton content={v} key={v} />
      ))}
    </>
  );
};

export default Categories;
