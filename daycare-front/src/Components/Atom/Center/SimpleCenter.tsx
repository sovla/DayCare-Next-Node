import { SimpleCenterProps } from '@src/Type/Atom/Center';
import Image from 'next/image';
import React, { useCallback } from 'react';
import styled from 'styled-components';

import SchoolBusIcon from '@src/assets/image/SchoolBusIcon.png';
import TelIcon from '@src/assets/image/TelIcon.png';
import HomePageIcon from '@src/assets/image/HomePageIcon.png';
import Theme from '@src/assets/global/Theme';

const CenterDiv = styled.div<{ isActive: boolean }>`
  display: flex;
  width: 400px;
  max-width: 400px;
  min-height: 80px;
  justify-content: space-between;
  border: 1px solid ${Theme.color.gray_C1};
  border-radius: 10px;
  &:hover {
    cursor: pointer;
  }
  transition: 0.3s;
  background-color: ${(p) => (p.isActive ? Theme.color.yellow_FFE : '#ffffff')};
  .center {
    padding: 10px;

    .introduction {
      display: flex;
      align-items: center;
      margin-bottom: 3px;

      & > h5 {
        color: ${Theme.color.blue_00};
        width: fit-content;
        max-width: 320px;
        max-height: 48px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      & > small {
        color: ${Theme.color.gray_99};
        padding: 0px 5px;
      }
    }
    .image {
      margin-top: 3px;
      & > span {
        padding-left: 5px;
      }
      & > a,
      & > button {
        padding-left: 5px;
        text-decoration: none;
      }
      .homepage {
        color: ${Theme.color.grean_00};
        max-width: 350px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        &:hover {
          color: ${Theme.color.blue_00};
        }
      }
    }
  }
  .address {
    max-width: 350px;
    display: block;
    word-break: keep-all;
    max-height: 38px;
    overflow: hidden;
  }
  div:nth-child(2) {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
  @media (max-width: 768px) {
    width: 320px;
    max-width: 320px;
    .homepage {
      max-width: 270px !important;
    }
  }
`;

const SimpleCenter: React.FC<SimpleCenterProps> = (props) => {
  const { address, name, tel, homepage, isSchoolBus, type, isActive } = props;

  const onClickHomepage = useCallback(() => {
    if (!homepage) {
      return;
    }

    if (homepage.includes('https://') || homepage.includes('http://')) {
      window.open(homepage);
      return;
    }

    window.open(`https://${homepage}`);
  }, [homepage]);
  return (
    <CenterDiv isActive={!!isActive}>
      <div className="center">
        <div className="introduction">
          <h5>{name}</h5>
          <small>{type}</small>
          {isSchoolBus && (
            <Image
              src={SchoolBusIcon}
              width={22}
              height={22}
              alt="SchoolBusIcon"
            />
          )}
        </div>
        <span className="address">{address}</span>
        {tel && tel.length > 0 && (
          <div className="image">
            <Image src={TelIcon} width={12} height={12} alt="TelIcon" />
            <span>{tel}</span>
          </div>
        )}

        {homepage && homepage?.length > 0 && (
          <div className="image">
            <Image
              src={HomePageIcon}
              width={12}
              height={12}
              alt="HomePageIcon"
            />

            <button type="button" onClick={onClickHomepage}>
              <span className="homepage">{homepage}</span>
            </button>
          </div>
        )}
      </div>
      {/* <div>
        {image && (
          <Image
            src={image}
            width={100}
            height={100}
            style={{ borderRadius: '10px' }}
            alt="DaycareCenterImage"
          />
        )}
      </div> */}
    </CenterDiv>
  );
};

export default SimpleCenter;
