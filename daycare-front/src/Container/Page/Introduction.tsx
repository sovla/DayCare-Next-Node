import Cards from '@src/Components/Template/Introduction/Cards';
import Menu from '@src/Components/Template/Layout/Menu';
import React from 'react';
import styled from 'styled-components';

import Dummy from '@src/assets/image/dummy1.png';
import Theme from '@src/assets/global/Theme';
import Intro from '@src/assets/image/Intro.jpg';
import Image from 'next/image';

const ContainerDiv = styled.div`
  position: relative;
  .subject {
    margin-left: 200px;
    margin-top: 270px;
    p {
      font-size: 48px;
    }
    h1 {
      color: ${Theme.color.blue_00};
    }
    & > div {
      display: flex;
      align-items: center;
    }
  }

  .menu {
    position: fixed;
    top: 0;
    right: 30px;
  }
  .cards {
    display: flex;
    justify-content: center;
    margin-top: 100px;
  }

  .background {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    z-index: -5;
  }
`;

const Introduction: React.FC = () => (
  <ContainerDiv>
    <div className="subject">
      <p>그동안 좋은 어린이집 찾기 어려우셨죠?</p>
      <div>
        <h1>데이케어</h1>
        <p>는 간편하게 찾을수 있어요</p>
      </div>
    </div>
    <div className="menu">
      <Menu />
    </div>

    <div className="cards">
      <Cards
        CardList={[
          { content: '고정값', title: '테스트', image: Dummy },
          { content: '고정값', title: '테스트', image: Dummy },
          { content: '고정값', title: '테스트', image: Dummy },
          { content: '고정값', title: '테스트', image: Dummy },
        ]}
      />
    </div>
    <div className="background">
      <Image src={Intro} layout="fill" alt="backgroundImage" />
    </div>
  </ContainerDiv>
);

export default Introduction;
