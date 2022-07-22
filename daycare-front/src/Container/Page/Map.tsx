/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
/* eslint-disable operator-linebreak */
/* eslint-disable no-undef */
import Centers from '@src/Components/Template/Map/Centers';
import DetailCenter from '@src/Components/Template/Map/DetailCenter';
import useScript from '@src/CustomHook/useScript';
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
import { changeFilterData, dummyCenter } from '@src/assets/global/Dummy';
import useEffectOnce from '@src/CustomHook/useEffectOnce';
import { useDispatch } from 'react-redux';
import { changeError } from '@src/Store/errorState';
import useApi from '@src/CustomHook/useApi';
import {
  centerType,
  getCentersType,
  getSearchCentersType,
} from '@src/Type/API/center';
import { AxiosResponse } from 'axios';

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

const Map: React.FC = () => {
  const [loading, scriptError] = useScript(
    `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${
      process.env.NAVER_CLIENT_ID ?? 'uwfobz7x24'
    }`
  );
  // use Script -> 스크립트 추가

  const [selectCenter, setSelectCenter] =
    useState<null | typeof dummyCenter>(null);
  // 선택한 센터 정보

  const [centerList, setCenterList] = useState<centerType[]>([]);
  // Side CenterList

  const [location, setLocation] = useState({
    lat: 37.3595704,
    lon: 127.105399,
  });
  // 네이버 맵 가운데 위치

  const [naverMap, setNaverMap] = useState<null | naver.maps.Map>(null);
  // 네이버 맵 지정

  const [mapMarkers, setMapMarkers] = useState<naver.maps.Marker[]>([]);

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
  // 필터 오브젝트

  const [title, setTitle] = useState('');

  const { api: findCentersApi } = useApi<getSearchCentersType>({
    url: '/center',
    method: 'post',
    data: {
      title,
    },
  });

  const dispatch = useDispatch();

  const formRef = useRef<any>();
  // popup 열기 위한 폼

  const initMap = () => {
    // 네이버 맵 만들기
    const map = new naver.maps.Map('map', {
      center: new naver.maps.LatLng(location.lat, location.lon),
      zoom: naverMap?.getZoom() ?? 10,
    });

    // naver.maps.Event.addListener(map, 'zoom_changed', (zoom) => {
    //   // console.log(zoom);
    //       });

    return map;
  };

  const onClickCenter = useCallback(
    async (id: number) => {
      // 지도위에서 센터를 선택하거나 왼쪽 센터리스트에서 선택한 경우
      try {
        API.get(`center/${id}`).then((res) => {
          setSelectCenter(res.data.center);

          const currentMap = naverMap;
          // 파라미터로 맵을 받거나 현재 맵인 경우 센터 가운데로 지정

          if (!currentMap) {
            return null;
          }

          currentMap.setCenter(
            new naver.maps.LatLng(+res.data.center.lat, +res.data.center.lon)
          );
          currentMap.setZoom(
            currentMap.getZoom() > 15 ? currentMap.getZoom() : 15
          );
        });
      } catch (error) {
        dispatch(
          changeError({
            errorStatus: error,
            isShow: true,
          })
        );
      }
    },
    [dispatch, naverMap]
  );

  const createMapAndMarker = useCallback(
    (res: { data: { center: any[] } }) => {
      if (!naverMap) {
        return;
      }
      const markers = [] as naver.maps.Marker[];

      for (let index = 0; index < res.data.center.length; index += 1) {
        const v = res.data.center[index];

        const marker = new naver.maps.Marker({
          map: naverMap,
          position: new naver.maps.LatLng(+v.lat, +v.lng),
          title: v.name,
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
          infowindow.open(naverMap, marker);
        });
        marker.addListener('mouseout', () => {
          infowindow.close();
        });
        marker.addListener('click', () => {
          onClickCenter(v.id);
          if (infowindow.getMap()) {
            infowindow.open(naverMap, marker);
          }
        });
        markers.push(marker);
      }
      setMapMarkers((prev) => {
        prev.forEach((v) => {
          v.clearListeners('click');
          v.clearListeners('mouseout');
          v.clearListeners('mouseover');
          v.setMap(null);
        });
        return markers;
      });
      setLocation({
        lat: naverMap.getCenter().y,
        lon: naverMap.getCenter().x,
      });
    },
    [naverMap, onClickCenter]
  );

  const onClickSearch = useCallback(() => {
    // 지도에서 이 위치에서 검색 버튼을 눌럿을때

    if (!naverMap) {
      return null;
    }

    API.get<getCentersType['response']>('center', {
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
    })
      .then((res) => {
        // 성공시
        // 1. 센터리스트 넣어주기
        // 2. 새로운 네이버 맵에 마커 찍어서 넣어주기
        // 3. 그 마커에 이벤트 걸어주기

        setCenterList(res.data.center);
        createMapAndMarker(res);
      })
      .catch((error) => {
        if (error instanceof TypeError) {
          return;
        }
        dispatch(
          changeError({
            errorStatus: error,
            isShow: true,
          })
        );
      });
  }, [naverMap, onClickCenter, filter]);

  const onClickDetailInformation = useCallback(async () => {
    try {
      let popup;

      const frm = formRef.current; // = document.popfrm;
      if (!frm || !selectCenter || !naverMap) {
        return null;
      }

      if (selectCenter.code.length === 0) {
        throw new Error('해당 어린이집은 상세보기가 지원되지 않습니다.');
      }

      if (selectCenter.code.length === 11) {
        // 어린이집
        frm.target = 'previewPop_unity';
        popup = window.open(
          'http://info.childcare.go.kr/info/pnis/search/preview/SummaryInfoSlPu.jsp',
          'previewPop_unity',
          'toolbar=non, scrollbars=yes, width=810,height=680'
        );
        frm.action =
          'http://info.childcare.go.kr/info/pnis/search/preview/SummaryInfoSlPu.jsp';
        frm.STCODE_POP.value = selectCenter.code;
      } else {
        //  (stcode.length == 10)  // 10자리 ? 유치원
        //   보이기 전 유치원 시스템 점검여부 조회

        popup = window.open(
          'https://e-childschoolinfo.moe.go.kr/presch/preschSumry.do',
          'previewPop_unity_kinder',
          'toolbar=non, scrollbars=yes, width=800,height=680'
        );

        frm.target = 'previewPop_unity_kinder';
        frm.action =
          'https://e-childschoolinfo.moe.go.kr/presch/preschSumry.do';
        frm.pPresch.value = selectCenter.code;
      }

      frm.submit();
      popup?.focus();
    } catch (error) {
      dispatch(
        changeError({
          errorStatus: error,
          isShow: true,
        })
      );
    }
  }, [selectCenter, naverMap, dispatch]);

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
      dispatch(
        changeError({
          errorStatus: new Error('현재 위치가 지원되지 않습니다.'),
          isShow: true,
        })
      );
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

  const onClickInformationSearch = useCallback(async () => {
    const response = await findCentersApi();
    if (response.data.statusCode === 200) {
      setCenterList(response.data.center);
      createMapAndMarker(response);
    }
  }, [findCentersApi]);

  useEffect(() => {
    if (!loading) {
      setNaverMap(initMap());
    }
  }, [loading]);

  useEffectOnce(() => {
    if (naverMap) {
      onClickSearch();
      return true;
    }
    return false;
  }, [naverMap]);

  if (loading || scriptError) {
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
            <Image src={LogoIcon} width={45} height={45} alt="LogoIcon" />
            <Search
              onClick={onClickInformationSearch}
              inputProps={{
                value: title,
                onChange: (e) => setTitle(e.target.value),
                onKeyDown: (e) => {
                  if (e.key === 'Enter') {
                    onClickInformationSearch();
                  }
                },
              }}
            />
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
            onClickCenter={onClickCenter}
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
