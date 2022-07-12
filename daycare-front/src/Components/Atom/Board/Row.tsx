import Theme from '@src/assets/global/Theme';
import { RowProps } from '@src/Type/Atom/Board';
import React from 'react';
import styled from 'styled-components';

const RowDiv = styled.div`
  width: 1450px;
  height: 50px;
  display: flex;
  align-items: center;
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
      {reviewCount && <span className="reviewCount">{`[${reviewCount}]`}</span>}
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
