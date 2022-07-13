/* eslint-disable react/no-array-index-key */
import { PaginationProps } from '@src/Type/Template/Board';
import React, { useMemo } from 'react';
import BSRPagination from 'react-bootstrap/Pagination';

//  reset css 방지
import './css/Pagination.css';

const Pagination: React.FC<PaginationProps> = (props) => {
  const { maxPage, onClickPage, selectPage } = props;

  const pageArray = useMemo(() => {
    const array = [];
    for (let index = selectPage - 4; array.length < 9; index += 1) {
      if (index > 0) {
        array.push(index);
      }
    }
    return array;
  }, [selectPage]);

  return (
    <BSRPagination size="sm">
      <BSRPagination.First
        disabled={selectPage === 1}
        onClick={() => onClickPage(1)}
      />
      <BSRPagination.Prev
        disabled={selectPage - 5 < 1}
        onClick={() => onClickPage(selectPage - 5)}
      />
      {pageArray.map((v, i) => {
        if (v > maxPage) {
          return null;
        }
        return (
          <BSRPagination.Item active={selectPage === v} key={i}>
            {v}
          </BSRPagination.Item>
        );
      })}
      <BSRPagination.Next
        disabled={selectPage + 5 > maxPage}
        onClick={() => onClickPage(selectPage + 5)}
      />
      <BSRPagination.Last
        disabled={selectPage === maxPage}
        onClick={() => onClickPage(maxPage)}
      />
    </BSRPagination>
  );
};

export default Pagination;
