/* eslint-disable indent */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import AccountIcon from '@src/assets/image/AccountIcon.png';
import BellIcon from '@src/assets/image/BellIcon.png';
import Theme from '@src/assets/global/Theme';
import useAuth from '@src/CustomHook/useAuth';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@src/Store/store';
import { changeError } from '@src/Store/errorState';
import LoginDropdown from '../Modal/LoginDropdown';
import Alarm from '../Modal/Alert';

const shake = keyframes`
0% {
    rotate:15deg ;
    
  }
  50%{
    rotate:-15deg ;
  }
  100% {
    rotate:15deg ;
  }
`;

const Nav = styled.nav`
  & > ul {
    background-color: ${Theme.color.yellow_FF};
    display: flex;
    align-items: center;
    width: 460px;
    height: 80px;
    border-radius: 0px 0px 16px 16px;
    justify-content: space-around;

    & > li:nth-child(-n + 3) {
      margin-top: 10px;

      width: 90px;
      text-align: center;
    }
  }
  @media (max-width: 768px) {
    & > ul {
      width: 100vw;
      height: 80px;
      border-radius: 16px 16px 0px 0px;

      & > li:nth-child(-n + 3) {
        margin-top: 0px;
        width: max-content;
        text-align: center;
        & > a {
          font-size: 24px;
          width: fit-content;
          margin-top: 10px;
        }
      }
      & > li {
        display: flex;
        align-items: center;
        * {
          width: 36px;
          height: 36px;
        }
      }
    }
  }
`;

const StyledMenuLi = styled.li<{ isActive: boolean }>`
  height: 44px;
  position: relative;
  & * {
    color: ${(p) => (p.isActive ? Theme.color.darkGray_60 : '#ffffff')};
    text-decoration: none;
    font-size: 32px;
    cursor: pointer;

    ${(p) =>
      p.isActive &&
      css({
        filter: `invert(43%) sepia(7%) saturate(680%) hue-rotate(62deg)
      brightness(90%) contrast(90%);`,
      })}
  }

  & :hover {
    color: ${Theme.color.darkGray_60};
    filter: invert(43%) sepia(7%) saturate(680%) hue-rotate(62deg)
      brightness(90%) contrast(90%);
  }
`;

const alarmShow = keyframes`
20% {
    transform: rotate3d(0, 0, 1, 15deg);
  }

  40% {
    transform: rotate3d(0, 0, 1, -10deg);
  }

  60% {
    transform: rotate3d(0, 0, 1, 5deg);
  }

  80% {
    transform: rotate3d(0, 0, 1, -5deg);
  }

  to {
    transform: rotate3d(0, 0, 1, 0deg);
  }

`;

const StyledBellButton = styled.button<{ isShake: boolean }>`
  .bell {
    position: relative;

    & :not(span) {
      ${(p) =>
        p.isShake &&
        css`
          animation: ${shake} 0.75s infinite;
        `}
    }
  }
`;

const StyledBellSpan = styled.span`
  position: absolute;
  top: -20;
  right: 0;
  font-size: 14px;
  color: #ffffff;
  background-color: red;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${alarmShow} 3s;
`;

const Menu: React.FC = () => {
  const { LoginModal, setIsShow } = useAuth();
  const [isLoginMenu, setIsLoginMenu] = useState(false);
  const [isAlertMenu, setIsAlertMenu] = useState(false);
  const [isAlarmShake, setIsAlarmShake] = useState(false);
  const { user, alarm } = useAppSelector((state) => state);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onClickProfile = useCallback(() => {
    if (!user.auth) {
      setIsShow(true);
      // 비로그인시 로그인 모달 띄워주기
      return;
    }
    setIsLoginMenu((prev) => !prev);
    // 로그인시 로그인 메뉴 띄워주기
  }, [user.auth]);

  const onClickBell = useCallback(() => {
    if (!user.auth) {
      setIsAlertMenu(false);

      dispatch(
        changeError({
          errorStatus: new Error('로그인 후 이용가능합니다.'),
          isShow: true,
        })
      );
      // 비로그인시 에러 출력
      return;
    }
    setIsAlertMenu((prev) => !prev);
  }, [user.auth]);

  const alarmLength = useMemo(
    () => alarm.apiAlarmList.filter((v) => v.read_status === 0).length,
    [alarm.apiAlarmList.length]
  );

  useEffect(() => {
    if (
      alarm.loading === 'pending' &&
      !isAlarmShake &&
      alarm.apiAlarmList.filter((v) => v.read_status === 0).length > 0
    ) {
      setIsAlarmShake(true);
      setTimeout(() => setIsAlarmShake(false), 3000);
    }
  }, [alarm.loading]);
  return (
    <Nav>
      <ul>
        <StyledMenuLi isActive={router?.route === '/'}>
          <Link href="/">
            <a>소개</a>
          </Link>
        </StyledMenuLi>
        <StyledMenuLi isActive={router?.route === '/map'}>
          <Link href="/map">
            <a>지도</a>
          </Link>
        </StyledMenuLi>
        <StyledMenuLi isActive={router?.route?.includes('/board')}>
          <Link href="/board">
            <a>리뷰</a>
          </Link>
        </StyledMenuLi>
        <StyledMenuLi isActive={router?.asPath?.includes('/user')}>
          <button onClick={onClickProfile} type="button">
            <i>
              <Image
                src={AccountIcon}
                width={44}
                height={44}
                alt="AccountIcon"
              />
            </i>
          </button>
        </StyledMenuLi>
        <StyledMenuLi isActive={false}>
          <StyledBellButton
            onClick={onClickBell}
            type="button"
            isShake={isAlarmShake}
          >
            <i className="bell">
              <Image src={BellIcon} width={44} height={44} alt="BellIcon" />
              {alarmLength > 0 && (
                <StyledBellSpan>
                  {alarm.apiAlarmList.filter((v) => v.read_status === 0).length}
                </StyledBellSpan>
              )}
            </i>
          </StyledBellButton>
        </StyledMenuLi>

        {isLoginMenu && <LoginDropdown />}
      </ul>
      {isAlertMenu && <Alarm />}

      <LoginModal />
    </Nav>
  );
};

export default Menu;
