/* eslint-disable consistent-return */
/* eslint-disable operator-linebreak */
/* eslint-disable no-undef */
import Centers from '@src/Components/Template/Map/Centers';
import DetailCenter from '@src/Components/Template/Map/DetailCenter';
import useScript from '@src/Util/useScript';
import Head from 'next/head';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import NoImage from '@src/assets/image/NoImage.png';
import Search from '@src/Components/Atom/Input/Search';
import Image from 'next/image';
import LogoIcon from '@src/assets/image/LogoIcon.png';
import FilterIcon from '@src/assets/image/FilterIcon.png';
import LocationIcon from '@src/assets/image/LocationIcon.png';

import Menu from '@src/Components/Template/Layout/Menu';
import API from '@src/API';
import Theme from '@src/assets/global/Theme';
import IconButton from '@src/Components/Atom/Button/IconButton';
import Filter from '@src/Components/Template/Modal/Filter';
import { filterType } from '@src/Type/Template/Modal';
import { changeFilterData } from '@src/assets/global/Dummy';

const ContainerDiv = styled.div`
  display: flex;
  position: relative;
  .search {
    padding-top: 10px;
    width: 440px;
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
  .select-center {
    background-color: #ffffff;
    position: absolute;
    right: 0px;
    top: 0px;
    transform: translateX(100%);
    z-index: 1000;
  }
  .close-button {
    width: 50px;
    height: 50px;
    background-color: #fff;
    position: absolute;
    right: -80px;
    top: 20px;
    z-index: 5;
    font-size: 30px;
    font-weight: bold;
    &:hover {
      cursor: pointer;
    }
  }
  #map {
    width: 1480px;
    height: 100vh;
    & > #mapReloadButton {
      position: absolute;
      bottom: 100px;
      left: 50%;
      transform: translateX(-50%);
      padding: 10px 20px;

      background-color: ${Theme.color.yellow_FF};
      border-radius: 16px;
      cursor: pointer;
      z-index: 1000;
      & > p {
        color: #ffffff;
        font-size: 24px;
      }
    }
    & > .map-center {
      position: absolute;
      bottom: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1000;
    }
    & .map-buttons {
      position: absolute;
      right: 15px;
      bottom: 50px;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      align-items: center;
      & .location-button {
        background-color: #ffffff;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 16px;
        margin-bottom: 10px;
        transition: 0.3s;
        cursor: pointer;
        &:hover {
          opacity: 0.7;
        }
      }
    }
  }
  .main-div {
    position: relative;
  }
`;

export const dummyCenter = {
  abolition_date: null,
  accreditation: '',
  address_detail: '서울특별시 서초구 청계산로11길 7-12 708동 1층',
  address_number: '06802',
  authorization_date: '2013-09-30T15:00:00.000Z',
  cctv_count: 0,
  certification: null,
  characteristics: '',
  child_count: 0,
  child_count_age0: 0,
  child_count_age1: 0,
  child_count_age2: 0,
  child_count_age3: 0,
  child_count_age4: 0,
  child_count_age5: 0,
  child_count_age6: 0,
  child_count_age7: 0,
  city: '서울특별시',
  city_detail: '서초구',
  city_dong: '',
  city_scale: '',
  class_count: 0,
  class_count0: 0,
  class_count1: 0,
  class_count2: 0,
  class_count3: 0,
  class_count4: 0,
  class_count5: 0,
  class_count_mix2: 0,
  class_count_mix5: 0,
  class_count_special: 0,
  code: '',
  consignment_name: '',
  consignment_status: '',
  consignment_type: '',
  director_name: '',
  employee_count: 0,
  employee_count0: 0,
  employee_count1: 0,
  employee_count2: 0,
  employee_count4: 0,
  employee_count6: 0,
  employee_count_cook: 0,
  employee_count_cure: 0,
  employee_count_director: 0,
  employee_count_nurse: 0,
  employee_count_nursery: 0,
  employee_count_nursingassistant: 0,
  employee_count_nutritionist: 0,
  employee_count_officeworker: 0,
  employee_count_other: 0,
  employee_count_special: 0,
  fax: '02-572-2030',
  homepage: 'http://cafe.naver.com/foresta7',
  id: 4458,
  impaired_after_child_count: 0,
  impaired_after_count: 0,
  impaired_allday_child_count: 0,
  impaired_allday_count: 0,
  impaired_child_count: 0,
  impaired_extension_child_count: 0,
  impaired_holiday_child_count: 0,
  infant_child_count: 0,
  insurance_compensation: null,
  insurance_detriment: null,
  insurance_fire: null,
  lat: '37.44401897798263',
  lon: '127.06217099875766',
  name: '서초구립 포레스타7단지어린이집',
  normal_after_child_count: 0,
  normal_child_count_age0: 0,
  normal_child_count_age1: 0,
  normal_child_count_age2: 0,
  normal_child_count_age3: 0,
  normal_child_count_age4: 0,
  normal_child_count_mix01: 0,
  normal_child_count_mix12: 0,
  normal_child_count_mix23: 0,
  normal_child_count_mix34: 0,
  normal_holiday_child_count: 0,
  nuri_impaired_count: 0,
  nursery_count: '4',
  nursery_roomarea: '197',
  operation_status: '정상',
  playground_count: 0,
  property_after: '',
  property_after_combine: '',
  property_allday: '',
  property_holiday: '',
  property_impaired: '',
  property_impaired_combine: '',
  property_infants: '',
  property_normal: '',
  property_time_extension: '',
  representative_name: '',
  rest_end_date: null,
  rest_start_date: null,
  school_vehicle: '미운영',
  server_date: '2022-07-08 10:48:35',
  service: '',
  student_count: 26,
  student_max: 42,
  support: '',
  teaching_staff_count: 9,
  tel: '070-7204-2030',
  type: '국공립',
};

