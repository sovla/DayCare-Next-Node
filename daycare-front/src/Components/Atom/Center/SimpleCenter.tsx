import { SimpleCenterProps } from '@src/Type/Atom/Center';
import Image from 'next/image';
import React, { useCallback } from 'react';
import styled from 'styled-components';

import SchoolBusIcon from '@src/assets/image/SchoolBusIcon.png';
import TelIcon from '@src/assets/image/TelIcon.png';
import HomePageIcon from '@src/assets/image/HomePageIcon.png';
import Theme from '@src/assets/global/Theme';

const CenterDiv = styled.div`
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
  .center {
    padding: 10px;
    .introduction {
      display: flex;
      align-items: center;
      margin-bottom: 3px;

      & > h5 {
        color: ${Theme.color.blue_00};
        width: min-content;
        max-width: 200px;
        word-wrap: break-word;
        word-break: keep-all;
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
        &:hover {
          color: ${Theme.color.blue_00};
        }
      }
    }
  }
  .address {
    max-width: 250px;
    display: block;
    word-break: keep-all;
  }
  div:nth-child(2) {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
`;

const SimpleCenter: React.FC<SimpleCenterProps> = (props) => {
  const { address, image, name, tel, homepage, isSchoolBus, type } = props;

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
    <CenterDiv>
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
      <div>
        {image && (
          <Image
            src={image}
            width={100}
            height={100}
            style={{ borderRadius: '10px' }}
            alt="DaycareCenterImage"
          />
        )}
      </div>
    </CenterDiv>
  );
};

export default SimpleCenter;
