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
import {
  reviewListType,
  reviewGetListTypeWithCategoryId,
} from '@src/Type/API/review';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '@src/Store/userState';
import { changeError } from '@src/Store/errorState';
import useApi from '@src/CustomHook/useApi';

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
  const [selectCategory, setSelectCategory] = useState(category[0].id);
  const [reviewList, setReviewList] = useState<reviewListType[]>([]);
  const [selectPage, setSelectPage] = useState(1);
  const [totalCount, setTotalCount] = useState(10);

  const router = useRouter();
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const { api: getReviewListApi, isLoading } =
    useApi<reviewGetListTypeWithCategoryId>({
      url: `/review/category/${selectCategory}`,
      data: {
        page: selectPage,
      },
      method: 'get',
    });

  const getReviewListApiHandle = useCallback(async () => {
    // category_id 기준 리뷰 받아오기
    if (isLoading) {
      // 다중 API 호출 방지
      return;
    }
    try {
      const response = await getReviewListApi();

      if (response.data.statusCode === 200) {
        setReviewList(response.data.review);
        // 리뷰 리스트 상태에 넣어주기

        setTotalCount(response.data.totalCount);
      }
    } catch (error) {
      dispatch(
        changeError({
          errorStatus: error,
          isShow: true,
        })
      );
      // error 핸들링
    }
  }, [getReviewListApi, isLoading]);

  const onClickWrite = useCallback(() => {
    try {
      if (!user.auth) {
        // 유저 정보가 없을 경우
        throw new Error('로그인 후 이용 가능합니다.');
      }

      router.push('/board/write');
      // 유저 정보가 있을경우 해당 페이지로 이동
    } catch (error) {
      dispatch(
        changeError({
          errorStatus: error,
          isShow: true,
        })
      );
      // error 핸들링
    }
  }, [router, user.auth]);

  const onClickCategory = useCallback((categoryId: number) => {
    // 카테고리 선택시 호출 되는 함수
    setSelectCategory(categoryId);
    // 카테고리 아이디 변경
    setSelectPage(1);
    // 선택한 페이지 1로 변경
  }, []);

  useEffect(() => {
    if (selectCategory) {
      getReviewListApiHandle();
      // 카테고리 번호가 변경 될 경우 API 호출
    }
  }, [selectCategory]);
  useEffect(() => {
    getReviewListApiHandle();
    // 선택한 페이지 변경시 API 호출
  }, [selectPage]);

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
            onClickCategory={onClickCategory}
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
          boardList={reviewList.map((v) => ({
            category: `${v.id}`,
            title: v.title,
            likeCount: `${v.likes}`,
            viewCount: `${v.view_count}`,
            write: `${v.user.name}`,
            writeDate: `${new Date(v.write_date)
              .toISOString()
              .substring(0, 10)
              .replaceAll('-', '.')}`, // 2022. 07. 31 이런식으로 나타내기 위함
            reviewCount: v.reply,
            id: v.id,
          }))}
        />
        <div className="pagination">
          <Pagination
            selectPage={selectPage}
            maxPage={Math.floor((totalCount - 1) / 10) + 1}
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
