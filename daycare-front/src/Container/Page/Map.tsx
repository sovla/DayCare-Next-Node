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
  // use Script -> ???????????? ??????

  const [selectCenter, setSelectCenter] =
    useState<null | typeof dummyCenter>(null);
  // ????????? ?????? ??????

  const [centerList, setCenterList] = useState<centerType[]>([]);
  // Side CenterList

  const [location, setLocation] = useState({
    lat: 37.3595704,
    lon: 127.105399,
  });
  // ????????? ??? ????????? ??????

  const [naverMap, setNaverMap] = useState<null | naver.maps.Map>(null);
  // ????????? ??? ??????

  const [mapMarkers, setMapMarkers] = useState<naver.maps.Marker[]>([]);

  const [isFilter, setIsFilter] = useState(false);
  // ?????? ??????

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
  // ?????? ????????????

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
  // popup ?????? ?????? ???

  const initMap = () => {
    // ????????? ??? ?????????
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
      // ??????????????? ????????? ??????????????? ?????? ????????????????????? ????????? ??????
      try {
        API.get(`center/${id}`).then((res) => {
          setSelectCenter(res.data.center);

          const currentMap = naverMap;
          // ??????????????? ?????? ????????? ?????? ?????? ?????? ?????? ???????????? ??????

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

  const createMarkers = useCallback(
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
          v.clearListeners('mousedown');
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
    // ???????????? ??? ???????????? ?????? ????????? ????????????

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
        // ?????????
        // 1. ??????????????? ????????????
        // 2. ????????? ????????? ?????? ?????? ????????? ????????????
        // 3. ??? ????????? ????????? ????????????

        setCenterList(res.data.center);
        createMarkers(res);
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
        throw new Error('?????? ??????????????? ??????????????? ???????????? ????????????.');
      }

      if (selectCenter.code.length === 11) {
        // ????????????
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
        //  (stcode.length == 10)  // 10?????? ? ?????????
        //   ????????? ??? ????????? ????????? ???????????? ??????

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
          errorStatus: new Error('?????? ????????? ???????????? ????????????.'),
          isShow: true,
        })
      );
    }
    (() => {
      if (navigator.geolocation) {
        /**
         * navigator.geolocation ??? Chrome 50 ?????? ????????? HTTP ???????????? ????????? Deprecate ?????? HTTPS ??????????????? ?????? ?????? ?????????
         * http://localhost ????????? ????????? ????????????, ????????? ????????????, Chrome ??? ??????????????? ???????????? ????????? ?????? ???????????? ????????? ???????????????.
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
      createMarkers(response);
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
              isSchoolBus: v.school_vehicle === '??????',
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
                  title: '??? 0???',
                  value: `${selectCenter.child_count_age0}???`,
                },
                {
                  title: '??? 1???',
                  value: `${selectCenter.child_count_age1}???`,
                },
                {
                  title: '??? 2???',
                  value: `${selectCenter.child_count_age2}???`,
                },
                {
                  title: '??? 3???',
                  value: `${selectCenter.child_count_age3}???`,
                },
                {
                  title: '??? 4???',
                  value: `${selectCenter.child_count_age4}???`,
                },
                {
                  title: '??? 5???',
                  value: `${selectCenter.child_count_age5}???`,
                },
                {
                  title: '??? 6???',
                  value: `${selectCenter.child_count_age6}???`,
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
          <p>??? ???????????? ??????</p>
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
