/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import AccountIcon from '@src/assets/image/AccountIcon.png';
import BellIcon from '@src/assets/image/BellIcon.png';
import Theme from '@src/assets/global/Theme';

const Nav = styled.nav`
  & > ul {
    background-color: ${Theme.color.yellow_FF};
    display: flex;
    align-items: center;
    width: 460px;
    height: 80px;
    border-radius: 0px 0px 16px 16px;
    justify-content: space-around;
    & > li {
      height: 44px;
      margin-bottom: 5px;

      & * {
        color: #fff;
        text-decoration: none;
        font-size: 32px;
      }
      & *:hover {
        color: ${Theme.color.darkGray_60};
        filter: invert(43%) sepia(7%) saturate(680%) hue-rotate(62deg)
          brightness(90%) contrast(90%);
      }
    }
    & > li:nth-child(-n + 3) {
      width: 90px;
      text-align: center;
    }
  }
`;

const Menu: React.FC = () => (
  <Nav>
    <ul>
      <li>
        <Link href="/">
          <a>소개</a>
        </Link>
      </li>
      <li>
        <Link href="/map">
          <a>지도</a>
        </Link>
      </li>
      <li>
        <Link href="/review">
          <a>리뷰</a>
        </Link>
      </li>
      <li>
        <Link href="/account">
          <a>
            <i>
              <Image
                src={AccountIcon}
                width={44}
                height={44}
                alt="AccountIcon"
              />
            </i>
          </a>
        </Link>
      </li>
      <li>
        <Link href="/alarm">
          <a>
            <i>
              <Image src={BellIcon} width={44} height={44} alt="BellIcon" />
            </i>
          </a>
        </Link>
      </li>
    </ul>
  </Nav>
);

export default Menu;
