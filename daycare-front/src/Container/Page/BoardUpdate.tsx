/* eslint-disable function-paren-newline */
/* eslint-disable react/no-array-index-key */
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
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '@src/Store/userState';
import { changeError } from '@src/Store/errorState';
import InputFile from '@src/Components/Atom/Input/InputFile';

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
  form {
    position: relative;
    .files {
      position: absolute;
      right: -120px;
      top: 60px;
      & > div {
        margin-bottom: 10px;
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

  const [images, setImages] = useState<
    {
      file: File | null;
      previewImage: string;
    }[]
  >([
    { file: null, previewImage: review.image1 },
    { file: null, previewImage: review.image2 },
    { file: null, previewImage: review.image3 },
    { file: null, previewImage: review.image4 },
    { file: null, previewImage: review.image5 },
  ]);

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const { api: reviewUpdateApi } = useApi<reviewUpdateType>({
    url: '/review',
    data: {
      review_id: review.id,
      content: '',
      id: user.auth?.id as number,
      title,
      files: images.filter((v) => v.file !== null).map((v) => v.file) as File[],
      files_index: images
        .map((v, i) => v.file && i)
        .filter((v) => typeof v === 'number') as number[],
    },
    method: 'patch',
  });
  const reviewUpdateApiHandle: React.MouseEventHandler<HTMLButtonElement> =
    async (e) => {
      // 리뷰 업데이트 함수 핸들링 함수
      e.preventDefault();
      try {
        if (!editorRef.current) {
          // 에디터 Ref current가 없다면 리턴 해줍니다
          return;
        }

        const response = await reviewUpdateApi({
          content: editorRef.current.getInstance().getHTML(),
          // 에디터에서 getHtml을 통해 html값을 전달 받아 API에 보내주기
        });
        if (response.data.statusCode === 200) {
          router.replace(`/board/${response.data.review.id}`);
          // 업데이트한 리뷰 페이지로 이동
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
    };

  const onChangeFile =
    (index: number) => async (e: React.ChangeEvent<HTMLInputElement>) => {
      const reader = new FileReader();
      if (!e.target.files?.length || e.target.files == null) {
        return;
      }

      const targetFile = e.target.files[0] as File;

      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setImages((prev) =>
          prev.map((v, i) => {
            if (i === index) {
              return {
                file: targetFile,
                previewImage: reader.result as string,
              };
            }
            return v;
          })
        );
      };
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
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <Editor
          ref={editorRef}
          placeholder="내용을 입력해주세요."
          previewStyle="vertical" // 미리보기 스타일 지정
          height="600px" // 에디터 창 높이
          initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
          toolbarItems={[
            // 툴바 옵션 설정
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
            content="수정"
            buttonProps={{ onClick: reviewUpdateApiHandle, type: 'submit' }}
          />
          <BlueButton
            content="취소"
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
        <div className="files">
          {images.map((v, i) => (
            <InputFile
              key={i}
              value={v.previewImage}
              onChange={onChangeFile(i)}
            />
          ))}
        </div>
      </form>
    </StyledWriteContainer>
  );
};

export default BoardUpdate;
