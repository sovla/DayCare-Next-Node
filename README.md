
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
<div align="center" ><h2>로그인</h2></div>
로그인 기능에선 유효성 검사와 아이디 패스워드가 일치하지 않을시 별도의 문구를 출력하였습니다.

```TypeScript


  const loginApiHandle = useCallback(async () => {
    try {
      if (!RegExp.isEmail(email)) {
        // RegExp 클래스 : 정규식 또는 문자열 수 등을 테스트해 결과에 맞으면 true 틀리면 false를 리턴
        throw new Error('이메일 형식이 아닙니다.');
      }
      if (!RegExp.stringLength(password, 6, 20)) {
        throw new Error('비밀번호는 6 ~ 20자 이내로 입력해주세요.');
      }
      const response = await loginApi();
      if (response.data.statusCode === 200) {
        //  로그인성공

        dispatch(changeUser(response.data.user));
      }
    } catch (error) {
      dispatch(
        changeError({
          errorStatus: error,
          isShow: true,
        })
      );
    }
  }, [email, password]);
```
RegExp 클래스를 만들어 정규식 및 문자열 길이에 관한 메소드를 선언 해 사용했습니다.

로그인시 이메일, 패스워드가 정한 규칙에 맞는지 확인한 후 맞지 않을 경우 전역 error 상태를 변경하여 에러가 발생하도록 하였습니다.

로그인 성공의 경우 전역 user 상태를 변경하여 유저 권한이 필요한 페이지에서 분별할 수 있도록 하였습니다.

```TypeScript

const useApi = <T extends APIType>({
  url,
  data,
  method,
}: {
  url: T['url'];
  data: T['request'];
  method: T['method'];
}) => {
  //  공통적인 api를 핸들링하기 위한 훅
  const [isLoading, setIsLoading] = useState(false);

  const api = useCallback(
    async (optionalData?: Partial<T['request']>) => {
      // Partial 유틸타입의 경우 기존 T["request"] 타입 전체를 옵셔널로 받게 됩니다.
      // optionalData 를 통해 별도의 데이터를 합쳐 API 요청을 합니다.
      setIsLoading(true);
      const requestData = {
        ...data,
        ...optionalData,
      };
      const response = (await API({
        //  method = "Post" | "Get" ...
        method,
        //  Data의 경우 get이 아닌 경우에만 추가하도록 하였습니다.
        data: method !== 'get' ? requestData : null,
        url,
        //  파라미터의 경우 get 메소드인 경우 추가하도록 하였습니다.
        params: method === 'get' ? requestData : null,
      })) as AxiosResponse<T['response'], T['request']>;
      setIsLoading(false);
      return response;
    },
    [data, method, url]
  );

  return { isLoading, api };
};

interface sessionLoginType extends APIType {
  url: '/session';
  method: 'post';
  request: {
    email: string;
    password: string;
  };
  response: {
    statusCode: 200 | 400 | 401 | 403;
    message: string;
    user: {
      id: number;
      email: string;
      name: string;
    };
  };
}

const { api: loginApi } = useApi<sessionLoginType>({
    url: '/session',
    data: {
      email,
      password,
    },
    method: 'post',
  });

```
공통적인 기능인 API 호출을 커스텀 훅을 통해 중복되던 코드를 제거했습니다.

TypeScript 제네릭을 이용하여 APIType을 상속한 타입을 넣게 만들어 필수 파라미터, API 호출시 리턴 되는 값, url, method를 지정하여 잘못된 데이터가 들어가지 않도록 방지하였습니다.


