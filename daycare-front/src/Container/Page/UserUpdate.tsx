/* eslint-disable no-underscore-dangle */

import API from '@src/API';
import Theme from '@src/assets/global/Theme';
import Button from '@src/Components/Atom/Button/Button';
import InputText from '@src/Components/Atom/Input/InputText';
import Menu from '@src/Components/Template/Layout/Menu';
import { changeError } from '@src/Store/errorState';
import { changeUser, selectUser } from '@src/Store/userState';
import { getUserInformationType, userPatchType } from '@src/Type/API/user';
import RegExp from '@src/Util/RegExp';
import { AxiosResponse } from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const StyledDiv = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: ${Theme.color.yellow_FFE};
  display: flex;
  flex-direction: column;
  align-items: center;
  section.user-information {
    background-color: #ffffff;
    border-radius: 16px;
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40%;
    padding: 40px;
    & > h2 {
      margin: 0px 0px 40px;
    }
  }
  .flex {
    display: flex;
    position: relative;
    .buttons {
      position: absolute;
      right: 0px;
      top: 0px;
      transform: translate(120%, 10%);
      & > button:first-of-type {
        margin-right: 10px;
      }
    }
  }
  .row-center {
    width: 300px;
    border-bottom: 1px solid ${Theme.color.gray_C1};
    height: 40px;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    padding-bottom: 5px;
    & > p:first-of-type {
      width: 100px;
    }
  }
`;

const UserUpdate: React.FC<{
  user: getUserInformationType['response']['user'];
}> = (props) => {
  const { user } = props;

  const userState = useSelector(selectUser);
  const router = useRouter();
  const dispatch = useDispatch();

  const [isNameUpdate, setIsNameUpdate] = useState(false);
  const [isPasswordUpdate, setIsPasswordUpdate] = useState(false);
  const [updateName, setUpdateName] = useState(user.name);
  const [updatePassword, setUpdatePassword] = useState('');

  const patchUser = useCallback(async () => {
    try {
      if (isNameUpdate && !RegExp.stringLength(updateName, 2, 20)) {
        throw new Error('이름은 2 ~ 20자 이내로 입력해주세요.');
      }

      if (isPasswordUpdate && !RegExp.stringLength(updatePassword, 6, 20)) {
        throw new Error('비밀번호는 6 ~ 20자 이내로 입력해주세요.');
      }

      if (userState.auth === null) {
        throw new Error('잘못된 접근입니다.');
      }
      const response = (await API.patch('/user', {
        name: isNameUpdate ? updateName : undefined,
        password: isPasswordUpdate ? updatePassword : undefined,
        id: userState.auth.id,
      })) as AxiosResponse<userPatchType['response'], userPatchType['request']>;
      if (response.data.statusCode === 200) {
        alert('변경완료');
        dispatch(changeUser(response.data.user));

        setIsNameUpdate(false);
        setIsPasswordUpdate(false);
        user.name = response.data.user.name;
      }
    } catch (error) {
      dispatch(
        changeError({
          errorStatus: error,
          isShow: true,
        })
      );
    }
  }, [isNameUpdate, updateName, isPasswordUpdate, updatePassword, userState.auth, dispatch, user]);

  useEffect(() => {
    if (userState.auth === null || user.id !== userState.auth.id) {
      alert('접근 권한이 없습니다');
      router.back();
    }
  }, [userState.auth]);

  if (userState.auth === null) {
    return null;
  }
  return (
    <StyledDiv>
      <Head>
        <title>DayCare</title>
        <meta name="description" content="DayCareUser" />
        <link rel="icon" href="/LogoIcon.png" />
      </Head>
      <nav className="nav-menu">
        <Menu />
      </nav>
      <section className="user-information">
        <h2>유저 정보 변경</h2>
        <div className="row-center">
          <p>이메일</p>
          <p>{user.email}</p>
        </div>
        <div className="flex">
          <div className="row-center">
            <p>이름</p>
            {isNameUpdate ? (
              <InputText
                type="text"
                value={updateName}
                onChange={(e) => setUpdateName(e.target.value)}
                autoComplete="name"
              />
            ) : (
              <p>{user.name}</p>
            )}
          </div>
          <div className="buttons">
            {isNameUpdate ? (
              <>
                <Button
                  content="수정 완료"
                  buttonProps={{
                    onClick: patchUser,
                  }}
                />
                <Button
                  content="취소"
                  color="red"
                  buttonProps={{
                    onClick: () => {
                      setIsNameUpdate(false);
                    },
                  }}
                />
              </>
            ) : (
              <Button
                content="수정"
                buttonProps={{
                  onClick: () => setIsNameUpdate(true),
                }}
              />
            )}
          </div>
        </div>
        <div className="flex">
          <div className="row-center">
            <p>패스워드</p>
            {isPasswordUpdate ? (
              <InputText
                type="password"
                autoComplete="password"
                value={updatePassword}
                onChange={(e) => setUpdatePassword(e.target.value)}
                placeholder="6 ~ 20자 사이"
              />
            ) : (
              <p> ●●●●●●</p>
            )}
          </div>
          <div className="buttons">
            {isPasswordUpdate ? (
              <>
                <Button
                  content="수정 완료"
                  buttonProps={{
                    onClick: patchUser,
                  }}
                />
                <Button
                  content="취소"
                  color="red"
                  buttonProps={{
                    onClick: () => {
                      setIsPasswordUpdate(false);
                    },
                  }}
                />
              </>
            ) : (
              <Button
                content="수정"
                buttonProps={{
                  onClick: () => setIsPasswordUpdate(true),
                }}
              />
            )}
          </div>
        </div>
      </section>
    </StyledDiv>
  );
};

export default UserUpdate;
