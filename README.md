
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
const { api: loginApi } = useApi<sessionLoginType>({
    url: '/session',
    data: {
      email,
      password,
    },
    method: 'post',
  });

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
useApi Custom Hook & Type

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

```

공통적인 기능인 API 호출에 대해 커스텀 훅을 통해 관리하여 중복되던 기존 소스량을 줄였습니다.

TypeScript 제네릭을 이용하여 APIType을 상속한 타입을 useApi<sessionLoginType>에 선언할 경우 리턴 되는 값 또는 필수 값이 제대로 들어오지 않을 경우 타입에러를 일으켜 잘못된 데이터가 들어오는 것을 방지하였습니다.

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

로그인 성공시 JWT 토큰을 발급하였으며 이후에 유저 권한이 필요한 API 호출시 쿠키에 저장된 토큰과 ID 값을 대조해 일치하지 않거나 위조된 토큰의 경우 에러를 발생시키도록 하였습니다. 


