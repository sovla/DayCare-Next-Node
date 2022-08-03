import Button from '@src/Components/Atom/Button/Button';
import useApi from '@src/CustomHook/useApi';
import { changeUser, selectUser } from '@src/Store/userState';
import Link from 'next/link';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { sessionLoginOutType } from '@src/Type/API/session';
import { changeError } from '@src/Store/errorState';

const slide = keyframes`
  0% {
    transform:scaleY(0%)  translate(0%, 100%);
    
  }
  100% {
    transform:scaleY(100%) translate(0%, 100%) ;
  }
`;

const StyledDiv = styled.div`
  position: absolute;
  bottom: 0px;
  left: 320px;
  width: 100px;
  height: auto;

  background-color: #ffffff;
  animation: ${slide} 0.5s forwards;
`;

const LoginDropdown = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { api: LogoutApi } = useApi<sessionLoginOutType>({
    data: {
      id: user.auth?.id as number,
    },
    method: 'delete',
    url: '/session',
  });

  const onClickLogout = useCallback(async () => {
    // 로그아웃 API
    try {
      if (!user.auth) {
        throw new Error('로그인 정보가 없습니다.');
      }

      const response = await LogoutApi();

      if (response.data?.statusCode === 200) {
        alert('로그아웃 완료');
        dispatch(changeUser(null));
        // 로그아웃 처리 및 전역 상태 변경
      }
    } catch (error) {
      dispatch(
        changeError({
          errorStatus: error,
          isShow: true,
        })
      );
    }
  }, [user.auth]);

  if (!user.auth) {
    return null;
  }

  return (
    <StyledDiv>
      <Link href="/user">
        <Button content="내 정보 수정" buttonProps={{}} />
      </Link>
      <Button
        content="로그아웃"
        color="red"
        buttonProps={{
          onClick: onClickLogout,
        }}
      />
    </StyledDiv>
  );
};

export default LoginDropdown;
