/* eslint-disable @next/next/no-img-element */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import Theme from '@src/assets/global/Theme';
import React, { useCallback, useLayoutEffect } from 'react';
import styled from 'styled-components';

import { reviewListType } from '@src/Type/API/review';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import WriteIcon from '@src/assets/image/WriteIcon.png';
import IconButton from '@src/Components/Atom/Button/IconButton';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '@src/Store/userState';
import { changeError } from '@src/Store/errorState';

const StyledReviewDiv = styled.div`
  width: 100%;
  margin-bottom: 50px;
  h5 {
    margin: 10px 0px;
    font-size: 20px;
    padding: 0px 20px;

    & > span {
      font-size: 18px;
      margin-left: 10px;
      color: ${Theme.color.grean_00};
    }
  }
  .subject {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .photos {
    background-color: #ffffff;
    padding: 0px 20px;
    width: 100%;
    .swiper-slide {
      width: 100px;
    }
    & img {
      border-radius: 8px;
    }
  }
  .review-detail {
    width: 100%;
    border-top: 1px solid ${Theme.color.gray_C1};

    .review-user {
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      .gray-text {
        font-size: 14px;
      }
    }
    .content {
      & > div {
        padding: 10px 20px;
        width: 100%;
        & * {
          font-weight: 400 !important;
          font-family: CookieRun Bold;
        }
      }
    }
    .photos {
      .swiper-slide {
        width: 150px !important;
      }
    }
  }
`;

const Review: React.FC<{
  imageList: string[];
  reviewList: reviewListType[];
  center: {
    name: string;
    city: string;
    authorizationDate: string;
    tel: string;
    operatingTime: string;
    address: string;
    representativeName: string;
    directorName: string;
    id: number;
    isSave: boolean;
  };
}> = (props) => {
  const { imageList, reviewList, center } = props;
  const router = useRouter();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const onClickWriteReview = useCallback(() => {
    try {
      if (!user.auth?.id) {
        throw new Error('로그인 후 이용가능합니다.');
      }
      router.push(`/board/write/center?id=${center.id}`);
    } catch (error) {
      dispatch(changeError({ errorStatus: error, isShow: true }));
    }
  }, [user, router]);

  useLayoutEffect(() => {
    reviewList.forEach((v, i) => {
      const contentDiv = document.getElementById(`content${i}`);

      if (contentDiv) {
        contentDiv.innerHTML = v.content;
      }
    });
  }, []);
  return (
    <StyledReviewDiv className="reviews">
      <h5>
        사진 리뷰
        <span>{imageList.length}</span>
      </h5>
      <Swiper
        className="mySwiper photos"
        slidesPerView="auto"
        spaceBetween={10}
      >
        {imageList.map((v) => (
          <SwiperSlide key={v}>
            <img src={v} alt="photos" width={100} height={100} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="line" />
      <div className="subject">
        <h5>
          리뷰
          <span>{reviewList.length}</span>
        </h5>
        <IconButton
          image={WriteIcon}
          imageSize={{
            width: 25,
            height: 25,
          }}
          buttonProps={{
            onClick: onClickWriteReview,
            style: {
              width: '40px',
              height: '40px',
            },
          }}
        />
      </div>
      {reviewList.map((v, i) => (
        <div key={v.id} className="review-detail">
          <div className="review-user">
            <p>{v.user.name}</p>
            <p className="gray-text">
              {new Date(v.write_date)
                .toISOString()
                .substring(0, 16)
                .replace('T', ' ')}
            </p>
          </div>
          <Swiper className="photos" slidesPerView="auto" spaceBetween={10}>
            {Object.entries(v).map(([key, value]) => {
              if (key.includes('image') && value !== '') {
                return (
                  <SwiperSlide key={v.id + value + key}>
                    <img
                      src={value}
                      alt="reviewImage"
                      width={150}
                      height={150}
                    />
                  </SwiperSlide>
                );
              }
            })}
          </Swiper>
          <div className="content">
            <h5>{v.title}</h5>
            <div id={`content${i}`} />
          </div>
        </div>
      ))}
    </StyledReviewDiv>
  );
};

export default Review;
