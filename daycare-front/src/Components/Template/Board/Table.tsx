import Row from '@src/Components/Atom/Board/Row';
import { TableProps } from '@src/Type/Template/Board';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const StyledRow = styled.div`
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    opacity: 0.7;
  }
`;

const Table: React.FC<TableProps> = (props) => {
  const { boardList } = props;
  const router = useRouter();
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
        <StyledRow key={v.id} onClick={() => router.push(`/board/${v.id}`)}>
          <Row
            category={v.category}
            title={v.title}
            write={v.write}
            writeDate={v.writeDate}
            viewCount={v.viewCount}
            likeCount={v.likeCount}
            reviewCount={v.reviewCount}
          />
        </StyledRow>
      ))}
    </>
  );
};

export default Table;
