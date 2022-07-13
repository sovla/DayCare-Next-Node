import { RowProps } from '../Atom/Board';

export interface CategoriesProps {
  categoryList: string[];
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
