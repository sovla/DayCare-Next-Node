/* eslint-disable react/jsx-one-expression-per-line */
import Theme from '@src/assets/global/Theme';
import BlueButton from '@src/Components/Atom/Button/BlueButton';
import InputText from '@src/Components/Atom/Input/InputText';
import Menu from '@src/Components/Template/Layout/Menu';
import useApi from '@src/CustomHook/useApi';
import { selectUser } from '@src/Store/userState';
import { replyWriteType } from '@src/Type/API/reply';
import { reviewDeleteType } from '@src/Type/API/review';
import { BoardDetailProps } from '@src/Type/Container/Board';
import Error from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

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
`;

const BoardDetail: React.FC<BoardDetailProps> = ({ review }) => {
  const router = useRouter();
  const [replyComment, setReplyComment] = useState('');
  const user = useSelector(selectUser);

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

  const replyWriteApiHandle = useCallback(async () => {
    if (!user.auth) {
      throw new Error({
        statusCode: 400,
        title: '로그인후 이용 가능합니다.',
      });
    }
    const response = await replyWriteApi();
    setReplyComment('');
    if (response.data.statusCode === 200) {
      review.reply.push({ ...response.data.reply, user: user.auth });
    }
  }, [replyComment, user.auth, review]);

  const reviewDeleteApiHandle = useCallback(async () => {
    const response = await reviewDeleteApi();
    console.log(response);
    if (response.data.statusCode === 200) {
      router.push('/board');
    }
  }, [user.auth, review]);

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
            review.reply.map((v) => (
              <div key={`reply${v.id}`}>
                <div className="row-center">
                  <p>{v.user.name}</p>
                  <small>{v.content}</small>
                </div>
                <small>
                  {new Date(v?.update_date ?? v.write_date)
                    .toISOString()
                    .substring(0, 10)}
                </small>
                <hr />
              </div>
            ))}
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
