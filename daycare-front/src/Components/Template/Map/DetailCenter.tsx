import { DetailCenterProps } from '@src/Type/Template/Map';
import Image from 'next/image';
import React from 'react';
import { DetailMenuButton } from 'stories/Atom/Button.stories';
import styled from 'styled-components';
import SaveIcon from '@src/assets/image/SaveIcon.png';
import ShareIcon from '@src/assets/image/ShareIcon.png';
import ReviewIcon from '@src/assets/image/ReviewIcon.png';
import Theme from '@src/assets/global/Theme';

const CenterAside = styled.aside`
  width: 440px;
  min-width: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  .menu {
    display: flex;
    width: 100%;
    justify-content: space-around;
    margin-top: 20px;
  }
  .line {
    width: 100%;
    height: 10px;
    background-color: ${Theme.color.gray_99};
    margin-top: 20px;
  }
  .row-div {
    display: flex;
    width: 360px;
    border-bottom: 1px solid ${Theme.color.gray_D9};
    padding: 10px 0px;
    & > p:first-child {
      width: 150px;
    }
    & > p:last-child {
      width: calc(100% - 150px);
    }
  }
  .information {
    display: flex;
    margin-top: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  table {
    margin-top: 20px;
  }
  th,
  td {
    border: 1px solid ${Theme.color.gray_D9};
    width: 190px;
    text-align: center;
    padding: 10px 0px;
  }
  .detail {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    button {
      border: 1px solid ${Theme.color.gray_D9};
      border-radius: 30px;
      width: 380px;
      height: 50px;
      &:hover {
        background-color: ${Theme.color.blue_00};
        & > p {
          color: #ffffff;
        }
      }
    }
  }
`;

const DetailCenter: React.FC<DetailCenterProps> = (props) => {
  const { image, center, classList } = props;
  return (
    <CenterAside>
      <div>
        <Image
          src={image}
          width={440}
          height={200}
          alt="daycareCenterImage"
          objectFit="cover"
        />
      </div>
      <div className="menu">
        <DetailMenuButton
          image={SaveIcon}
          alt="SaveIcon"
          menu="저장하기"
          buttonProps={{
            onClick: () => {
              console.log('Save');
            },
          }}
        />
        <DetailMenuButton
          image={ReviewIcon}
          alt="ReviewIcon"
          menu="리뷰보러가기"
          buttonProps={{
            onClick: () => {
              console.log('goToReview');
            },
          }}
        />
        <DetailMenuButton
          image={ShareIcon}
          alt="ShareIcon"
          menu="공유하기"
          buttonProps={{
            onClick: () => {
              console.log('Share');
            },
          }}
        />
      </div>
      <div className="line" />
      <div className="information">
        <div className="row-div">
          <p>기관명</p>
          <p>{center.name}</p>
        </div>
        <div className="row-div">
          <p>설립일</p>
          <p>{center.authorizationDate}</p>
        </div>
        <div className="row-div">
          <p>관할 행정기관</p>
          <p>{center.city}</p>
        </div>
        <div className="row-div">
          <p>전화번호</p>
          <p>{center.tel}</p>
        </div>
        <div className="row-div">
          <p>운영시간</p>
          <p>{center.operatingTime}</p>
        </div>
        <div className="row-div">
          <p>주소</p>
          <p>{center.address}</p>
        </div>
        <div className="row-div">
          <p>대표자명</p>
          <p>{center.representativeName}</p>
        </div>
        <div className="row-div">
          <p>원장명</p>
          <p>{center.directorName}</p>
        </div>
      </div>
      <table>
        <tr>
          <th>반수</th>
          <th>아동수</th>
        </tr>
        {classList.map((v) => (
          <tr key={v.title}>
            <td>{v.title}</td>
            <td>{v.value}</td>
          </tr>
        ))}
      </table>
      <div className="detail">
        <button type="button">
          <p>상세정보 보러가기</p>
        </button>
      </div>
    </CenterAside>
  );
};

export default DetailCenter;
