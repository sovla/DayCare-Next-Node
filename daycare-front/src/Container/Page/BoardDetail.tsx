/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-one-expression-per-line */
import Theme from '@src/assets/global/Theme';
import BlueButton from '@src/Components/Atom/Button/BlueButton';
import InputText from '@src/Components/Atom/Input/InputText';
import Menu from '@src/Components/Template/Layout/Menu';
import useApi from '@src/CustomHook/useApi';
import { selectUser } from '@src/Store/userState';
import {
  replyDeleteType,
  replyLikeType,
  replyWriteType,
} from '@src/Type/API/reply';
import {
  reviewDeleteType,
  reviewGetType,
  reviewLikeType,
} from '@src/Type/API/review';
import { BoardDetailProps } from '@src/Type/Container/Board';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import HeartIcon from '@src/assets/image/HeartIcon.png';
import HeartEmptyIcon from '@src/assets/image/HeartEmptyIcon.png';
import CloseIcon from '@src/assets/image/CloseIcon.png';
import API from '@src/API';
import { AxiosError, AxiosResponse } from 'axios';
import { changeError } from '@src/Store/errorState';
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { nullTypeGuard } from '@src/Util';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${Theme.color.yellow_FFE};
  display: flex;
  align-items: center;
  justify-content: center;

  .review {
    position: relative;
    width: 40%;
    min-height: 700px;
    height: 100%;
    max-height: 700px;
    background-color: #ffffff;
    border-radius: 16px;
    border: 1px solid ${Theme.color.gray_C1};
    padding: 10px 20px;

    overflow-y: visible;
    & > h3 {
      max-width: 100%;
      min-height: fit-content;
      max-height: 75px;
      text-overflow: ellipsis;
      overflow: hidden;
      overflow-wrap: anywhere;
    }
  }
  #viewer {
    min-height: 70%;
    height: 70%;
    max-height: 70%;
    overflow-x: hidden;
    overflow-y: scroll;
    & * {
      width: 100%;
      word-break: break-all;
    }
  }

  .min-viewer {
    min-height: 30% !important;
    height: 30% !important;
    max-height: 30% !important ;
  }
  .row-center {
    display: flex;
    align-items: center;
    & > p {
      margin-right: 10px;
    }
    margin-bottom: 5px;
  }
  .reply {
    width: 400px;
    background-color: #ffffff;
    height: 700px;
    border-radius: 16px;
    padding: 20px 20px;
    max-height: 800px;
    margin-left: 30px;
    border: 1px solid ${Theme.color.gray_C1};
    & > section {
      height: calc(100% - 150px);
      overflow-y: scroll;
      overflow-x: hidden;
    }
    .reply-form {
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    & > h5 {
      margin-bottom: 20px;
    }
  }
  .buttons {
    display: flex;
    justify-content: flex-end;
    & > button {
      margin-left: 10px;
    }
  }
  button {
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
  .heart {
    border: 1px solid ${Theme.color.gray_C1};

    border-radius: 16px;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .images {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 300px;
    .swiper-slide {
      min-width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #0003;
      & > img {
        background-color: #fff;
        object-fit: contain;
        min-height: 300px;
        height: 300px;
        max-height: 300px;
        border-radius: 4px;
        user-select: none;
        &:hover {
          /* opacity: 0.7;
          cursor: pointer; */
        }
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding-bottom: 100px;
    padding-top: 50px;
    overflow-y: scroll;
    justify-content: start;
    .review {
      width: 90vw;
      overflow: visible;
      #viewer {
        width: 100%;
        min-height: 200px;
        height: 200px;
        overflow-y: scroll;
        max-height: 600px;
      }
      .buttons {
        & > button {
          margin-left: 10px;
        }
      }
    }
    .reply {
      width: 90vw;
      margin-top: 30px;
      margin-left: 0px;
      height: max-content;
      overflow: visible;
      & > section {
        height: max-content;
      }
      .reply-form {
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      & > h5 {
        margin-bottom: 20px;
      }
    }
  }
`;

const StyledReply = styled.div<{ isLike: boolean }>`
  position: relative;
  & > .reply-menu {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);

    display: flex;
    justify-content: center;
    align-items: center;
    & > .reply-heart {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 25px;
    }
    & > .reply-hamburger {
      margin-left: 3px;
    }
  }
`;

const BoardDetail: React.FC<BoardDetailProps> = ({ review: reviewProps }) => {
  const user = useSelector(selectUser);
  const router = useRouter();
  const dispatch = useDispatch();

  const [review, setReview] = useState(reviewProps);

  const [replyComment, setReplyComment] = useState('');
  const [isLike, setIsLike] = useState(
    !!review.likes.find((v) => v.user_id === user.auth?.id)
  );

  const { api: replyWriteApi } = useApi<replyWriteType>({
    url: '/reply',
    data: {
      content: replyComment,
      id: user.auth?.id as number,
      review_id: review.id,
    },
    method: 'post',
  });

  const { api: reviewDeleteApi } = useApi<reviewDeleteType>({
    url: '/review',
    data: {
      id: user.auth?.id as number,
      review_id: review.id,
    },
    method: 'delete',
  });

  const { api: replyDeleteApi } = useApi<replyDeleteType>({
    method: 'delete',
    url: '/reply',
    data: {
      id: user.auth?.id as number,
      reply_id: 0,
    },
  });

  const { api: reviewLikeApi } = useApi<reviewLikeType>({
    method: 'get',
    url: `/review/like/${review.id}`,
    data: {
      id: user.auth?.id as number,
    },
  });

  const { api: getReviewApi } = useApi<reviewGetType>({
    data: {},
    method: 'get',
    url: `/review/${router.query.id as string}`,
  });

  const replyWriteApiHandle = useCallback(async () => {
    try {
      if (!user.auth) {
        throw new AxiosError('로그인 후 이용 가능합니다.', '400');
      }
      const response = await replyWriteApi();
      // console.log('review::::', response);

      setReplyComment('');
      if (response.data.statusCode === 200) {
        review.reply.push({
          content: '',
          delete_date: null,
          id: 0,
          update_date: null,
          write_date: '',
          ...response.data.reply,
          user: user.auth,
          likes: [],
        });
      }
    } catch (error) {
      dispatch(
        changeError({
          errorStatus: error,
          isShow: true,
        })
      );
    }
  }, [user.auth, replyWriteApi, review.reply]);

  const reviewDeleteApiHandle = useCallback(async () => {
    // 리뷰 삭제 API 핸들 함수
    try {
      if (!user.auth) {
        // 로그인 여부 확인
        throw new Error('로그인 후 이용 가능 합니다.');
      }
      if (!window.confirm('정말로 삭제 하시겠습니까?')) {
        return;
      }
      const response = await reviewDeleteApi();
      if (response.data.statusCode === 200) {
        router.replace('/board');
        // 삭제된 리뷰로 돌아오지 못하도록 설정
      }
    } catch (error) {
      dispatch(
        changeError({
          errorStatus: error,
          isShow: true,
        })
      );
      // 에러 핸들
    }
  }, [reviewDeleteApi, router, user.auth]);

  const onClickReviewLike = useCallback(async () => {
    // 리뷰 좋아요를 눌럿을때
    try {
      if (!user.auth) {
        // 로그인 정보 확인
        throw new Error('로그인 후 이용 가능 합니다.');
      }
      setIsLike((prev) => !prev);
      // 좋은 사용자 경험을 위해 좋아요는 미리 값을 변경하고 API 호출 이후 서버 값과 연동

      const response = await reviewLikeApi();

      if (response.data.statusCode === 200) {
        setIsLike(response.data.like);
        // 좋아요 완료시 true 리턴 좋아요 해제시 false 리턴
      }
    } catch (error) {
      dispatch(
        changeError({
          errorStatus: error,
          isShow: true,
        })
      );
      // 에러 핸들
    }
  }, [user.auth, review.id]);

  const onClickDeleteReply = useCallback(
    async (id: number) => {
      try {
        if (!user.auth) {
          throw new Error('로그인 후 이용 가능 합니다.');
        }

        const result = global.confirm('정말 삭제하시겠습니까?');
        if (result) {
          const response = await replyDeleteApi({
            reply_id: id,
          });
          if (
            response.data.statusCode === 200 &&
            response.data.message === '댓글 삭제 완료'
          ) {
            const responseGetReview = await getReviewApi();
            setReview(responseGetReview.data.review);
            // 댓글 삭제 완료시 리플 배열에서 삭제
          }
        }
      } catch (error) {
        dispatch(
          changeError({
            errorStatus: error,
            isShow: true,
          })
        );
      }
    },
    [replyDeleteApi, router, user.auth]
  );
  const onClickReplyLike = useCallback(
    async (id: number) => {
      try {
        if (!nullTypeGuard(user.auth)) {
          throw new Error('로그인 후 이용 가능 합니다.');
        }

        const response = (await API.get(`reply/like/${id}`, {
          params: {
            id: user.auth?.id,
          },
        })) as AxiosResponse<replyLikeType['response']>;

        if (response.data.statusCode === 200 && user.auth) {
          const responseGetReview = await getReviewApi();
          setReview(responseGetReview.data.review);
        }
      } catch (error) {
        dispatch(
          changeError({
            errorStatus: error,
            isShow: true,
          })
        );
      }
    },
    [user]
  );

  useEffect(() => {
    const contentDiv = document.getElementById('viewer');

    if (contentDiv) {
      const viewer = new Viewer({
        el: contentDiv,
        initialValue: review.content,
      });
    }
  }, []);

  const isImage = useMemo(
    () =>
      Object.entries(review).filter(
        ([key, value]) => key.includes('image') && value.length > 0
      ).length > 0,
    [review]
  );
  // 이미지가 있는지 확인하는 변수

  useEffect(() => {
    const viewer = document.querySelector('#viewer');
    if (isImage && viewer && !viewer.className.includes('min-viewer')) {
      viewer.className += 'min-viewer';
    }
  }, []);

  return (
    <StyledContainer>
      <Head>
        <title>DayCare</title>
        <meta name="description" content="DayCareBoardDetail" />
        <link rel="icon" href="/LogoIcon.png" />
      </Head>
      <div className="review">
        <h3>{review.title}</h3>
        <br />
        <p>{review.user.name}</p>
        <small>
          {new Date(review.write_date).toISOString().substring(0, 10)} |
        </small>
        <small> 조회 {review.view_count}</small>
        <hr />
        {isImage && (
          <Swiper className="images mySwiper">
            {review.image1.length > 0 && (
              <SwiperSlide>
                <img src={review.image1} alt="image1" />
              </SwiperSlide>
            )}

            {review.image2.length > 0 && (
              <SwiperSlide>
                <img src={review.image2} alt="image2" />
              </SwiperSlide>
            )}

            {review.image3.length > 0 && (
              <SwiperSlide>
                <img src={review.image3} alt="image3" />
              </SwiperSlide>
            )}

            {review.image4.length > 0 && (
              <SwiperSlide>
                <img src={review.image4} alt="image4" />
              </SwiperSlide>
            )}

            {review.image5.length > 0 && (
              <SwiperSlide>
                <img src={review.image5} alt="image5" />
              </SwiperSlide>
            )}
          </Swiper>
        )}

        <hr />
        <div id="viewer" />
        <hr />

        <div className="buttons">
          <button type="button" className="heart" onClick={onClickReviewLike}>
            <Image
              src={isLike ? HeartIcon : HeartEmptyIcon}
              width={25}
              height={25}
              alt="reviewLikeIcon"
            />
          </button>
          {user.auth && review.user.id === user.auth.id && (
            <>
              <BlueButton
                content="수정"
                buttonProps={{
                  onClick: () => router.push(`/board/update/${review.id}`),
                  // 수정의 경우 /board/update/[id].tsx 파일로 이동
                  style: {
                    width: '50px',
                    height: '40px',
                  },
                }}
              />
              <BlueButton
                content="삭제"
                buttonProps={{
                  onClick: reviewDeleteApiHandle,
                  // 리뷰 삭제 API 핸들 함수 호출
                  style: {
                    width: '50px',
                    height: '40px',
                    'background-color': 'red',
                  },
                }}
              />
            </>
          )}
        </div>
      </div>
      <div className="reply">
        <h5>
          댓글 <small>{review.reply.length}개</small>
        </h5>

        <section className="reply-section">
          {review.reply &&
            Array.isArray(review.reply) &&
            review.reply.map((v) => {
              const isReplyLike = !!v.likes.find(
                (fv) => fv.user_id === user.auth?.id
              );
              // 내가 누른 좋아요가 있을경우 true 아닌경우 false
              const isMyReply = v.user.id === user.auth?.id;
              // 내 리플인 경우 true 아닌경우 false
              return (
                <StyledReply key={`reply${v.id}`} isLike={isReplyLike}>
                  <div className="row-center">
                    <p>{v.user.name}</p>
                    <small>{v.content}</small>
                  </div>
                  <small>
                    {new Date(v?.update_date ?? v.write_date)
                      .toISOString()
                      .substring(0, 10)}
                  </small>
                  <div className="reply-menu">
                    <button
                      type="button"
                      className="reply-heart"
                      onClick={() => onClickReplyLike(v.id)}
                    >
                      <Image
                        src={isReplyLike ? HeartIcon : HeartEmptyIcon}
                        width={15}
                        height={15}
                        alt="replyLikeIcon"
                      />
                      <small>{v.likes.length}</small>
                    </button>
                    {isMyReply && (
                      <button
                        type="button"
                        className="reply-hamburger"
                        onClick={() => onClickDeleteReply(v.id)}
                      >
                        <Image
                          src={CloseIcon}
                          width={20}
                          height={20}
                          alt="CloseIcon"
                        />
                      </button>
                    )}
                  </div>

                  <hr />
                </StyledReply>
              );
            })}
        </section>
        <hr />
        <div className="reply-form">
          <InputText
            placeholder="댓글 내용을 적어주세요"
            type="text"
            value={replyComment}
            onChange={(e) => setReplyComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                replyWriteApiHandle();
              }
            }}
            autoComplete="off"
          />
          <BlueButton
            content="작성"
            buttonProps={{
              onClick: replyWriteApiHandle,
              style: {
                width: '50px',
                height: '40px',
              },
            }}
          />
        </div>
      </div>

      <div className="nav-menu">
        <Menu />
      </div>
    </StyledContainer>
  );
};

export default BoardDetail;
