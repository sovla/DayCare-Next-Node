/* eslint-disable jsx-a11y/anchor-is-valid */
import Theme from '@src/assets/global/Theme';
import InputText from '@src/Components/Atom/Input/InputText';
import React, { useCallback, useState } from 'react';
import BlueButton from '@src/Components/Atom/Button/BlueButton';
import styled from 'styled-components';
import useApi from '@src/CustomHook/useApi';
import { sessionLoginType } from '@src/Type/API/session';
import { useDispatch, useSelector } from 'react-redux';
import { changeUser } from '@src/Store/userState';
import { LoginProps } from '@src/Type/Template/Modal';
import { changeError } from '@src/Store/errorState';
import RegExp from '@src/Util/RegExp';
import { selectToken } from '@src/Store/tokenState';

const ContainerDiv = styled.div`
  width: 400px;
  height: 410px;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  & > h3 {
    margin: 20px 0px;
  }

  & > input {
    margin: 0px 0px 20px;
  }
  & > input:nth-of-type(1) {
    margin: 20px 0px;
  }

  .line {
    width: calc(100% - 60px);
    height: 1px;
    background-color: ${Theme.color.gray_C1};
    margin: 20px 0px;
  }
  .line:nth-of-type(1) {
    margin: 60px 0px 20px;
  }
  a {
    color: ${Theme.color.blue_00};
    text-decoration: none;
  }
  button {
    cursor: pointer;
  }
  @media (max-width: 425px) {
    width: 100vw;
    height: 410px;
  }
`;

const Login: React.FC<LoginProps> = ({ setIsSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const token = useSelector(selectToken);

  const { api: loginApi } = useApi<sessionLoginType>({
    url: '/session',
    data: {
      email,
      password,
      token: token.value,
    },
    method: 'post',
  });

  const loginApiHandle = useCallback(async () => {
    try {
      if (!RegExp.isEmail(email)) {
        // RegExp 클래스 : 정규식 또는 문자열 수 등을 테스트해 결과에 맞으면 true 틀리면 false를 리턴
        throw new Error('이메일 형식이 아닙니다.');
      }
      if (!RegExp.stringLength(password, 6, 20)) {
        throw new Error('비밀번호는 6 ~ 20자 이내로 입력해주세요.');
      }
      const response = await loginApi();
      if (response.data.statusCode === 200) {
        //  로그인성공  성공시 전역 user 상태를 변경
        dispatch(changeUser(response.data.user));
      }
    } catch (error) {
      // 에러 발생 시 전역 error 상태를 변경
      dispatch(
        changeError({
          errorStatus: error,
          isShow: true,
        })
      );
    }
  }, [email, password]);

  return (
    <ContainerDiv>
      <h3>로그인</h3>
      <InputText
        type="text"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
      />

      <InputText
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="password"
      />
      <BlueButton
        content="로그인"
        buttonProps={{
          type: 'button',
          onClick: loginApiHandle,
        }}
      />
      <div className="line" />
      <p>
        계정이 없으신가요?
        <button type="button" onClick={setIsSignUp}>
          <a>가입하기</a>
        </button>
      </p>
      <div className="line" />
    </ContainerDiv>
  );
};

export default Login;
