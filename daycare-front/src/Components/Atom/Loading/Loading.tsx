import React from 'react';
import styled, { keyframes } from 'styled-components';
import LogoIcon from '@src/assets/image/LogoIcon.png';
import Image from 'next/image';

const LoadingAnimation = keyframes`
  0% {
    rotate:0deg ;
    
  }
  100% {
    rotate:360deg ;
  }
`;

const StyledLoadingDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 4000;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  justify-content: center;
  align-items: center;
  background-color: #0003;
  & > *:not(p) {
    animation: ${LoadingAnimation} 1s forwards infinite;
  }
  & > p {
    color: #ffffff;
    margin-top: 10px;
    font-size: 24px;
  }
`;

const Loading: React.FC = () => (
  <StyledLoadingDiv>
    <Image src={LogoIcon} width={40} height={40} alt="LoadingLogoIcon" />
    <p>어린이집을 불러오는 중...</p>
  </StyledLoadingDiv>
);

export default Loading;
