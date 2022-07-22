/* eslint-disable react/jsx-curly-newline */
/* eslint-disable no-unused-vars */
import { selectUser } from '@src/Store/userState';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Login from '@src/Components/Template/Modal/Login';
import styled from 'styled-components';
import SignUp from '@src/Components/Template/Modal/SignUp';
import Theme from '@src/assets/global/Theme';
import ReactDOM from 'react-dom';
import { AxiosError, AxiosResponse } from 'axios';
import { changeError, selectError } from '@src/Store/errorState';

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
  padding: 20px 40px;
  min-width: 200px;
  min-height: 100px;
  border-radius: 16px;
  width: fit-content;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  & > p {
    color: black;
  }
`;

type ErrorType = {
  message: string;
  statusCode: number;
};

const useError = () => {
  //  기능 에러 핸들링
  //  1. function을 통해 체크 할 예정 return으로 넘겨줌

  const { errorStatus } = useSelector(selectError);

  const dispatch = useDispatch();

  const [isBrowser, setIsBrowser] = useState<boolean>(false);
  console.log(errorStatus, 'errorStatus');
  useEffect(() => {
    setIsBrowser(true);
  }, []);
  const ErrorModal = useCallback(() => {
    if (isBrowser && errorStatus) {
      let message = '';
      if (errorStatus instanceof AxiosError) {
        const errorStatusResponse =
          errorStatus.response as AxiosResponse<ErrorType>;
        message = errorStatusResponse?.data?.message ?? errorStatus.message;
      } else if (errorStatus instanceof Error) {
        message = errorStatus.message;
      }

      return ReactDOM.createPortal(
        <StyledModalOverlay isShow={!!errorStatus}>
          <StyledModalContainer>
            <p>{message}</p>
            <button
              onClick={() =>
                dispatch(
                  changeError({
                    errorStatus: null,
                    isShow: false,
                  })
                )
              }
              type="button"
              className="close-button"
            >
              X
            </button>
          </StyledModalContainer>
        </StyledModalOverlay>,
        document.getElementById('error-root') as HTMLElement
      );
    }

    return null;
  }, [dispatch, errorStatus, isBrowser]);

  return { ErrorModal };
};

export default useError;
