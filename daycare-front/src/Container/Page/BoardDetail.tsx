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
import { reviewDeleteType, reviewLikeType } from '@src/Type/API/review';
import { BoardDetailProps } from '@src/Type/Container/Board';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import HeartIcon from '@src/assets/image/HeartIcon.png';
import HeartEmptyIcon from '@src/assets/image/HeartEmptyIcon.png';
import CloseIcon from '@src/assets/image/CloseIcon.png';
import API from '@src/API';
import { AxiosError, AxiosResponse } from 'axios';
import { changeError } from '@src/Store/errorState';

const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${Theme.color.yellow_FFE};
  display: flex;
  align-items: center;
  justify-content: center;
  .review {
    width: 40%;
    height: 700px;
    background-color: #ffffff;
    border-radius: 16px;
    border: 1px solid ${Theme.color.gray_C1};
    padding: 10px 20px;
    & > h3 {
      max-width: 100%;
      height: auto;
      overflow-wrap: anywhere;
    }
  }
  #content {
    height: 75%;
    max-height: 75%;
    overflow-x: hidden;
    overflow-y: scroll;
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

const BoardDetail: React.FC<BoardDetailProps> = ({ review }) => {
  const user = useSelector(selectUser);
  const router = useRouter();
  const dispatch = useDispatch();

  const [replyComment, setReplyComment] = useState('');
  const [isLike, setIsLike] = useState(
    !!review.likes.find((v) => v.id === user.auth?.id)
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
    try {
      if (!user.auth) {
        throw new Error('로그인 후 이용 가능 합니다.');
      }

      const response = await reviewDeleteApi();
      if (response.data.statusCode === 200) {
        router.push('/board');
      }
    } catch (error) {
      dispatch(
        changeError({
          errorStatus: error,
          isShow: true,
        })
      );
    }
  }, [reviewDeleteApi, router, user.auth]);

  const onClickLike = useCallback(async () => {
    try {
      if (!user.auth) {
        throw new Error('로그인 후 이용 가능 합니다.');
      }
      const response = (await API.get(`review/like/${review.id}`, {
        params: {
          id: user.auth?.id,
        },
      })) as AxiosResponse<reviewLikeType['response']>;

      if (response.data.statusCode === 200) {
        setIsLike(response.data.like);
      }
    } catch (error) {
      dispatch(
        changeError({
          errorStatus: error,
          isShow: true,
        })
      );
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
          if (response.data.statusCode === 200) {
            router.reload();
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
        if (!user.auth) {
          throw new Error('로그인 후 이용 가능 합니다.');
        }
        const response = (await API.get(`reply/like/${id}`, {
          params: {
            id: user.auth?.id,
          },
        })) as AxiosResponse<replyLikeType['response']>;

        if (response.data.statusCode === 200) {
          router.reload();
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
    const contentDiv = document.getElementById('content');
    if (contentDiv) {
      contentDiv.innerHTML = review.content;
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
        <div id="content" />
        <hr />
        <div className="buttons">
          <button type="button" className="heart" onClick={onClickLike}>
            <Image
              src={isLike ? HeartIcon : HeartEmptyIcon}
              width={25}
              height={25}
              alt="reviewLikeIcon"
            />
          </button>
          {user.auth && review.user_id === user.auth.id && (
            <>
              <BlueButton
                content="수정"
                buttonProps={{
                  onClick: () => router.push(`/board/update/${review.id}`),
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
              const isMyReply = v.user.id === user.auth?.id;
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