```TypeScript
// Controller
@Post()
  async login(
    @Res() res: Response,
    @Body() loginDto: LoginDTO,
  ) {
 const findUser = await this.sessionService.login(loginDto);

    const accessToken = this.jwtService.sign({
      // 필요한 정보만 sign하여 보내기
      id: findUser.id,
      name: findUser.name,
      email: findUser.email,
    });

    res.statusCode = 200;
    res.setHeader('access-control-expose-headers', 'Set-Cookie');
    // JWT Token 을 cookie 저장하기 위해
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    // credentials 옵션
    // - same-origin: 같은 출처간 요청에만 인증정보를 담을 수 있다
    // - include : 모든 요청에 인증정보를 담을 수 있다.
    // - omit : 모든 요청에 인증 정보를 담지 않는다
    // 자격 증명 모드 include에 해당 하며 Access-Control-Allow-Credentials = true
    // Access-Control-Allow-Origin !== "*" 와일드 카드가 아니여야 서버에서 보내는 쿠키를 저장할 수 있다.

    res.cookie('jwt', accessToken, {
      httpOnly: true,
      // httpOnly 속성의 경우 자바스크립트 속성에서 접근이 불가하다.
      maxAge: 24 * 60 * 60 * 1000,
      // 24hours
    });
    return res.send({
      statusCode: res.statusCode,
      message: `${findUser.name}님 로그인 성공하셨습니다.`,
      user: {
        id: findUser.id,
        name: findUser.name,
        email: findUser.email,
      },
    });
  }

// Service
 async login(loginDto: LoginDTO) {
    const findUser = await this.userRepository.findOne({
      where: {
        email: loginDto.email,
      },
    });
    if (!findUser) {
      throw new HttpException('아이디와 비밀번호를 확인해주세요.', 401);
    }
    const validatePassword = await bcrypt.compare(
      // 암호화한 비밀번호와 대조
      loginDto.password,
      findUser.password,
    );

    if (!validatePassword) {
      throw new HttpException('비밀번호가 틀립니다.', 401);
    }

    return findUser;
  }
```
로그인시 Email로 유저를 검색하고 암호화한 password 와 dto에 담겨진 password를 대조하여 일치하는지 판단하였습니다.

JWT 토큰 발급의 경우 httpOnly 쿠키에 저장하여 JavaScript에서 참조하지 못하도록 하였습니다. 그리고 유저 권한이 필요한 API를 호출 할때 해당 쿠키를 읽어와 JWT 검사를 통해 사인한 쿠키가 맞는지 확인하는 절차를 거쳤습니다.

<div align="center" ><h2>회원가입</h2></div>
회원가입은 기본적인 사용자 정보(이름, 이메일, 패스워드)로 가입이 이루어지며 이메일 중복 체크 및 이메일 인증코드를 활용해 본인 메일만 가입 가능하도록 설정하였습니다(SMTP활용).


```TypeScript
const onClickSignUpHandle: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(
      async (e) => {
        //  회원가입 API 핸들러
        e.preventDefault();

        try {
          if (!RegExp.stringLength(name, 2, 20)) {
            throw new Error('이름은 2 ~ 20자 이내로 입력해주세요.');
          }
          if (!RegExp.stringLength(password, 6, 20)) {
            throw new Error('비밀번호는 6 ~ 20자 이내로 입력해주세요.');
          }

          if (!RegExp.isEmail(email)) {
            throw new Error('이메일 형식이 아닙니다.');
          }

          if (verificationCode.length !== 6) {
            throw new Error('인증코드는 6자리입니다.');
          }

          const response = await signUpApi();
          if (response.data.statusCode === 200) {
            //  회원가입 성공시 바로 로그인 되도록 전역 user 상태 변경
            dispatch(changeUser(response.data.user));
          }
        } catch (error) {
          // 에러 발생 시 전역 error 상태를 변경
          dispatch(
            changeError({
              errorStatus: error,
              isShow: true,
            })
          );
        }
      },
      [email, name, password, verificationCode]
    );

 const { api: signUpApi } = useApi<userSignUpType>({
    url: '/user',
    data: {
      email,
      name,
      password,
      verificationCode,
    },
    method: 'post',
  });
```


