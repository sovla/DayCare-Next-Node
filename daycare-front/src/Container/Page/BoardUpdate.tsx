import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

import styled from 'styled-components';
import Theme from '@src/assets/global/Theme';
import Menu from '@src/Components/Template/Layout/Menu';
import { BoardUpdateProps } from '@src/Type/Container/Board';
import InputText from '@src/Components/Atom/Input/InputText';
import BlueButton from '@src/Components/Atom/Button/BlueButton';
import { useRouter } from 'next/router';
import useApi from '@src/CustomHook/useApi';
import { reviewUpdateType } from '@src/Type/API/review';
import { useSelector } from 'react-redux';
import { selectUser } from '@src/Store/userState';

const StyledWriteContainer = styled.div`
  background-color: ${Theme.color.yellow_FFE};
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .row-div {
    display: flex;
    margin-bottom: 20px;
    & > input {
      width: 100%;
      font-size: 16px;
      &::placeholder {
        font-size: 16px;
      }
    }
  }
  .write-button {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    & > button {
      width: 60px;
      height: 40px;
      cursor: pointer;
      transition: 0.3s;
      &:hover {
        opacity: 0.7;
      }
    }
  }
  @media (max-width: 768px) {
    padding-bottom: 100px;
    overflow-y: scroll;
    .row-div {
      flex-direction: column;
      max-width: 100vw;
      margin-top: 20px;
      & > select {
        min-width: 100%;
        max-width: 100%;
        margin-bottom: 20px;
      }
      & > input {
        margin-left: 0px;
      }
    }
    form {
      max-width: 100vw;
      & > div:nth-of-type(2) {
        height: 300px !important;
      }
    }
  }
`;

const BoardUpdate: React.FC<BoardUpdateProps> = ({ review }) => {
  const editorRef = useRef<Editor>(null);
  const router = useRouter();

  const [title, setTitle] = useState(review.title);

  const user = useSelector(selectUser);

  const { api: reviewUpdateApi } = useApi<reviewUpdateType>({
    url: '/review',
    data: {
      review_id: review.id,
      content: '',
      id: user.auth?.id as number,
      title,

      // image1,
      // image2,
      // image3,
      // image4,
      // image5,
    },
    method: 'patch',
  });

  const reviewUpdateApiHandle: React.MouseEventHandler<HTMLButtonElement> =
    async (e) => {
      e.preventDefault();
      if (!editorRef.current) {
        return null;
      }

      const response = await reviewUpdateApi({
        content: editorRef.current.getInstance().getHTML(),
      });
      if (response.data.statusCode === 200) {
        router.push('/board');
      }
      return true;
    };

  useEffect(() => {
    if (!user.auth) {
      router.back();
    }
  }, []);

  if (!user.auth) {
    return null;
  }
  return (
    <StyledWriteContainer>
      <Head>
        <title>DayCare</title>
        <meta name="description" content="DayCareBoardUpdate" />
        <link rel="icon" href="/LogoIcon.png" />
      </Head>
      <div className="nav-menu">
        <Menu />
      </div>
      <form>
        <div className="row-div">
          <InputText
            type="text"
            placeholder="????????? ??????????????????."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <Editor
          ref={editorRef}
          placeholder="????????? ??????????????????."
          previewStyle="vertical" // ???????????? ????????? ??????
          height="600px" // ????????? ??? ??????
          initialEditType="wysiwyg" // ?????? ???????????? ??????(????????? markdown)
          toolbarItems={[
            // ?????? ?????? ??????
            ['heading', 'bold', 'italic', 'strike'],
            ['hr', 'quote'],
            ['ul', 'ol', 'task', 'indent', 'outdent'],
            ['table', 'image', 'link'],
            ['code', 'codeblock'],
          ]}
          language="ko-kr"
          initialValue={review.content}
        />
        <div className="write-button">
          <BlueButton
            content="??????"
            buttonProps={{ onClick: reviewUpdateApiHandle, type: 'submit' }}
          />
          <BlueButton
            content="??????"
            buttonProps={{
              type: 'button',
              onClick: () => router.push('/board'),
              style: {
                'background-color': 'red',
                'margin-left': '20px',
              },
            }}
          />
        </div>
      </form>
    </StyledWriteContainer>
  );
};

export default BoardUpdate;
