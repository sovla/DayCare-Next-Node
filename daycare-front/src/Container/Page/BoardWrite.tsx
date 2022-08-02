/* eslint-disable no-unused-vars */
import Head from 'next/head';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import Select from '@src/Components/Atom/Input/Select';

import styled from 'styled-components';
import Theme from '@src/assets/global/Theme';
import Menu from '@src/Components/Template/Layout/Menu';
import { BoardWriteProps } from '@src/Type/Container/Board';
import InputText from '@src/Components/Atom/Input/InputText';
import BlueButton from '@src/Components/Atom/Button/BlueButton';
import { useRouter } from 'next/router';
import useApi from '@src/CustomHook/useApi';
import { reviewWriteType } from '@src/Type/API/review';
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
      margin-left: 40px;
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
    margin-bottom: 85px;
    height: 100vh;
    overflow-y: visible;
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
      height: 100vh;
      & > div:nth-of-type(2) {
        height: 300px !important;
      }
      .files {
      }
    }
  }
`;

const BoardWrite: React.FC<BoardWriteProps> = (props) => {
  const { category } = props;
  const editorRef = useRef<Editor>(null);
  const router = useRouter();

  const [selectCategory, setSelectCategory] = useState(0);
  const [title, setTitle] = useState('');
  const [images, setImages] = useState({
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    image5: '',
  });

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const { api: reviewWriteApi } = useApi<reviewWriteType>({
    url: '/review',
    data: {
      category_id: selectCategory,
      content: '',
      id: user.auth?.id as number,
      title,
      // image1,
      // image2,
      // image3,
      // image4,
      // image5,
    },
    method: 'post',
  });

  const reviewWriteApiHandle: React.MouseEventHandler<HTMLButtonElement> =
    async (e) => {
      // 리뷰 작성 함수 핸들링 함수
      e.preventDefault();
      try {
        if (!editorRef.current) {
          // 에디터 Ref current가 없다면 리턴 해줍니다
          return;
        }

        const response = await reviewWriteApi({
          content: editorRef.current.getInstance().getHTML(),
          // 에디터에서 getHtml을 통해 html값을 전달 받아 API에 보내주기
        });
        if (response.data.statusCode === 200) {
          router.replace(`/board/${response.data.review.id}`);
          // 해당 글로 이동 replace를 사용한 이유는 뒤로가기를 눌럿을때 작성 페이지가 아닌 board 메인 페이지로 이동하도록 하기위함
        }
      } catch (error) {
        dispatch(changeError({ errorStatus: error, isShow: true }));
        // 에러 핸들링
      }
    };

  const onChangeCategory: React.ChangeEventHandler<HTMLSelectElement> =
    useCallback(
      (e) => {
        const findCategory = category.find((v) => v.title === e.target.value);
        if (findCategory) {
          setSelectCategory(findCategory.id);
        }
      },
      [category]
    );

  const onChangeFile =
    (index: number) => async (e: React.ChangeEvent<HTMLInputElement>) => {
      const reader = new FileReader();
      if (e.target.files?.length && e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
          setImages((prev) => ({
            ...prev,
            [`image${index + 1}`]: reader.result,
          }));
        };
      }
    };
  useEffect(() => {
    if (selectCategory === 0 && category && Array.isArray(category)) {
      setSelectCategory(category[0].id);
    }
  }, [category]);

  useLayoutEffect(() => {
    if (editorRef.current) {
      editorRef.current.getInstance().setHTML('');
    }
  }, []);

  useEffect(() => {
    if (!user.auth) {
      router?.replace('/board');
      window.alert('로그인 후 이용 가능합니다.');
    }
  }, []);
  console.log(images.image1);
  if (!user.auth) {
    return null;
  }
  return (
    <StyledWriteContainer>
      <Head>
        <title>DayCare</title>
        <meta name="description" content="DayCareBoardWrite" />
        <link rel="icon" href="/LogoIcon.png" />
      </Head>
      <div className="nav-menu">
        <Menu />
      </div>
      <form>
        <div className="row-div">
          <Select
            menuList={category.map((v) => v.title)}
            width="200px"
            onChange={onChangeCategory}
          />
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
            ['table', 'link'],
            ['code', 'codeblock'],
          ]}
          language="ko-kr"
          initialValue=""
        />
        <div className="write-button">
          <BlueButton
            content="작성"
            buttonProps={{ onClick: reviewWriteApiHandle, type: 'submit' }}
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
        {/* <div className="files">
          <InputFile value={images.image1} onChange={onChangeFile(0)} />
          <InputFile value={images.image2} onChange={onChangeFile(1)} />
          <InputFile value={images.image3} onChange={onChangeFile(2)} />
          <InputFile value={images.image4} onChange={onChangeFile(3)} />
          <InputFile value={images.image5} onChange={onChangeFile(4)} />
        </div> */}
      </form>
    </StyledWriteContainer>
  );
};

export default BoardWrite;
