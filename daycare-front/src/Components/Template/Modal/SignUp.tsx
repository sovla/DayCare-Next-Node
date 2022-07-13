/* eslint-disable jsx-a11y/anchor-is-valid */
import Theme from '@src/assets/global/Theme';
import InputText from '@src/Components/Atom/Input/InputText';
import Link from 'next/link';
import React from 'react';
import { BlueButton } from 'stories/Atom/Button.stories';
import styled from 'styled-components';

const ContainerDiv = styled.div`
  width: 400px;
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
  a {
    color: ${Theme.color.blue_00};
    text-decoration: none;
  }
  .gray-text {
    color: ${Theme.color.gray_99};
    text-align: center;
    line-height: 22px;
  }
`;

const SignUp: React.FC = () => (
  <ContainerDiv>
    <h3>회원가입</h3>
    <p className="gray-text">
      어린이집 리뷰 및 다양한 기능을
      <br />
      사용하려면 가입하세요.
    </p>
    <InputText type="text" placeholder="사용자 이름" />

    <InputText type="password" placeholder="비밀번호" />
    <InputText type="email" placeholder="이메일 주소" />
    <InputText type="text" placeholder="이메일 인증코드" />
    <BlueButton
      content="가입"
      buttonProps={{
        type: 'submit',
        onClick: () => {
          console.log('Login');
        },
      }}
    />
    <div className="line" />
    <p>
      계정이 있으신가요?
      <Link href="/login">
        <a>로그인</a>
      </Link>
    </p>
    <div className="line" />
  </ContainerDiv>
);

export default SignUp;
