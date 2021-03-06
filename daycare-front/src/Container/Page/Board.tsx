import Theme from '@src/assets/global/Theme';
import IconButton from '@src/Components/Atom/Button/IconButton';
import WriteIcon from '@src/assets/image/WriteIcon.png';
import Categories from '@src/Components/Template/Board/Categories';
import Pagination from '@src/Components/Template/Board/Pagination';
import Table from '@src/Components/Template/Board/Table';
import Menu from '@src/Components/Template/Layout/Menu';
import Head from 'next/head';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { category as categoryType } from '@src/Type/API/category';
import { reviewWriteType, reviewListType } from '@src/Type/API/review';
import API from '@src/API';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '@src/Store/userState';
import { changeError } from '@src/Store/errorState';

const ContainerDiv = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${Theme.color.yellow_FFE};

  .page-link {
    line-height: 1.5;
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
  @media (max-width: 1440px) {
    min-height: 100vh;
    height: 100vh;
    padding-bottom: 100px;
    overflow-y: scroll;
    overflow-x: hidden;
    .subject {
      padding: 20px 20px;
      & > h2 {
        margin-bottom: 20px;
      }
      & > div {
        display: flex;
        justify-content: space-between;
      }
    }
    .pagination {
      position: relative;
      width: max-content;
      padding: 40px 20px 0px;
      max-width: 100vw;
      transform: translateX(0%);
      left: 0;
      bottom: 0;
    }
  }
  @media (max-width: 768px) {
    min-height: 100vh;
    height: 100vh;
    padding-bottom: 100px;
    overflow-y: scroll;

    .subject {
      padding: 20px 20px;
      & > h2 {
        margin-bottom: 20px;
      }
      & > div {
        display: flex;
        justify-content: space-between;
      }
    }
    .table {
      & > div:first-of-type {
        display: none;
      }
    }
    .icon-button {
      bottom: 100px;
    }
    .pagination {
      position: relative;
      width: max-content;
      padding: 0px 20px;
      max-width: 100vw;
      transform: translateX(0%);
      left: 0;
      bottom: 0;
    }
  }
`;

const Board: React.FC<{
  category: categoryType[];
}> = (props) => {
  const { category } = props;
  const [selectCategory, setSelectCategory] = useState(0);
  const [reviewList, setReviewList] = useState<reviewListType[]>([]);
  const [selectPage, setSelectPage] = useState(1);

  const router = useRouter();
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const getReviewListApi = useCallback(async () => {
    // category_id ?????? ?????? ????????????
    try {
      const response = (await API.get(
        `/review/category_id=${selectCategory}`
      )) as AxiosResponse<reviewWriteType['response'], any>;

      if (response.data.statusCode === 200) {
        setReviewList(response.data.review);
      }
    } catch (error) {
      dispatch(
        changeError({
          errorStatus: error,
          isShow: true,
        })
      );
    }
  }, [dispatch, selectCategory]);

  const onClickWrite = useCallback(() => {
    try {
      if (!user.auth) {
        throw new Error('????????? ??? ?????? ???????????????.');
      }
      router.push('/board/write');
    } catch (error) {
      dispatch(
        changeError({
          errorStatus: error,
          isShow: true,
        })
      );
    }
  }, [dispatch, router, user.auth]);

  useEffect(() => {
    if (selectCategory) {
      getReviewListApi();
    }
    setSelectPage(1);
  }, [selectCategory]);

  useEffect(() => {
    if (category) {
      setSelectCategory(category[0].id);
    }
  }, []);

  return (
    <ContainerDiv>
      <Head>
        <title>DayCare</title>
        <meta name="description" content="DayCareBoard" />
        <link rel="icon" href="/LogoIcon.png" />
      </Head>
      <div className="subject">
        <h2>Category</h2>
        <div>
          <Categories
            categoryList={category}
            onClickCategory={setSelectCategory}
            selectCategory={selectCategory}
          />
          {/* <Search inputProps={{}} onClick={() => {}} /> */}
        </div>
      </div>
      <div className="nav-menu">
        <Menu />
      </div>
      <div className="table">
        <Table
          selectPage={selectPage}
          boardList={reviewList.map((v) => {
            const writeDate = new Date(v.write_date);
            return {
              category: `${v.id}`,
              title: v.title,
              likeCount: `${v.likes}`,
              viewCount: `${v.view_count}`,
              write: `${v.user.name}`,
              writeDate: `${writeDate
                .toISOString()
                .substring(0, 10)
                .replaceAll('-', '.')}`,
              reviewCount: v.reply,
              id: v.id,
            };
          })}
        />
        <div className="pagination">
          <Pagination
            selectPage={selectPage}
            maxPage={Math.floor(reviewList.length / 10) + 1}
            onClickPage={setSelectPage}
          />
        </div>
      </div>
      <div className="icon-button">
        <IconButton
          image={WriteIcon}
          buttonProps={{
            onClick: onClickWrite,
          }}
        />
      </div>
    </ContainerDiv>
  );
};

export default Board;
