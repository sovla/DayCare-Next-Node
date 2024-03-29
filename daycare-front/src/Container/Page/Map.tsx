/* eslint-disable no-unsafe-optional-chaining */
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
import DetailCenterHeaderImage from '@src/assets/image/NoImage.png';
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
import { useDispatch, useSelector } from 'react-redux';
import { changeError } from '@src/Store/errorState';
import useApi from '@src/CustomHook/useApi';
import {
  centerType,
  getCentersType,
  getSearchCentersType,
} from '@src/Type/API/center';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { objectToQueryString } from '@src/Util';
import { selectUser } from '@src/Store/userState';
import Loading from '@src/Components/Atom/Loading/Loading';

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

  .map-select-center {
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
  @media (max-width: 768px) {
    .map-select-center {
      position: fixed;
      left: 0px;
      top: 0px;
      right: none;
      transform: none;
      z-index: 2500;
      .close-button {
        width: 30px;
        height: 30px;
        right: 20px;
        top: 20px;
        border-radius: 4px;
      }
    }
    #map {
      width: 100vw;
      height: calc(100vh - 55px - 80px);
      margin-top: 55px;
      & > #mapReloadButton {
        position: absolute;
        bottom: calc(30vh);
        left: 50%;
        transform: translate(-50%, 50%);
        cursor: pointer;
        z-index: 1000;
        & > p {
          color: #ffffff;
          font-size: 16px;
        }
      }

      & .map-buttons {
        right: 15px;
        top: 30px;
        & .location-button {
          margin-bottom: 5px;
        }
        & > button:last-of-type {
          width: 40px;
          height: 40px;
          & * {
            width: 30px !important;
            height: 30px !important;
          }
        }
      }
    }
    .main-div {
      position: absolute;

      .search {
        width: 100vw;
        position: relative;
        & > .row-center {
          position: fixed;
          top: 0px;
          left: 0px;
          z-index: 2000;
          background-color: ${Theme.color.yellow_FFE};
        }
        & > div:last-of-type {
          width: 100vw;
          position: fixed;
          bottom: 90px;
          left: 0px;
          display: flex;
          overflow-x: scroll;
          overflow-y: hidden;
          z-index: 2000;
          justify-content: start;
          padding: 0px;
          & > div {
            min-width: 320px;
            margin: 0px calc((100vw - 640px) / 4);
          }
        }
      }
    }
  }
  @media (max-width: 640px) {
    .main-div > .search {
      & > div:last-of-type {
        & > div {
          min-width: 320px;
          margin: 0px calc((100vw - 320px) / 2);
        }
      }
    }
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

  const [isGetCenterLoading, setIsGetCenterLoading] = useState(false);

  const { api: findCentersApi } = useApi<getSearchCentersType>({
    url: '/center',
    method: 'post',
    data: {
      title,
    },
  });

  const user = useSelector(selectUser);
  // 센터 상세정보 받아 올경우 id 값 추가를 위해

  const dispatch = useDispatch();
  const router = useRouter();

  const formRef = useRef<any>();
  // popup 열기 위한 폼

  const initMap = () =>
    // 네이버 맵 만들기
    new naver.maps.Map('map', {
      center: new naver.maps.LatLng(location.lat, location.lon),
      zoom: 14,
    });

  const onClickCenter = useCallback(
    async (id: number) => {
      // 지도위에서 센터를 선택하거나 왼쪽 센터리스트에서 선택한 경우
      API.get(`center/${id}`, {
        params: {
          id: user.auth?.id,
        },
      })
        .then((res) => {
          setSelectCenter(res.data.center);
          // selectCenter를 이용해 상세 페이지 데이터 출력

          router.replace(
            `map?${objectToQueryString({
              ...router.query,
              center: id,
              isReview: false,
            })}`
          );
          // url 변경 center=해당 어린이집 id 값으로
          if (!naverMap) {
            return null;
          }

          naverMap.setCenter(
            new naver.maps.LatLng(+res.data.center.lat, +res.data.center.lon)
          );
          naverMap.setZoom(naverMap.getZoom() < 15 ? naverMap.getZoom() : 15);
          // 맵 가운데로 이동 및 줌 레벨이 15 밑 일 경우 자세한 위치를 위해 15로 고정
        })
        .catch((error) => {
          dispatch(
            changeError({
              errorStatus: error,
              isShow: true,
            })
          );
        });
    },
    [naverMap, router, user.auth]
  );

  const createMarkers = useCallback(
    (centers: centerType[]) => {
      // 마커를 만드는 함수
      if (!naverMap) {
        return;
      }
      // 현재 마커를 담을 변수
      const markers: naver.maps.Marker[] = [];

      for (let index = 0; index < centers.length; index += 1) {
        const center = centers[index];

        const marker = new naver.maps.Marker({
          map: naverMap,
          // 포지션은 center 위도 경도 기준으로
          position: new naver.maps.LatLng(+center.lat, +center.lon),
          // 제목은 센터 이름으로
          title: center.name,
          // 선택가능
          clickable: true,
        });

        // 마커 선택시 나오는 html
        const infowindow = new naver.maps.InfoWindow({
          content: [
            '<div id="marker" style="width:fit-content;padding:10px;background-color:#fff;border:1px solid black"> ',
            `<span class="ico _icon">${center.name}</span>`,
            '<span class="shd"></span>',
            '</div>',
          ].join(''),
        });
        // 마커에 이벤트 속성 걸어주기
        // 표시 - 마우스다운, 마우스 위로 올렸을때, 모바일 환경에서 선택시(click)
        // 삭제 - 마우스 벗어난 경우
        marker.addListener('mousedown', () => {
          infowindow.open(naverMap, marker);
        });
        marker.addListener('mouseover', () => {
          infowindow.open(naverMap, marker);
        });
        marker.addListener('mouseout', () => {
          infowindow.close();
        });
        marker.addListener('click', () => {
          // 선택시 상세 정보 표시
          onClickCenter(center.id);
          if (infowindow.getMap()) {
            infowindow.open(naverMap, marker);
          }
        });
        markers.push(marker);
      }
      setMapMarkers((prev) => {
        prev.forEach((v) => {
          // 이전 마커들 이벤트 해제
          v.clearListeners('click');
          v.clearListeners('mouseout');
          v.clearListeners('mouseover');
          v.clearListeners('mousedown');
          // 많은 마커가 생길경우 성능 이슈로 인한 마커 해제
          v.setMap(null);
        });
        // 새로운 마커들로 상태 바꿔주기
        return markers;
      });
      // 현재 위치 설정
      setLocation({
        lat: naverMap.getCenter().y,
        lon: naverMap.getCenter().x,
      });
    },
    [naverMap, onClickCenter]
  );

  const onClickSearch = useCallback(async () => {
    // 지도에서 이 위치에서 검색 버튼을 눌럿을때
    if (!naverMap) {
      // 네이버 지도가 없는 상태로 전달시 return null;
      return null;
    }
    setIsGetCenterLoading(true);
    await API.get<getCentersType['response']>('center', {
      params: {
        // 필터링 기능 및 지도 가운데 위치 파라미터
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
      .then((response) => {
        // 성공시
        // 어린이집 검색시 해당 주소를 기입해 url 공유시 바로 같은 화면이 보이도록 설정
        router.replace(
          `map?${objectToQueryString({
            ...router.query,
            lat: naverMap.getCenter().y,
            lon: naverMap.getCenter().x,
            isReview: false,
          })}`
        );
        // 센터 리스트
        setCenterList(response.data.center);
        // 마커 만드는 함수에 센터 리스트 파라미터 넘겨주기.
        createMarkers(response.data.center);
      })
      .catch((error) => {
        if (error instanceof TypeError) {
          return;
        }
        // 타입 에러가 아닌 경우 에러 표시
        dispatch(
          changeError({
            errorStatus: error,
            isShow: true,
          })
        );
      })
      .finally(() => {
        setIsGetCenterLoading(false);
      });
  }, [naverMap, onClickCenter, filter, router.query]);

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
    try {
      const response = await findCentersApi();
      if (response.data.statusCode === 200) {
        setCenterList(response.data.center);
        createMarkers(response.data.center);
      }
    } catch (error) {
      dispatch(
        changeError({
          errorStatus: error,
          isShow: true,
        })
      );
    }
  }, [createMarkers, dispatch, findCentersApi]);

  useEffect(() => {
    if (!loading) {
      setNaverMap(initMap());
    }
  }, [loading]);

  useEffect(() => {
    if (router.query.isReview === 'true') {
      const query = router.query as {
        lat: string;
        lon: string;
        isReview: 'true' | 'false';
        center: string;
      };
      if (selectCenter && selectCenter.id === +query.center) {
        return;
      }
      naverMap?.setCenter(new naver.maps.LatLng(+query.lat, +query.lon));
      onClickSearch();
      onClickCenter(+query.center);
    }
  }, [router.query]);

  useEffectOnce(() => {
    // 공유 목적의 UseEffect router.query
    if (naverMap) {
      const query = router.query as {
        lat?: string;
        lon?: string;
      };
      if (query?.lat && query?.lon) {
        naverMap.setCenter(new naver.maps.LatLng(+query.lat, +query.lon));
      }

      onClickSearch();
      return true;
    }
    return false;
  }, [naverMap]);

  useEffectOnce(() => {
    // 공유 목적의 UseEffect
    if (centerList.length && router.query?.center) {
      onClickCenter(+router.query.center);
      return true;
    }
    return false;
  }, [centerList]);

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
      </Head>
      {isGetCenterLoading && <Loading />}
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
                autoComplete: 'none',
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
          <div className="map-select-center">
            <DetailCenter
              key={`DetailCenterId${selectCenter.id}`}
              onClickDetailInformation={onClickDetailInformation}
              image={DetailCenterHeaderImage}
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
                isSave: selectCenter.isLike,
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