```TypeScript
@Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    // 회원가입
    const insertData = await this.userService.create(createUserDto);

    if (!insertData) {
      throw new HttpException('회원가입에 실패하셨습니다', 400);
    }
    const accessToken = this.jwtService.sign({
      // JWT 토큰 사인
      id: insertData.id,
      name: insertData.name,
      email: insertData.email,
    });

    res.statusCode = 200;
    res.cookie('jwt', accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24hours
    });
    return res.send({
      statusCode: res.statusCode,
      message: `${insertData.name}님의 회원가입에 성공하였습니다.`,
      user: {
        id: insertData.id,
        name: insertData.name,
        email: insertData.email,
      },
    });
  }
```
로그인 과 마찬가지로 회원가입에 성공하였을 경우 사인한 JWT토큰은 httpOnly 쿠키에 저장해 보낸다.

```ts
async create(createUserDto: CreateUserDto) {
    const userFind: User = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (userFind) {
      throw new HttpException(
        '이미 사용중인 Email입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const privateUser = await this.transformPassword(createUserDto);

    const verificationCode = await this.cacheManager.get(createUserDto.email);
    if (!verificationCode) {
      throw new HttpException(
        '이메일 중복체크 및 인증코드가 발급되지 않았습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (verificationCode !== createUserDto.verificationCode) {
      throw new HttpException(
        '이메일 인증코드가 맞지 않습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const insertData = await this.userRepository.save({
      email: privateUser.email,
      name: privateUser.name,
      password: privateUser.password,
    });

    return insertData;
  }

  async transformPassword(user: CreateUserDto): Promise<CreateUserDto> {
    user.password = await bcrypt.hash(user.password, 10);
    // 해싱이란 특정 알고리즘을 통해 인간이 해독하지 못하는 문자열로 변형
    // 해싱 특징
    // 1. 단방향이다. 되돌릴 수 없다
    // 2. 동일한 입력값 동일한 출력 값을 갖는다
    // 3. 입력값의 일부만 변경되어도 전혀 다른 출력값을 갖는다
    // ++ 이러한 특징에 Salt라는 랜덤한 값을 추가해 보안을 강화한다
    // bcrypt.hash(문자열,Salt문자열 길이)
    return user;
  }
```
회원 가입시 이미 사용중인 이메일, 이메일 인증 코드가 맞지 않을경우, 이메일 중복체크 및 인증코드 발송을 하지 않은 경우 에러를 발생시켰습니다.

비밀번호의 경우 해싱을 통해 보안을 강화 하였습니다.

```ts
async verifyEmail(email: string) {
    // 이메일 중복 확인 및 인증코드 발송 
    const findUser = await this.userRepository.findOne({
      where: { email: email },
    });

    if (findUser) {
      throw new HttpException(
        '이미 사용중인 email입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const transporter = nodemailer.createTransport({
      // 사용하고자 하는 서비스, gmail계정으로 전송할 예정이기에 'gmail'
      service: 'gmail',
      // host를 gmail로 설정
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        // Gmail 주소 입력,
        user: process.env.NODEMAILER_USER,
        // Gmail 패스워드 입력
        pass: process.env.NODEMAILER_PASS,
      },
    });
    const random: string = (Math.random() * 900000 + 100000).toFixed();
    // 6자리 임의의 값
    await transporter.sendMail({
      from: `"DayCare " <${process.env.NODEMAILER_USER}>`,
      // 보내는 곳의 이름과, 메일 주소를 입력
      to: email,
      // 받는 곳의 메일 주소를 입력
      subject: 'DayCare 메일 인증 요청입니다.',
      // 보내는 메일의 제목을 입력
      html: `<p>인증번호 : [<b>${random}</b>]</p>`,
      // html: html로 작성된 내용
    });

    this.cacheManager.set(email, random, { ttl: 300 });
    // 이메일 인증코드 캐시에 저장 300초 default 의 경우 5초

    return random;
  }
```
이메일 중복 체크시 이메일이 DB에서 조회 될 경우 에러를 발생 시켰습니다.

Nest 자체에서 지원하는 CacheManager을 활용해 이메일 인증코드를 저장하여 사용했습니다.


<div align="center" ><h2>네이버 지도 마커 표시</h2></div>
네이버 지도 가운데 기준으로 위도 경도를 받아와 필터링을 거쳐 거리순으로 어린이집이 나타나도록 하였습니다.


