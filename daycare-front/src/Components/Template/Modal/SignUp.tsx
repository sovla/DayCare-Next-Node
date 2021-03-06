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
import { AxiosError } from 'axios';
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

  // console.log(isLoading, isSignUpLoading, ' ???????????? ???????????? ??????');

  const dispatch = useDispatch();

  const onClickSignUpHandle: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(
      async (e) => {
        //  ???????????? API ?????????
        e.preventDefault();

        try {
          if (!RegExp.stringLength(name, 2, 20)) {
            throw new AxiosError('????????? 2 ~ 20??? ????????? ??????????????????.');
          }
          if (!RegExp.stringLength(password, 6, 20)) {
            throw new AxiosError('??????????????? 6 ~ 20??? ????????? ??????????????????.');
          }

          if (!RegExp.isEmail(email)) {
            throw new AxiosError('????????? ????????? ????????????.');
          }

          if (verificationCode.length !== 6) {
            throw new AxiosError('??????????????? 6???????????????.');
          }

          const response = await signUpApi();
          if (response.data.statusCode === 200) {
            dispatch(changeUser(response.data.user));
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
      [dispatch, email, name, password, signUpApi, verificationCode.length]
    );

  const onClickEmailVerifyHandle: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(async () => {
      // ????????? ???????????? ?????? ??? ???????????? ??????
      try {
        if (!RegExp.isEmail(email)) {
          throw new AxiosError('????????? ????????? ????????????.');
        }
        const response = await emailVerifyApi();
        if (response.data.statusCode === 200) {
          alert('?????? ????????? ??????????????? ???????????????.');
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
      <h3>????????????</h3>
      <p className="gray-text">
        ???????????? ?????? ??? ????????? ?????????
        <br />
        ??????????????? ???????????????.
      </p>
      <InputText
        type="text"
        placeholder="????????? ?????? (2 ~ 20??? ??????)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <InputText
        type="password"
        placeholder="???????????? (6 ~ 20??? ??????)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="email">
        <InputText
          type="email"
          placeholder="????????? ??????"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {email.length > 0 && (
          <BlueButton
            content="??????"
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
        placeholder="????????? ????????????"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
      />
      <BlueButton
        content="??????"
        buttonProps={{
          type: 'submit',
          onClick: onClickSignUpHandle,
        }}
      />
      <div className="line" />
      <p>
        ????????? ????????????????
        <button type="button" onClick={setIsLogin}>
          <a>?????????</a>
        </button>
      </p>
      <div className="line" />
    </ContainerDiv>
  );
};

export default SignUp;
