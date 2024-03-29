/* eslint-disable react/no-array-index-key */
import Theme from '@src/assets/global/Theme';
import { PaginationProps } from '@src/Type/Template/Board';
import React, { useMemo } from 'react';
import styled from 'styled-components';

const PaginationUl = styled.ul`
  display: flex;
  background-color: #ffffff;

  & > li:first-of-type > button {
    border-radius: 5px 0px 0px 5px;
  }

  & > li:last-of-type > button {
    border-radius: 0px 5px 5px 0px;
  }
  & > li:nth-of-type(-n + 2) > button {
    padding-bottom: 3px;
    font-size: 16px;
  }
  & > li:nth-last-of-type(-n + 2) > button {
    padding-bottom: 3px;
    font-size: 16px;
  }
`;
const PageButton = styled.button<{ active?: boolean }>`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.2px solid ${Theme.color.gray_C1};

  color: ${(p) => {
    if (p.disabled) {
      return Theme.color.gray_99;
    }
    if (p.active) {
      return '#ffffff';
    }
    return Theme.color.blue_00;
  }};
  transition: 0.3s;
  background-color: ${(p) => (p.active ? Theme.color.blue_00 : '#ffffff')};
  &:hover {
    background-color: ${(p) => (p.disabled ? '#ffffff' : Theme.color.gray_D9)};
  }
`;

const Pagination: React.FC<PaginationProps> = (props) => {
  const { maxPage, onClickPage, selectPage } = props;

  const pageArray = useMemo(() => {
    const array = [];
    for (let index = selectPage - 4; array.length < 9; index += 1) {
      // 1 2 3 4 5 6 7 8 9 형태로 나타내기 위함
      // 올라가면서 검색
      if (index > 0) {
        array.push(index);
      }
      if (index >= maxPage) {
        // 최대 값보다 크면 break;
        break;
      }
    }

    if (array.length < 9) {
      // 만약 9개의 갯수를 채우지 못했다면
      for (let index = selectPage; array.length < 9; index -= 1) {
        // 거꾸로 내려가면서 검색
        if (index > 0 && !array.includes(index)) {
          // 0 이상이고 현재 배열에 없을 경우 추가
          array.push(index);
        }
        if (index === 0) {
          //
          break;
        }
      }
    }

    return array.sort((a, b) => a - b);
  }, [selectPage, maxPage]);

  return (
    <PaginationUl>
      <li>
        <PageButton
          type="button"
          disabled={selectPage === 1}
          onClick={() => onClickPage(1)}
        >
          «
        </PageButton>
      </li>
      <li>
        <PageButton
          type="button"
          disabled={selectPage - 5 < 1}
          onClick={() => onClickPage(selectPage - 5)}
        >
          ‹
        </PageButton>
      </li>

      {pageArray.map((v) => {
        if (v > maxPage) {
          return null;
        }
        return (
          <li key={v}>
            <PageButton
              onClick={() => onClickPage(v)}
              active={selectPage === v}
              type="button"
            >
              {v}
            </PageButton>
          </li>
        );
      })}
      <li>
        <PageButton
          type="button"
          disabled={selectPage + 5 > maxPage}
          onClick={() => onClickPage(selectPage + 5)}
        >
          ›
        </PageButton>
      </li>
      <li>
        <PageButton
          type="button"
          disabled={selectPage >= maxPage}
          onClick={() => onClickPage(maxPage)}
        >
          »
        </PageButton>
      </li>
    </PaginationUl>
  );
};

export default Pagination;
