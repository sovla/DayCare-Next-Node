/* eslint-disable indent */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import AccountIcon from '@src/assets/image/AccountIcon.png';
import BellIcon from '@src/assets/image/BellIcon.png';
import Theme from '@src/assets/global/Theme';
import useAuth from '@src/CustomHook/useAuth';
import { useSelector } from 'react-redux';
import { selectUser } from '@src/Store/userState';
import { useRouter } from 'next/router';
import LoginDropdown from '../Modal/LoginDropdown';

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

  & *:hover {
    color: ${Theme.color.darkGray_60};
    filter: invert(43%) sepia(7%) saturate(680%) hue-rotate(62deg)
      brightness(90%) contrast(90%);
  }
`;

const Menu: React.FC = () => {
  const { LoginModal, setIsShow } = useAuth();
  const [isLoginMenu, setIsLoginMenu] = useState(false);
  const user = useSelector(selectUser);
  const router = useRouter();

  const onClickProfile = useCallback(() => {
    if (!user.auth) {
      setIsShow(true);
      return;
    }
    setIsLoginMenu((prev) => !prev);
  }, [user.auth]);
  return (
    <Nav>
      <ul>
        <StyledMenuLi isActive={router?.asPath === '/'}>
          <Link href="/">
            <a>소개</a>
          </Link>
        </StyledMenuLi>
        <StyledMenuLi isActive={router?.asPath === '/map'}>
          <Link href="/map">
            <a>지도</a>
          </Link>
        </StyledMenuLi>
        <StyledMenuLi isActive={router?.asPath === '/board'}>
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
          <button
            onClick={() => {
              alert('기능 구현중 ㅠㅠ');
            }}
            type="button"
          >
            <i>
              <Image src={BellIcon} width={44} height={44} alt="BellIcon" />
            </i>
          </button>
        </StyledMenuLi>
        {isLoginMenu && <LoginDropdown />}
      </ul>
      <LoginModal />
    </Nav>
  );
};

export default Menu;
