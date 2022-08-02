/* eslint-disable no-unused-vars */
import React from 'react';
import { category } from '../API/category';
import { RowProps } from '../Atom/Board';

export interface CategoriesProps {
  categoryList: category[];
  onClickCategory: (args: number) => void;
  selectCategory: number;
}

export interface PaginationProps {
  selectPage: number;
  maxPage: number;
  // eslint-disable-next-line no-unused-vars
  onClickPage: (page: number) => void;
}

export interface TableProps {
  boardList: RowProps[];
}
