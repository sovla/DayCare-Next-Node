/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-undef */
import { DetailCenterProps } from '@src/Type/Template/Map';
import Image from 'next/image';
import React, { useCallback, useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import Theme from '@src/assets/global/Theme';
import DetailMenuButton from '@src/Components/Atom/Button/DetailMenuButton';
import SaveIcon from '@src/assets/image/SaveIcon.png';
import ReviewIcon from '@src/assets/image/ReviewIcon.png';
import ShareIcon from '@src/assets/image/ShareIcon.png';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '@src/Store/userState';
import useApi from '@src/CustomHook/useApi';
import { centerLikeType } from '@src/Type/API/center';
import { changeError } from '@src/Store/errorState';
import { useRouter } from 'next/router';
import {
  reviewGetTypeWithCenterId,
  reviewListType,
} from '@src/Type/API/review';
import Review from '@src/Components/Template/Map/Review';

const CenterAside = styled.aside`
  width: 440px;
  min-width: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 100vh;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  .menu {
    display: flex;
    width: 100%;
    justify-content: space-around;
    margin-top: 20px;
  }
  .gray-text {
    color: ${Theme.color.gray_99};
  }
  .line {
    width: 100%;
    min-height: 10px;
    background-color: ${Theme.color.gray_C1}50;
    margin-top: 20px;
  }
  .row-div {
    display: flex;
    width: 360px;
    border-bottom: 1px solid ${Theme.color.gray_D9};
    padding: 10px 0px;
    & > p:first-child {
      width: 150px;
    }
    & > p:last-child {
      width: calc(100% - 150px);
    }
  }
  .information {
    display: flex;
    margin-top: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  table {
    margin-top: 20px;
  }
  th,
  td {
    border: 1px solid ${Theme.color.gray_D9};
    width: 190px;
    text-align: center;
    padding: 10px 0px;
  }
  .detail {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    height: 50px;
    margin-bottom: 20px;
    button {
      border: 1px solid ${Theme.color.gray_D9};
      border-radius: 30px;
      width: 380px;
      height: 50px;
      &:hover {
        background-color: ${Theme.color.blue_00};
        & > p {
          color: #ffffff;
        }
      }
    }
  }

  @media (max-width: 768px) {
    width: 100vw;
    min-width: 320px;
    height: calc(100vh - 80px);
    max-height: calc(100vh - 80px);
    overflow-y: scroll;
    & > div:first-of-type {
      min-height: 200px;
    }
    .information {
      display: block;
      overflow: visible;
      .row-div {
        min-width: 320px;
        max-width: 100vw;
        height: fit-content;
        min-height: fit-content;
        & > p:first-child {
          width: 150px;
        }
        & > p:last-child {
          width: calc(100% - 150px);
        }
      }
    }
  }
`;

const DetailCenter: React.FC<DetailCenterProps> = (props) => {
  const { image, center, classList, onClickDetailInformation } = props;

  const [isSave, setIsSave] = useState(center.isSave);
  const [isShowReview, setIsShowReview] = useState(false);
  const [reviewList, setReviewList] = useState<reviewListType[]>([]);
  const [imageList, setImageList] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const router = useRouter();

  const { api: reviewGetApi } = useApi<reviewGetTypeWithCenterId>({
    data: {
      page: page,
    },
    method: 'get',
    url: `/review/center/${center.id}`,
  });

  const { api: centerLikeApi } = useApi<centerLikeType>({
    data: {
      id: user.auth?.id as number,
    },
    method: 'get',
    url: `/center/like/${center.id}`,
  });

  const onClickLike = useCallback(async () => {
    // 좋아요 클릭시  2022-08-06 준한
    try {
      if (user.auth === null) {
        // 로그인 확인
        throw new Error('로그인후 이용가능합니다.');
      }
      setIsSave((prev) => !prev);
      // 값 먼저 변경
      const response = await centerLikeApi();

      if (response.data.statusCode === 200) {
        alert(response.data.like ? '저장 완료' : '저장 취소 완료');
        // true 면 저장 완료
        setIsSave(response.data.like);
      }
    } catch (error) {
      dispatch(
        changeError({
          errorStatus: error,
          isShow: true,
        })
      );
      // 에러 핸들링
    }
  }, [user.auth, centerLikeApi, dispatch]);

  const onClickShare = useCallback(() => {
    // 공유 버튼 클릭시
    if (!navigator.clipboard) {
      const clipboard = navigator.clipboard as Clipboard;
      clipboard.writeText(router.asPath);
    } else {
      dispatch(
        changeError({
          errorStatus: new Error('해당 기능이 지원되지 않는 브라우저입니다.'),
          isShow: true,
        })
      );
    }
  }, []);

  useLayoutEffect(() => {
    reviewGetApi().then((response) => {
      setReviewList(response.data.review);
      setImageList(response.data.images);
    });
  }, []);
  return (
    <CenterAside>
      <div>
        <Image
          src={image}
          width={440}
          height={200}
          alt="daycareCenterImage"
          objectFit="cover"
        />
      </div>
      <div className="menu">
        <DetailMenuButton
          image={SaveIcon}
          alt="SaveIcon"
          menu={isSave ? '저장 취소' : '저장 하기'}
          buttonProps={{
            onClick: onClickLike,
          }}
        />
        <DetailMenuButton
          image={ReviewIcon}
          alt="ReviewIcon"
          menu={isShowReview ? '센터 정보 보러가기' : '리뷰 보러가기'}
          buttonProps={{
            onClick: () => {
              setIsShowReview((prev) => !prev);
            },
          }}
        />
        <DetailMenuButton
          image={ShareIcon}
          alt="ShareIcon"
          menu="공유하기"
          buttonProps={{
            onClick: onClickShare,
          }}
        />
      </div>
      <div className="line" />
      {isShowReview ? (
        <Review imageList={imageList} reviewList={reviewList} center={center} />
      ) : (
        <>
          <div className="information">
            <div className="row-div">
              <p>기관명</p>
              <p>{center.name}</p>
            </div>
            <div className="row-div">
              <p>설립일</p>
              <p>{center.authorizationDate}</p>
            </div>
            <div className="row-div">
              <p>관할 행정기관</p>
              <p>{center.city}</p>
            </div>
            <div className="row-div">
              <p>전화번호</p>
              <p>{center.tel}</p>
            </div>
            <div className="row-div">
              <p>운영시간</p>
              <p>{center.operatingTime}</p>
            </div>
            <div className="row-div">
              <p>주소</p>
              <p>{center.address}</p>
            </div>
            <div className="row-div">
              <p>대표자명</p>
              <p>{center.representativeName}</p>
            </div>
            <div className="row-div">
              <p>원장명</p>
              <p>{center.directorName}</p>
            </div>
          </div>
          <table>
            <tr>
              <th>반수</th>
              <th>아동수</th>
            </tr>
            {classList.map((v) => (
              <tr key={v.title}>
                <td>{v.title}</td>
                <td>{v.value}</td>
              </tr>
            ))}
          </table>
          <div className="detail">
            <button type="button" onClick={onClickDetailInformation}>
              <p>상세정보 보러가기</p>
            </button>
          </div>
        </>
      )}
    </CenterAside>
  );
};

export default React.memo(
  DetailCenter,
  (prevProps, nextProps) => prevProps.center.id === nextProps.center.id
);