```TypeScript
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
API를 통해 위치 기준으로 어린이집 배열을 받아온뒤 url을 현재 위치에 맞게 변경 해줍니다. 

(ex: daycare-center.shop?lat=37&lon=127) 해당 URL의 경우 공유시 선택한 위치를 기준으로 바로 보이게끔 작업 했습니다.

그리고 어린이집 배열을 상태에 저장해주고 네이버 지도 마커를 그리는 함수에 파라미터로 전달합니다.

```TypeScript
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
마커를 생성하고 해당 마커에 이벤트를 걸어 원하는 html 태그 혹은 함수를 실행하도록 하고 있습니다.

그리고 많은 마커가 지도에 생길 경우 성능상의 이슈가 생겨 이전 마커는 제거 및 이벤트를 해제 해주었습니다.

```ts
 @Get()
  async findCentersByLocation(
    @Query() findFilterDto: FindFilterDTO,
    @Res() res: Response,
  ) {
    const findCenters = await this.centerService.findCentersByLocation(
      findFilterDto,
    );

    res.statusCode = 200;

    return res.send({
      statusCode: res.statusCode,
      message: '정보 받아오기 완료',
      center: findCenters,
    });
  }
```
컨트롤러 부분은 @Query를 이용해 쿼리스트링으로 넘어온 값들을 받았으며 해당 값을 service로 넘겨주었습니다.

```ts
 async findCentersByLocation(dto: FindFilterDTO) {
    // type property employee empty_class 의 경우 "a,b,c" 이런식으로 값을 전달
    const type = dto?.type?.length && dto.type.split(',');
    const property = dto?.property?.length && dto.property.split(',');
    const employee = dto?.employee?.length && dto.employee.split(',');
    const empty_class = dto?.empty_class?.length && dto.empty_class.split(',');
    // 빈 문자열에 .split(",") 메소드를 하여도 []배열로 들어와 해당 방식으로 코딩 하였습니다.

    const findCenterList = this.centerRepository
      .createQueryBuilder('center')
      // 필요한 값만 select
      .select('homepage,address,tel,name,lat,lng,school_vehicle,type,id')
      // 현재 위치 기준으로 전체 거리 값을 계산해 distance로 select
      .addSelect(
        `6371 * acos(cos(radians(${dto.lat})) * cos(radians(lat)) * cos(radians(lon) - radians(${dto.lon})) + sin(radians(${dto.lat})) * sin(radians(lat)))`,
        'distance',
      )
      .where('operation_status != "폐지"') // 폐지가 아닌경우
      .andWhere(`city Like '%${dto?.city ?? ''}%'`) // city 값이 없을경우 전체 검색
      .andWhere(`city_detail Like '%${dto?.city_detail ?? ''}%'`) // city_detail 값이 없을경우 전체 검색
      .andWhere(
        new Brackets(async (qb) => {
          Array.isArray(type)
            ? type.forEach((v, i) => {
                // 여러 타입이 있을 경우 or 조건으로 검색 type = "공립" ||  type = "사립"
                qb.orWhere(`type = :type${i}`, {
                  [`type${i}`]: `${v}`,
                });
              })
            : qb.where("type Like '%%'");
        }),
      )
      .andWhere(
        new Brackets(async (qb) => {
          Array.isArray(property) &&
            // 여러 특성이 있을 경우 or 조건으로 검색 property 값의 경우 DB 컬럼명과 동일한 값이 들어옴 "Y" 인지 체크
            property.forEach((v) => {
              qb.orWhere(`${v} = 'Y'`);
            });
        }),
      )
      .andWhere(
        new Brackets(async (qb) => {
          // 여러 직원이 있을 경우 or 조건으로 검색 employee 값의 경우 DB 컬럼명과 동일한 값이 들어옴 0이상 인지 체크
          Array.isArray(employee) &&
            employee.forEach((v) => {
              qb.orWhere(`${v} > 0`);
            });
        }),
      )
      .andWhere(
        new Brackets(async (qb) => {
          // 비어있는 교실 수가 있을 경우 or 조건으로 검색 empty_class 값의 경우 DB 컬럼명과 동일한 값이 들어옴 0이상 인지 체크
          Array.isArray(empty_class) &&
            empty_class.forEach((v) => {
              qb.orWhere(`${v} > 0`);
            });
        }),
      )
      .andWhere(
        // 직원 수 n 이상인 경우
        `employee_count >= ${
          // length 는 string의 기본 메소드중 하나로 undefined 값이 들어올 경우 0으로 검색하도록
          dto?.employee_count?.length ? +dto.employee_count : 0
        }`,
      )
      .having(`distance <= ${dto?.radius ?? 50}`) // radius 반경 값이 있을경우
      .orderBy('distance', 'ASC') // 거리 기준으로 값 받아오기
      .limit(50)
      .getMany();

    return findCenterList;
  }
```
여러 andWhere 값을 거쳐 나온 값중 거리를 기준으로 데이터를 받아왔습니다.
<div align="center" ><h2>센터 상세히 보기</h2></div>
지도 위에서 마커를 클릭하거나 왼쪽 센터 리스트에서 선택한 경우 API를 통해 상세한 정보를 받아와 해당 정보를 나타내었습니다.


