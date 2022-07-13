/* eslint-disable jsx-a11y/anchor-is-valid */
import Theme from '@src/assets/global/Theme';
import InputText from '@src/Components/Atom/Input/InputText';
import Link from 'next/link';
import React from 'react';
import { BlueButton } from 'stories/Atom/Button.stories';
import styled from 'styled-components';

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
`;

const Login: React.FC = () => (
  <ContainerDiv>
    <h3>로그인</h3>
    <InputText type="text" placeholder="사용자 이름" />

    <InputText type="password" placeholder="비밀번호" />
    <BlueButton
      content="로그인"
      buttonProps={{
        type: 'submit',
        onClick: () => {
          console.log('Login');
        },
      }}
    />
    <div className="line" />
    <p>
      계정이 없으신가요?
      <Link href="/signUp">
        <a>가입하기</a>
      </Link>
    </p>
    <div className="line" />
  </ContainerDiv>
);

export default Login;
