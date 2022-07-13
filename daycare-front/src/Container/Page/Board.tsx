import Theme from '@src/assets/global/Theme';
import IconButton from '@src/Components/Atom/Button/IconButton';
import WriteIcon from '@src/assets/image/WriteIcon.png';
import Search from '@src/Components/Atom/Input/Search';
import Categories from '@src/Components/Template/Board/Categories';
import Pagination from '@src/Components/Template/Board/Pagination';
import Table from '@src/Components/Template/Board/Table';
import Menu from '@src/Components/Template/Layout/Menu';
import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';

const ContainerDiv = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${Theme.color.yellow_FFE};

  .page-link {
    line-height: 1.5;
  }
  .nav-menu {
    position: fixed;
    top: 0px;
    right: 30px;
    z-index: 5;
  }
  .subject {
    padding: 90px 235px 20px 240px;
    & > h2 {
      margin-bottom: 20px;
    }
    & > div {
      display: flex;
      justify-content: space-between;
    }
  }
  .table {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .icon-button {
    position: fixed;
    right: 30px;
    bottom: 30px;
  }
  .pagination {
    position: fixed;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Board: React.FC = () => (
  <ContainerDiv>
    <Head>
      <title>DayCare</title>
      <meta name="description" content="DayCareBoard" />
      <link rel="icon" href="/LogoIcon.png" />
    </Head>
    <div className="subject">
      <h2>Category</h2>
      <div>
        <Categories categoryList={['전체', '어린이집', '어린이집?']} />
        <Search inputProps={{}} onClick={() => {}} />
      </div>
    </div>
    <div className="nav-menu">
      <Menu />
    </div>
    <div className="table">
      <Table
        boardList={[
          {
            category: '1',
            likeCount: '100',
            title: '제목',
            viewCount: '300',
            write: '김미미',
            writeDate: '2020.07.13',
            reviewCount: 20,
          },
          {
            category: '1',
            likeCount: '100',
            title: '제목',
            viewCount: '300',
            write: '김미미',
            writeDate: '2020.07.13',
            reviewCount: 20,
          },
          {
            category: '1',
            likeCount: '100',
            title: '제목',
            viewCount: '300',
            write: '김미미',
            writeDate: '2020.07.13',
            reviewCount: 20,
          },
          {
            category: '1',
            likeCount: '100',
            title: '제목',
            viewCount: '300',
            write: '김미미',
            writeDate: '2020.07.13',
            reviewCount: 20,
          },
          {
            category: '1',
            likeCount: '100',
            title: '제목',
            viewCount: '300',
            write: '김미미',
            writeDate: '2020.07.13',
            reviewCount: 20,
          },
          {
            category: '1',
            likeCount: '100',
            title: '제목',
            viewCount: '300',
            write: '김미미',
            writeDate: '2020.07.13',
            reviewCount: 20,
          },
          {
            category: '1',
            likeCount: '100',
            title: '제목',
            viewCount: '300',
            write: '김미미',
            writeDate: '2020.07.13',
            reviewCount: 20,
          },
          {
            category: '1',
            likeCount: '100',
            title: '제목',
            viewCount: '300',
            write: '김미미',
            writeDate: '2020.07.13',
            reviewCount: 20,
          },
          {
            category: '1',
            likeCount: '100',
            title: '제목',
            viewCount: '300',
            write: '김미미',
            writeDate: '2020.07.13',
            reviewCount: 20,
          },
        ]}
      />
      <div className="pagination">
        <Pagination
          selectPage={1}
          maxPage={2}
          onClickPage={(page: number) => {
            console.log(page);
          }}
        />
      </div>
    </div>
    <div className="icon-button">
      <IconButton image={WriteIcon} buttonProps={{}} />
    </div>
  </ContainerDiv>
);

export default Board;