```TypeScript
const onClickCenter = useCallback(
    async (id: number) => {
      // 지도위에서 센터를 선택하거나 왼쪽 센터리스트에서 선택한 경우
      try {
        API.get(`center/${id}`).then((res) => {
          setSelectCenter(res.data.center);
          // selectCenter를 이용해 상세 페이지 데이터 출력

          router.replace(
            `map?${objectToQueryString({ ...router.query, center: id })}`
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
    [naverMap, router]
  );
``` 

```TypeScript
@Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const findCenter = await this.centerService.findOne(id);
    res.statusCode = 200;
    return res.send({
      statusCode: res.statusCode,
      message: '정보 받아오기 완료',
      center: findCenter,
    });
  }
```
컨트롤러 부분 @Get(':id') 을 통해 cetner/10 이라는 요청을 하였을때 캐치 할 수 있도록 하였습니다

@Param("id") 를 통해 파라미터 "id" 로 전달된 값을 받을 수 있도록 하였습니다.


```ts
async findOne(id: string) {
    let findCenter = await this.centerRepository.findOne({
      where: {
        id: +id,
      },
    });
    if (!findCenter) {
      throw new HttpException('존재하지 않는 센터입니다', 400);
    }
    if (findCenter.code.length === 0) {
      // 찾은 센터명에서 코드가 없을 경우
      const formData = new FormData();

      formData.append('latitude', `${findCenter.lat}`);
      formData.append('longitude', `${findCenter.lon}`);
      formData.append('distance', '1');
      // 폼데이터 생성 및 위도 경도 거리 필수 데이터 추가후

      const response = await axios.post(
        'https://e-childschoolinfo.moe.go.kr/kinderMt/kinderLocalFind.do',
        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          },
        },
      );

      if (response.data &&Array.isArray(response.data)) {
        // 데이터가 존재하고 배열인지 확인 
        const apiFindCenter = response.data.find(
          (v) =>
            (+v.latitude == +findCenter.lat &&
              +v.longitude == +findCenter.lon) ||
            v.name === findCenter.name,
          // 위도 경도가 같거나 이름이 같은 경우
        );

        await this.centerRepository.update(
          {
            id: findCenter.id,
          },
          {
            code: apiFindCenter.id,
          }, // code 명을 변경 해준뒤
        );
        findCenter.code = apiFindCenter.id;
        // 기존에 찾은 findCenter의 code값을 변경
      }
    }
    return findCenter;
  }
```
테이블 id 기준으로 어린이집을 찾고 어린이집이 없을 경우 에러를 발생시킵니다.

찾은 어린이집이 code명이 없을경우 별도의 API를 호출하여 해당하는 값을 찾아 업데이트 후 code 값을 변경하여 리턴 해주도록 하였습니다. 

