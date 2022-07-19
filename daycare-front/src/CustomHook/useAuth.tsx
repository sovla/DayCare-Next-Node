/* eslint-disable no-unused-vars */
import { selectUser } from '@src/Store/userState';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Login from '@src/Components/Template/Modal/Login';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import SignUp from '@src/Components/Template/Modal/SignUp';
import Theme from '@src/assets/global/Theme';

export type ModalProps = {
  isShow: boolean;
};

const StyledModalOverlay = styled.div<ModalProps>`
  display: ${(p) => (p.isShow ? 'flex' : 'none')};
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 2000;
  width: 100vw;
  height: 100vh;

  justify-content: center;
  align-items: center;
  background-color: #0003;

  .close-button {
    width: 50px;
    height: 50px;
    background-color: #fff;
    position: absolute;
    right: -70px;
    top: 10px;
    z-index: 2010;
    font-size: 30px;
    font-weight: bold;
    border-radius: 16px;
    transition: 0.3s;
    &:hover {
      cursor: pointer;
      background-color: ${Theme.color.blue_00};
    }
  }
`;

const StyledModalContainer = styled.div`
  position: relative;
`;

const useAuth = () => {
  //  기능 유저가 로그인 안한 상태를 구별하는 훅
  //  1. function을 통해 체크 할 예정 return으로 넘겨줌
  //  2.
  const user = useSelector(selectUser);

  const [isShow, setIsShow] = useState<boolean>(false);
  const [isBrowser, setIsBrowser] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  useEffect(() => {
    if (isShow && user.auth != null) {
      setIsShow(false);
    }
  }, [user.auth, isShow]);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const LoginModal = useCallback(() => {
    if (isBrowser) {
      return ReactDOM.createPortal(
        <StyledModalOverlay isShow={isShow}>
          <StyledModalContainer>
            {isLogin ? (
              <Login setIsSignUp={() => setIsLogin(false)} />
            ) : (
              <SignUp setIsLogin={() => setIsLogin(true)} />
            )}
            <button
              onClick={() => setIsShow(false)}
              type="button"
              className="close-button"
            >
              X
            </button>
          </StyledModalContainer>
        </StyledModalOverlay>,
        document.getElementById('modal-root') as HTMLElement
      );
    }

    return null;
  }, [isBrowser, isLogin, isShow]);

  return { LoginModal, setIsShow };
};

export default useAuth;
