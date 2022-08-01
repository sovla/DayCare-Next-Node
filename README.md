
<div align=center><h1> DayCare-Center - 개인프로젝트</h1></div>

안녕하세요 웹 개발자를 지망하는 김준한입니다. 제 포트폴리오를 보러 와주셔서 감사드립니다. 제가 만든 포트폴리오는 게시판 기반 포트폴리오 입니다. 게시판 기반 포트폴리오를 만든 이유는 모든 기능이 CRUD 응용이라는 점과 기본 소양이 게시판이라고 생각하기 때문입니다. 게시판 기반 포트폴리오를 제작해보면서 기본기에 충실하고 싶었기 때문에 게시판 기반 포트폴리오를 제작하게 되었습니다.

포트폴리오 소개는 기능 별로 묶어서 설명 드리려고 합니다.

그럼 지금부터 포트폴리오 소개를 시작 하겠습니다.

## 주요 구현 기능
- 네이버 지도
- 네이버 지도 마커
- 지도 기준 어린이집 찾기
- 필터링 기능
- 내 위치 찾기
- 어린이집 선택
- 로그인
- 회원가입
- 회원정보수정
- 게시판 CRUD
- 게시글 좋아요 기능
- 댓글 CRUD
- 유저 게시글 리스트
- 페이징
- 검색기능

<div align=center><h2>개발 환경</h2></div>

| 개발 환경 분류 | 사용 기술 | 비고 |
| --- | --- | --- |
| Develop Tools | Visual Studio Code v1.69.2 MySQLWorkbench v8.0 | - |
| Front End | HTML5 React v18.2.0 Next v12.2.0 TypeScript v4.7.4 | - |
| Back End | NodeJS v14.17.3 NestJs v8.0.0  TypeORM v0.3.7 TypeScript v4.7.4 | - |
| Data Base | MySQL v8.0 | - |
| Server | Nginx v1.22.0 Node.JS v14.17.3 | - |

<div align=center><h2>프로젝트 구조</h2>

<img src="https://user-images.githubusercontent.com/41351496/182100371-308f8f6a-aafb-4b57-94aa-dae80097f82c.png" alt="프론트엔드구조" align="center" />
<img src="https://user-images.githubusercontent.com/41351496/182099907-51a5aa7d-97fa-4c09-bc09-98bec95778cf.png" alt="백엔드구조" align="center" />

</div>

<div align="center" style="margin:0 10%;"><h2>ERD</h2>

![](https://velog.velcdn.com/images/gavri/post/bc28bcf1-88be-4503-8e11-0aa18d3fd46a/image.png)
</div>
<div align="center" ><h2>네이버 지도 마커 표시</h2></div>
<div align="center" ><p>네이버 지도 마커 표시의 경우 API 통신하는 함수와 마커 찍는 함수를 별도로 구성해 1함수 1액션원칙을 지켰습니다.<p></div>

```
const onClickSearch = useCallback(() => {
    // 지도에서 이 위치에서 검색 버튼을 눌럿을때
    if (!naverMap) {
      // 네이버 지도가 없는 상태로 전달시 return null;
      return null;
    }

    API.get<getCentersType['response']>('center', {
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
      });
  }, [naverMap, onClickCenter, filter, router.query]);
```
마커 표시용 함수
```
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

```

