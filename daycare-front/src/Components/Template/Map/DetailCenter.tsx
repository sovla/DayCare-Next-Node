import { DetailCenterProps } from '@src/Type/Template/Map';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import Theme from '@src/assets/global/Theme';

const CenterAside = styled.aside`
  width: 440px;
  min-width: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 100vh;
  height: 100vh;
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
    background-color: ${Theme.color.gray_C1};
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
    min-height: 50px;
    margin-bottom: 20px;
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
  @media (max-width: 768px) {
    width: 100vw;
    min-width: 320px;
    height: calc(100vh - 80px);
    max-height: calc(100vh - 80px);
    overflow-y: scroll;
    & > div:first-of-type {
      min-height: 200px;
    }
    .information {
      display: block;
      overflow: visible;
      .row-div {
        min-width: 320px;
        max-width: 100vw;
        height: fit-content;
        min-height: fit-content;
        & > p:first-child {
          width: 150px;
        }
        & > p:last-child {
          width: calc(100% - 150px);
        }
      }
    }
  }
`;

const DetailCenter: React.FC<DetailCenterProps> = (props) => {
  const { image, center, classList, onClickDetailInformation } = props;
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
      {/* <div className="menu">
        <DetailMenuButton
          image={SaveIcon}
          alt="SaveIcon"
          menu="????????????"
          buttonProps={{
            onClick: () => {
              console.log('Save');
            },
          }}
        />
        <DetailMenuButton
          image={ReviewIcon}
          alt="ReviewIcon"
          menu="??????????????????"
          buttonProps={{
            onClick: () => {
              console.log('goToReview');
            },
          }}
        />
        <DetailMenuButton
          image={ShareIcon}
          alt="ShareIcon"
          menu="????????????"
          buttonProps={{
            onClick: () => {
              console.log('Share');
            },
          }}
        />
      </div> */}
      {/* <div className="line" /> */}
      <div className="information">
        <div className="row-div">
          <p>?????????</p>
          <p>{center.name}</p>
        </div>
        <div className="row-div">
          <p>?????????</p>
          <p>{center.authorizationDate}</p>
        </div>
        <div className="row-div">
          <p>?????? ????????????</p>
          <p>{center.city}</p>
        </div>
        <div className="row-div">
          <p>????????????</p>
          <p>{center.tel}</p>
        </div>
        <div className="row-div">
          <p>????????????</p>
          <p>{center.operatingTime}</p>
        </div>
        <div className="row-div">
          <p>??????</p>
          <p>{center.address}</p>
        </div>
        <div className="row-div">
          <p>????????????</p>
          <p>{center.representativeName}</p>
        </div>
        <div className="row-div">
          <p>?????????</p>
          <p>{center.directorName}</p>
        </div>
      </div>
      <table>
        <tr>
          <th>??????</th>
          <th>?????????</th>
        </tr>
        {classList.map((v) => (
          <tr key={v.title}>
            <td>{v.title}</td>
            <td>{v.value}</td>
          </tr>
        ))}
      </table>
      <div className="detail">
        <button type="button" onClick={onClickDetailInformation}>
          <p>???????????? ????????????</p>
        </button>
      </div>
    </CenterAside>
  );
};

export default DetailCenter;
