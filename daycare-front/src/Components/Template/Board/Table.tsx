import Row from '@src/Components/Atom/Board/Row';
import { TableProps } from '@src/Type/Template/Board';
import React from 'react';

const Table: React.FC<TableProps> = (props) => {
  const { boardList } = props;
  return (
    <>
      <Row
        category="카테고리/번호"
        title="제목"
        write="작성자"
        writeDate="작성일"
        viewCount="조회수"
        likeCount="좋아요"
      />
      {boardList.map((v) => (
        <Row
          key={v.writeDate + v.write}
          category={v.category}
          title={v.title}
          write={v.write}
          writeDate={v.writeDate}
          viewCount={v.viewCount}
          likeCount={v.likeCount}
          reviewCount={v.reviewCount}
        />
      ))}
    </>
  );
};

export default Table;
