/* eslint-disable no-undef */
import Centers from '@src/Components/Template/Map/Centers';
import DetailCenter from '@src/Components/Template/Map/DetailCenter';
import useScript from '@src/Util/useScript';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Dummy from '@src/assets/image/dummy1.png';
import Search from '@src/Components/Atom/Input/Search';
import Image from 'next/image';
import LogoIcon from '@src/assets/image/LogoIcon.png';
import Menu from '@src/Components/Template/Layout/Menu';

const ContainerDiv = styled.div`
  display: flex;
  .search {
    padding-top: 10px;
  }
  .row-center {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-around;
    padding-right: 5px;
  }
  .nav-menu {
    position: fixed;
    top: 0px;
    right: 30px;
    z-index: 5;
  }
`;

const Map: React.FC = () => {
  const [loading, error] = useScript(
    `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${
      process.env.NAVER_CLIENT_ID ?? 'uwfobz7x24'
    }`
  );
  const [selectCenter, setSelectCenter] = useState(0);

  const initMap = () => {
    // Brewery
    const mapOptions = {
      center: new naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 10,
    };

    const map = new naver.maps.Map('map', mapOptions);

    return map;
  };
  useEffect(() => {
    // initMap();
    if (!loading) {
      initMap();
    }
  }, [loading]);

  if (loading || error) {
    return null;
  }

  return (
    <ContainerDiv>
      <Head>
        <title>DayCare</title>
        <meta name="description" content="DayCareMap" />
        <link rel="icon" href="/LogoIcon.png" />
      </Head>
      <aside className="search">
        <div className="row-center">
          <Image src={LogoIcon} width={45} height={45} />
          <Search onClick={() => setSelectCenter(1)} inputProps={{}} />
        </div>
        <Centers
          centerList={[
            {
              image: Dummy,
              address: '부산 남구 고동골로60번길 29 하승어린이집',
              isSchoolBus: true,
              name: '전포연수어린이집',
              tel: '051-1234-1234',
              homepage: 'https://naver.com',
              type: '공립',
            },
            {
              image: Dummy,
              address: '부산 남구 고동골로60번길 29 하승어린이집',
              isSchoolBus: true,
              name: '전포연수어린이집',
              tel: '051-1234-1234',
              homepage: 'https://naver.com',
              type: '공립',
            },
            {
              image: Dummy,
              address: '부산 남구 고동골로60번길 29 하승어린이집',
              isSchoolBus: true,
              name: '전포연수어린이집',
              tel: '051-1234-1234',
              homepage: 'https://naver.com',
              type: '공립',
            },
            {
              image: Dummy,
              address: '부산 남구 고동골로60번길 29 하승어린이집',
              isSchoolBus: true,
              name: '전포연수어린이집',
              tel: '051-1234-1234',
              homepage: 'https://naver.com',
              type: '공립',
            },
            {
              image: Dummy,
              address: '부산 남구 고동골로60번길 29 하승어린이집',
              isSchoolBus: true,
              name: '전포연수어린이집',
              tel: '051-1234-1234',
              homepage: 'https://naver.com',
              type: '공립',
            },
            {
              image: Dummy,
              address: '부산 남구 고동골로60번길 29 하승어린이집',
              isSchoolBus: true,
              name: '전포연수어린이집',
              tel: '051-1234-1234',
              homepage: 'https://naver.com',
              type: '공립',
            },
          ]}
        />
      </aside>
      <div className="nav-menu">
        <Menu />
      </div>
      {selectCenter > 0 && (
        <DetailCenter
          image={Dummy}
          center={{
            name: '어린이집 명',
            city: '행정 관할구역',
            authorizationDate: '2022-07-18',
            tel: '051-1234-1234',
            operatingTime: '평일 09:00 ~ 17:00',
            address: '어린이집 주소',
            representativeName: '김무무',
            directorName: '김원장',
          }}
          classList={[
            {
              title: '만 0세',
              value: '0명',
            },
            {
              title: '만 1세',
              value: '2명',
            },
            {
              title: '만 2세',
              value: '3명',
            },
            {
              title: '만 3세',
              value: '4명',
            },
          ]}
        />
      )}
      <div id="map" style={{ width: '1480px', height: '100vh' }} />
    </ContainerDiv>
  );
};

export default Map;