const Map: React.FC = () => {
  const [loading, error] = useScript(
    `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${
      process.env.NAVER_CLIENT_ID ?? 'uwfobz7x24'
    }`
  );
  // use Script -> 스크립트 추가

  const [selectCenter, setSelectCenter] =
    useState<null | typeof dummyCenter>(null);
  // 선택한 센터 정보

  const [centerList, setCenterList] = useState<
    {
      homepage: string;
      address_detail: string;
      tel: string;
      name: string;
      image: string;
      lat: string;
      lon: string;
      school_vehicle: '운영' | '미운영';
      type: string;
      id: number;
    }[]
  >([]);
  // Side CenterList

  const [location, setLocation] = useState({
    lat: 37.3595704,
    lon: 127.105399,
  });
  // 네이버 맵 가운데 위치

  const [naverMap, setNaverMap] = useState<null | naver.maps.Map>(null);
  // 네이버 맵 지정

  const [isFilter, setIsFilter] = useState(false);
  // 필터 모달

  const [filter, setFilter] = useState<filterType>({
    characteristic: [],
    city: null,
    cityDetail: null,
    classType: [],
    employee: [],
    employeeCount: null,
    personnel: null,
    type: [],
  });

  const formRef = useRef<any>();
  // popup 열기 위한 폼

  const initMap = () => {
    // 네이버 맵 만들기
    const mapOptions = {
      center: new naver.maps.LatLng(location.lat, location.lon),
      zoom: naverMap?.getZoom() ?? 10,
    };
    // 관련 설정

    const map = new naver.maps.Map('map', mapOptions);

    naver.maps.Event.addListener(map, 'zoom_changed', (zoom) => {
      // console.log(zoom);
    });

    return map;
  };

  const onClickCenter = useCallback(
    async (id: number, map?: naver.maps.Map | null) => {
      API.get(`center/${id}`).then((res) => {
        setSelectCenter(res.data.center);
        if (map) {
          map?.setCenter(
            new naver.maps.LatLng(+res.data.center.lat, +res.data.center.lon)
          );
          map?.setZoom(map?.getZoom() > 15 ? map?.getZoom() : 15);
        } else {
          naverMap?.setCenter(
            new naver.maps.LatLng(+res.data.center.lat, +res.data.center.lon)
          );
          naverMap?.setZoom(
            naverMap?.getZoom() > 15 ? naverMap?.getZoom() : 15
          );
        }
      });
    },
    [naverMap]
  );

  const onClickSearch = useCallback(() => {
    if (!naverMap) {
      return null;
    }
    // console.log(filter);
    API.get('center', {
      params: {
        lon: naverMap.getCenter().x,
        lat: naverMap.getCenter().y,
        type: filter?.type?.join(','),
        city: filter?.city,
        city_detail: filter?.cityDetail,
        max: filter?.personnel,
        employee: filter.employee.map(changeFilterData).join(','),
        empty_class: filter.classType.map(changeFilterData).join(','),
        property: filter.characteristic.map(changeFilterData).join(','),
        employee_count: filter.employeeCount,
        radius: 500,
      },
    }).then((res) => {
      // console.log(res.data.center);
      setCenterList(res.data.center);

      const mapOptions = {
        center: naverMap.getCenter(),
        zoom: naverMap?.getZoom() ?? 10,
      };

      const map = new naver.maps.Map('map', mapOptions);

      const markers = [];
      for (let index = 0; index < res.data.center.length; index += 1) {
        const v = res.data.center[index];
        const marker = new naver.maps.Marker({
          map,
          position: new naver.maps.LatLng(+v.lat, +v.lng),
          title: v.name,
          // icon: {
          //   content: ,
          // },
          clickable: true,
        });
        const infowindow = new naver.maps.InfoWindow({
          content: [
            `<div id="marker" defaultValue="${v.id}" style="width:fit-content;padding:10px;background-color:#fff;border:1px solid black"> `,
            `<span class="ico _icon">${v.name}</span>`,
            '<span class="shd"></span>',
            '</div>',
          ].join(''),
        });
        marker.addListener('mouseover', () => {
          infowindow.open(map, marker);
        });
        marker.addListener('mouseout', () => {
          infowindow.close();
        });
        marker.addListener('click', () => {
          onClickCenter(v.id);
          if (infowindow.getMap()) {
            infowindow.open(map, marker);
          }
        });

        markers.push(marker);
      }
      setNaverMap(map);
      setLocation({
        lat: naverMap.getCenter().y,
        lon: naverMap.getCenter().x,
      });
    });
  }, [centerList, naverMap, onClickCenter, filter]);

  const onClickDetailInformation = useCallback(async () => {
    let popup;

    const frm = formRef.current; // = document.popfrm;
    if (!frm || !selectCenter || !naverMap) {
      return null;
    }

    // 정부 API - 상세 id 받아오기
    const formData = new FormData();

    formData.append('latitude', `${selectCenter.lat}`);
    formData.append('longitude', `${selectCenter.lon}`);
    formData.append('distance', '1000');

    const response = await API.post(
      'https://e-childschoolinfo.moe.go.kr/kinderMt/kinderLocalFind.do',
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      }
    );
    console.log(response.data);
    // 위도 경도 기준 찾아오기
    let findCenter = response.data.find(
      (v: { latitude: number; longitude: number }) =>
        +v.latitude === +selectCenter.lat && +v.longitude === +selectCenter.lon
    );
    if (!findCenter) {
      // 경도 위도 기준으로 없을경우 이름 또는 주소명 기준으로
      findCenter = response.data.find(
        (v: { name: string; roadAddress: string }) =>
          v.name === selectCenter.name ||
          v.roadAddress === selectCenter.address_detail
      );
    }
    let stcode = '';
    if (Array.isArray(response.data) && findCenter) {
      stcode = findCenter.id;
    }

    if (stcode.length === 11) {
      // 어린이집
      frm.target = 'previewPop_unity';
      popup = window.open(
        'http://info.childcare.go.kr/info/pnis/search/preview/SummaryInfoSlPu.jsp',
        'previewPop_unity',
        'toolbar=non, scrollbars=yes, width=810,height=680'
      );
      frm.action =
        'http://info.childcare.go.kr/info/pnis/search/preview/SummaryInfoSlPu.jsp';
      frm.STCODE_POP.value = stcode;
    } else {
      //  (stcode.length == 10)  // 10자리 ? 유치원
      // 보이기 전 유치원 시스템 점검여부 조회

      popup = window.open(
        'https://e-childschoolinfo.moe.go.kr/presch/preschSumry.do',
        'previewPop_unity_kinder',
        'toolbar=non, scrollbars=yes, width=800,height=680'
      );

      frm.target = 'previewPop_unity_kinder';
      frm.action = 'https://e-childschoolinfo.moe.go.kr/presch/preschSumry.do';
      frm.pPresch.value = stcode;
    }

    frm.submit();
    popup?.focus();
  }, [selectCenter, naverMap]);

  const getLocation = useCallback(() => {
    function onSuccessGeolocation(position: {
      coords: {
        latitude: number;
        longitude: number;
      };
    }) {
      setLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
      if (naverMap) {
        naverMap.setCenter(
          new naver.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          )
        );
        onClickSearch();
      }
    }

    function onErrorGeolocation() {
      // console.log('error');
    }
    (() => {
      if (navigator.geolocation) {
        /**
         * navigator.geolocation 은 Chrome 50 버젼 이후로 HTTP 환경에서 사용이 Deprecate 되어 HTTPS 환경에서만 사용 가능 합니다
         * http://localhost 에서는 사용이 가능하며, 테스트 목적으로, Chrome 의 바로가기를 만들어서 아래와 같이 설정하면 접속은 가능합니다.
         * chrome.exe --unsafely-treat-insecure-origin-as-secure="http://example.com"
         */
        navigator.geolocation.getCurrentPosition(
          onSuccessGeolocation,
          onErrorGeolocation
        );
      }
    })();
  }, [naverMap, onClickSearch]);

  useEffect(() => {
    // initMap();
    if (!loading) {
      setNaverMap(initMap());
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
        <script
          src="https://code.jquery.com/jquery-3.6.0.slim.min.js"
          integrity="sha256-u7e5khyithlIdTpu22PHhENmPcRdFiHRjhAuHcs05RI="
          crossOrigin="anonymous"
          async
        />
        <script src="/js/MarketClustering.js" async />
      </Head>
      <div className="main-div">
        <aside className="search">
          <div className="row-center">
            <Image src={LogoIcon} width={45} height={45} />
            <Search onClick={() => console.log('검색')} inputProps={{}} />
          </div>
          <Centers
            centerList={centerList.map((v) => ({
              address: v.address_detail,
              image: '',
              isSchoolBus: v.school_vehicle === '운영',
              name: v.name,
              tel: v.tel,
              type: v.type,
              homepage: v.homepage,
              id: v.id,
            }))}
            selectCenter={selectCenter}
            onClickCenter={(id) => onClickCenter(id, naverMap)}
          />
        </aside>
        {selectCenter && (
          <div className="select-center">
            <DetailCenter
              onClickDetailInformation={onClickDetailInformation}
              image={NoImage}
              center={{
                name: selectCenter.name,
                city: selectCenter.city_dong,
                authorizationDate: new Date(selectCenter.authorization_date)
                  .toISOString()
                  .substring(0, 10),
                tel: selectCenter.tel,
                operatingTime: selectCenter.operation_status,
                address: selectCenter.address_detail,
                representativeName: selectCenter.representative_name,
                directorName: selectCenter.director_name,
                id: selectCenter.id,
              }}
              classList={[
                {
                  title: '만 0세',
                  value: `${selectCenter.child_count_age0}명`,
                },
                {
                  title: '만 1세',
                  value: `${selectCenter.child_count_age1}명`,
                },
                {
                  title: '만 2세',
                  value: `${selectCenter.child_count_age2}명`,
                },
                {
                  title: '만 3세',
                  value: `${selectCenter.child_count_age3}명`,
                },
                {
                  title: '만 4세',
                  value: `${selectCenter.child_count_age4}명`,
                },
                {
                  title: '만 5세',
                  value: `${selectCenter.child_count_age5}명`,
                },
                {
                  title: '만 6세',
                  value: `${selectCenter.child_count_age6}명`,
                },
              ]}
            />
            <button
              onClick={() => setSelectCenter(null)}
              type="button"
              className="close-button"
            >
              X
            </button>
          </div>
        )}
      </div>
      <div className="nav-menu">
        <Menu />
      </div>
      <div id="map">
        <div className="map-center">
          <Image src={LogoIcon} width={22} height={22} alt="LogoIcon" />
        </div>
        <button id="mapReloadButton" type="button" onClick={onClickSearch}>
          <p>이 위치에서 검색</p>
        </button>
        <div className="map-buttons">
          <button
            type="button"
            className="location-button"
            onClick={getLocation}
          >
            <Image
              src={LocationIcon}
              width={30}
              height={30}
              alt="LocationIcon"
            />
          </button>
          <IconButton
            image={FilterIcon}
            buttonProps={{ onClick: () => setIsFilter(true) }}
          />
        </div>
      </div>
      <form
        id="popfrm"
        ref={formRef}
        name="popfrm"
        method="post"
        style={{ display: 'none' }}
      >
        <input type="hidden" id="flag" name="flag" value="YJ" />
        <input type="hidden" id="STCODE_POP" name="STCODE_POP" value="" />
        <input type="hidden" id="pPresch" name="pPresch" value="" />
      </form>
      {isFilter && (
        <Filter
          isShow={isFilter}
          setIsShow={setIsFilter}
          returnFilter={(value) => {
            setIsFilter(false);
            setFilter(value);
          }}
          filter={filter}
        />
      )}
    </ContainerDiv>
  );
};

export default Map;
