import Cards from '@src/Components/Template/Introduction/Cards';
import Menu from '@src/Components/Template/Layout/Menu';
import React from 'react';
import styled from 'styled-components';

import Information from '@src/assets/image/Information.png';
import ILove from '@src/assets/image/ILove.png';
import Mother from '@src/assets/image/Mother.png';
import CheckList from '@src/assets/image/CheckList.png';
import Theme from '@src/assets/global/Theme';
import Intro from '@src/assets/image/Intro.jpg';
import Image from 'next/image';
import Head from 'next/head';

const ContainerDiv = styled.div`
  position: relative;
  .subject {
    margin-left: 200px;
    margin-top: 150px;
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

  @media (max-width: 768px) {
    padding-bottom: 100px;
    height: 100vh;
    overflow-y: scroll;
    .subject {
      margin-left: 40px;
      margin-top: 40px;
      & > p {
        margin-bottom: 10px;
      }
      p {
        font-size: 24px;
      }
      h1 {
        color: ${Theme.color.blue_00};
        font-size: 36px;
      }
      & > div {
        display: inline;

        & > p,
        h1 {
          display: inline;
        }
      }
    }

    .cards {
      margin-top: 30px;
    }
  }
`;

const Introduction: React.FC = () => (
  <ContainerDiv>
    <Head>
      <title>DayCare</title>
      <meta name="description" content="DayCareIntroduction" />
      <link rel="icon" href="/LogoIcon.png" />
    </Head>
    <div className="subject">
      <p>그동안 좋은 어린이집 찾기 어려우셨죠?</p>
      <div>
        <h1>데이케어</h1>
        <p>는 간편하게 찾을수 있어요</p>
      </div>
    </div>
    <div className="nav-menu">
      <Menu />
    </div>

    <div className="cards">
      <Cards
        CardList={[
          {
            content:
              '월령별 성장 및 돌보기 팁이 적혀져있어요! 정보를 보면서 미리 대비합시다.',
            title: '육아 알아놓으면 좋은정보(0~36개월)',
            image: Information,
            onClick: () =>
              window.open(
                'https://www.childcare.go.kr/cpin/contents/030208010000.jsp'
              ),
          },
          {
            content:
              '보건복지부에서 지원하는 아이사랑 어플입니다. 아이에 관련된 많은 정보가 있습니다.',
            title: '아이사랑 홈페이지',
            image: ILove,
            onClick: () =>
              window.open('https://www.childcare.go.kr/cpin/main1.jsp'),
          },
          {
            content:
              '내 아이를 위해 상담시 물어봐야 하는 체크리스트! 꼭 챙겨 봅시다.',
            title: '어린이집 상담 체크리스트',
            image: CheckList,
            onClick: () =>
              window.open('https://blog.naver.com/dmsdud2080/222649228987'),
          },
          {
            content:
              '아이의 행동이 이해가 되지 않나요? 자주하는 질문을 통해 아이를 이해하는 과정을 가집시다!',
            title: '아이들에 대해 자주하는 질문',
            image: Mother,
            onClick: () =>
              window.open(
                'https://www.childcare.go.kr/web/board/BD_board.list.do?bbsCd=1012'
              ),
          },
        ]}
      />
    </div>
    <div className="background">
      <Image src={Intro} layout="fill" alt="backgroundImage" />
    </div>
  </ContainerDiv>
);

export default Introduction;
