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
`;

const BoardWrite: React.FC<BoardWriteProps> = (props) => {
  const { category } = props;
  const editorRef = useRef<Editor>(null);
  const router = useRouter();

  const [selectCategory, setSelectCategory] = useState(0);
  const [title, setTitle] = useState('');

  const user = useSelector(selectUser);

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
      e.preventDefault();
      if (!editorRef.current) {
        return null;
      }

      const response = await reviewWriteApi({
        content: editorRef.current.getInstance().getHTML(),
      });
      if (response.data.statusCode === 200) {
        router.push('/board');
      }
      return true;
    };

  const onChangeCategory: React.ChangeEventHandler<HTMLSelectElement> =
    useCallback((e) => {
      const findCategory = category.find((v) => v.title === e.target.value);
      if (findCategory) {
        setSelectCategory(findCategory.id);
      }
    }, []);
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
            ['table', 'image', 'link'],
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
      </form>
    </StyledWriteContainer>
  );
};

export default BoardWrite;
