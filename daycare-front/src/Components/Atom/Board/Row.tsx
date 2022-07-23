import Theme from '@src/assets/global/Theme';
import { RowProps } from '@src/Type/Atom/Board';
import React from 'react';
import styled from 'styled-components';

const RowDiv = styled.div`
  width: 1450px;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid ${Theme.color.gray_99};
  & > div:not(.title) {
    width: 100px;
  }
  & > .title {
    width: calc(100% - 500px);
  }
  & > div {
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .reviewCount {
    color: ${Theme.color.orange_FF};
    margin-left: 3px;
  }
  @media (max-width: 1440px) {
    width: calc(100vw - 80px);
    margin: 0px 40px;
  }
  @media (max-width: 768px) {
    width: 90vw;
    display: grid;
    margin: 0px 5vw 5px;

    grid-auto-rows: minmax(15px, auto);
    grid-auto-columns: minmax(15px, auto);
    grid-template-columns:
      minmax(15px, auto) minmax(15px, auto) minmax(15px, auto)
      minmax(15px, auto);
    grid-template-rows: 50px 50px;
    justify-content: start;
    gap: 5px;
    height: 100px;
    border-radius: 16px;
    padding: 0px 10px;

    & > .category {
      display: none;
    }
    & > .title {
      grid-column-start: 1;
      grid-column-end: 5;
      grid-row-start: 1;
      grid-row-end: 2;
      width: fit-content;
      & > span {
        font-size: 16px;
        margin-left: 10px;
      }
    }
    & > div:not(.title) {
      width: auto;
      & * {
        color: ${Theme.color.gray_99};
        font-size: 12px;
      }
    }

    & > .viewCount > span::before {
      content: '조회수 ';
    }
    & > .likeCount > span::before {
      content: '좋아요 ';
    }
  }
`;

const Row: React.FC<RowProps> = ({
  category,
  likeCount,
  title,
  viewCount,
  write,
  writeDate,
  reviewCount,
}) => (
  <RowDiv>
    <div className="category">
      <span>{category}</span>
    </div>
    <div className="title">
      <span>{title}</span>
      {reviewCount && reviewCount > 0 ? (
        <span className="reviewCount">{`[${reviewCount}]`}</span>
      ) : null}
    </div>
    <div className="write">
      <span>{write}</span>
    </div>
    <div className="writeDate">
      <span>{writeDate}</span>
    </div>
    <div className="viewCount">
      <span>{viewCount}</span>
    </div>
    <div className="likeCount">
      <span>{likeCount}</span>
    </div>
  </RowDiv>
);

export default Row;
