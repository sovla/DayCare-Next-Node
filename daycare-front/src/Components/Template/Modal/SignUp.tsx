/* eslint-disable jsx-a11y/anchor-is-valid */
import Theme from '@src/assets/global/Theme';
import InputText from '@src/Components/Atom/Input/InputText';
import { SignUpProps } from '@src/Type/Template/Modal';
import React, { useCallback, useState } from 'react';
import BlueButton from '@src/Components/Atom/Button/BlueButton';
import styled from 'styled-components';
import useApi from '@src/CustomHook/useApi';
import { userEmailVerifyType, userSignUpType } from '@src/Type/API/user';
import RegExp from '@src/Util/RegExp';
import { useDispatch } from 'react-redux';
import { changeUser } from '@src/Store/userState';
import { changeError } from '@src/Store/errorState';

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
  .email {
    margin: 0px 0px 20px;
    position: relative;
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
  button {
    cursor: pointer;
  }
  @media (max-width: 425px) {
    width: 100vw;
  }
`;

const SignUp: React.FC<SignUpProps> = ({ setIsLogin }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const { api: emailVerifyApi } = useApi<userEmailVerifyType>({
    url: '/user/email',
    data: {
      email,
    },
    method: 'post',
  });

  const { api: signUpApi } = useApi<userSignUpType>({
    url: '/user',
    data: {
      email,
      name,
      password,
      verificationCode,
    },
    method: 'post',
  });

  const dispatch = useDispatch();

  const onClickSignUpHandle: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(
      async (e) => {
        //  회원가입 API 핸들러
        e.preventDefault();

        try {
          if (!RegExp.stringLength(name, 2, 20)) {
            throw new Error('이름은 2 ~ 20자 이내로 입력해주세요.');
          }
          if (!RegExp.stringLength(password, 6, 20)) {
            throw new Error('비밀번호는 6 ~ 20자 이내로 입력해주세요.');
          }

          if (!RegExp.isEmail(email)) {
            throw new Error('이메일 형식이 아닙니다.');
          }

          if (verificationCode.length !== 6) {
            throw new Error('인증코드는 6자리입니다.');
          }

          const response = await signUpApi();
          if (response.data.statusCode === 200) {
            //  회원가입 성공시 바로 로그인 되도록 전역 user 상태 변경
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
      },
      [email, name, password, verificationCode]
    );

  const onClickEmailVerifyHandle: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(async () => {
      // 이메일 인증코드 발송 및 중복여부 확인
      try {
        if (!RegExp.isEmail(email)) {
          throw new Error('이메일 형식이 아닙니다.');
        }
        const response = await emailVerifyApi();
        if (response.data.statusCode === 200) {
          alert('해당 메일로 인증번호를 보냈습니다.');
        }
      } catch (error) {
        dispatch(
          changeError({
            errorStatus: error,
            isShow: true,
          })
        );
      }
    }, [email]);

  return (
    <ContainerDiv>
      <h3>회원가입</h3>
      <p className="gray-text">
        어린이집 리뷰 및 다양한 기능을
        <br />
        사용하려면 가입하세요.
      </p>
      <InputText
        type="text"
        placeholder="사용자 이름 (2 ~ 20자 사이)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete="name"
      />

      <InputText
        type="password"
        placeholder="비밀번호 (6 ~ 20자 사이)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="password"
      />
      <div className="email">
        <InputText
          type="email"
          placeholder="이메일 주소"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        {email.length > 0 && (
          <BlueButton
            content="인증"
            buttonProps={{
              onClick: onClickEmailVerifyHandle,
              style: {
                width: '50px',
                position: 'absolute',
                right: '-10px',
                top: '50%',
                transform: 'translate(100%,-50%)',
              },
            }}
          />
        )}
      </div>
      <InputText
        type="text"
        placeholder="이메일 인증코드"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
        autoComplete="email_authorization_code"
      />
      <BlueButton
        content="가입"
        buttonProps={{
          type: 'submit',
          onClick: onClickSignUpHandle,
        }}
      />
      <div className="line" />
      <p>
        계정이 있으신가요?
        <button type="button" onClick={setIsLogin}>
          <a>로그인</a>
        </button>
      </p>
      <div className="line" />
    </ContainerDiv>
  );
};

export default SignUp;
