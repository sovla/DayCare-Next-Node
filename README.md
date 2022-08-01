 
# DayCare-Center (<a href="https://daycare-center.shop">daycare-center.shop</a>)

> 간편한 어린이집 찾기 플랫폼

복잡한 어린이집 찾기 서비스를 <span style="color:green">간편화</span> 하기 위해 진행한 프로젝트 입니다.

-   어린이집 카테고리의 세분화 필터링 기능을 지원하고 있습니다.

-   어린이집 검색시 1순위인 거리를 기준으로 볼 수 있습니다.

-   어린이집 관련 리뷰를 남길 수 있는 게시판을 별도로 운영하고 있습니다.

-  댓글을 통해 사용자간에 소통이 원활하도록 하고 있습니다.

# 사용방법

## 1. 홈

> 어린이집 찾기 전 읽기 좋은 글들을 소개하고 있습니다.

<img src="https://user-images.githubusercontent.com/41351496/180743508-318d2f64-91f5-4d06-906a-dcdb5ab08e5b.png" alt="daycare-center shop_map(1)" style="width:90%;height:350px;margin-left:5%;" />

## 2. 지도

> 현재 위치로 검색 버튼을 통해 거리순으로 어린이집을 찾을 수 있습니다.

![daycare-center shop_map (2)](https://user-images.githubusercontent.com/41351496/180743512-4b3c74f3-da75-4867-b01a-689e10ec8363.png)

## 3. 지도 - 어린이집 클릭시

> 클릭한 어린이집에 관련된 정보를 볼 수 있습니다.

![daycare-center shop_map (3)](https://user-images.githubusercontent.com/41351496/180743515-31ea1ef9-ce1c-423c-a621-0e559e5e025f.png)

## 4. 검색

> 어린이집 이름, 주소로 적용된 데이터가 있을 경우 해당 데이터로 나타냅니다.

![daycare-center shop_board_261 (1)](https://user-images.githubusercontent.com/41351496/180743493-c56e4e19-dd57-4d1b-86ad-c8c0b427a80a.png)

## 5. 필터링

> 기존 서비스를 보며 필요한 필터링 기능을 추가했습니다.

![daycare-center shop_map (4)](https://user-images.githubusercontent.com/41351496/180743519-d8240663-2231-48bd-af5d-1aa21130282a.png)

## 5. 게시판

> 어린이집 관련 내용 공유 및 자유 게시판으로 활용하고 있습니다.

![daycare-center shop_map (5)](https://user-images.githubusercontent.com/41351496/180743523-e5bdcb34-647a-4b20-ab20-2b65ffc2d9aa.png)

## 6. 게시판 상세보기

> 댓글을 통해 사용자들 간에 소통이 가능하도록 했습니다.

![daycare-center shop_board_261](https://user-images.githubusercontent.com/41351496/180743506-8463ebe2-b9e8-48ca-9dca-cc64133f298d.png)

# Project Structure

> Next(SSR) + Nest(Express) 구조로 개발하였으며, 개인 프로젝트로 진행했습니다.

## 사용한 기술 스택

### BackEnd

-   Nest
-   TypeORM
-   MySQL
-   JWT
-   TypeScript

### Front

-   Next
-   TypeScript
-   StoryBook
-   Styled-Component

### Coding Convention Tool

-   EsLint
-   Prettier
-   Husky
-   Commitizen

참조: 프로젝트 설계 과정 
<a href="https://velog.io/@gavri/ToyProject-%EC%84%A4%EA%B3%84">https://velog.io/@gavri/ToyProject-%EC%84%A4%EA%B3%84</a>

## Next

> 구조는 다음과 같습니다.

src

-   API : Axios API 폴더
- assets : image,font,global 테마 파일 폴더
-   Components
    -   Atom : 버튼 등 작은 단위의 컴포넌트
    -   Template : 버튼 모음 등 Atom 컴포넌트 조립을 통해 만들어진 컴포넌트
-   Container
    -   Page : Page 단위의 Container
-   CustomHook : 커스텀 훅 폴더
-   Type : [타입]/[관련기능] 기준의 타입지정
-   Util : 각종 Util
-   Store : Redux 폴더
-   stories : StoryBook 폴더
-   pages : 실제 페이지 폴더 (Next에서는 해당 폴더 기준으로 라우팅 설정)

**getServerSideProps , 동적 경로**

Next 동적 경로를 이용해 게시판 id 값으로 상세보기 페이지를 구성할때 해당 값을 전달하고 받을 수 있도록 했습니다.

getServerSideProps을 이용해 페이지 로딩전 서버에서 해당 게시물을 미리 가져와 로딩하도록 했습니다.

## StoryBook

> 컴포넌트 시각화 툴로 컴포넌트 설계에 도움을 줍니다.

사용한 Addon

-   a11y - 웹 표준 접근성 테스트
-   interactions - 상호작용 및 테스트의 시각적 디버깅
-   actions - 이벤트 핸들러 캐치
-   controls - 동적으로 Props 변화를 위한 툴
-   viewport - 반응형 요소를 위한 툴
<img src="https://velog.velcdn.com/images/gavri/post/14307b2d-36d6-4672-9f30-0174012fbbcd/image.png" alt="storybook" style="width:70% !important;height:400px !important;margin-left:0px;">

## Nest (API Server)

> 구조는 다음과 같습니다.

domain : TypeORM entity 모음
config : .yaml 파일을 이용해 배포, 개발 환경을 적용

각 API 별로 폴더 구분
center,reply,review,session,category,user

-   controller : API EndPoint 관리
-   service : Business Logic
-   module : 해당 폴더 관련 module 관리
-   dto : 해당 폴더 관련 dto
-   guard : JWTGuard jwt 검증 관련 소스

## JWT , Nest/UseGuards

> @UseGuards(JWTGuard) 를 이용해 JWT를 사용하는 컨트롤러에 검증된 요청만 허용되도록 적용했습니다.

```@Injectable()
export class JWTGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request<
      any,
      {
        id?: number;
      }
    > = context.switchToHttp().getRequest();
    if (req?.cookies?.jwt == null) {
      throw new HttpException('로그인 후 이용가능합니다.', 401);
    }
    const jwtUser = this.jwtService.verify<jwtUserDTO>(req.cookies['jwt']);

    if (req.body.id == null) {
      throw new HttpException('id 값이 존재하지 않습니다.', 403);
    }

    if (+req.body.id !== +jwtUser.id) {
      throw new HttpException('본인의 글이 아닙니다.', 403);
    }

    return true;
  }
}
```

## TypeORM

> ORM을 이용해 데이터베이스 및 객체 변형에 유연하게 대처하며 반복적인 CRUD 작업을 대체했습니다.

TypeORM에서는 Active Record패턴과 Data Mapper패턴을 지원했습니다.

Active Record의 경우 규모가 작은 애플리케이션에 적합하고 간단히 사용할 수 있다는 장점이 있어 해당 패턴을 채택했습니다.

-   Entity : 데이터베이스 테이블에 매핑 되는 클래스 입니다.
-   Repository : 일반 저장소, 해당 저장소를 이용해 삭제,추가,수정을 합니다.

## Nest/Pipe , class-validator

> vaildation check 및 Pipe를 이용해 올바르지 않은 값 또는 숫자인데 문자열로 올경우 ParsePipe를 이용해 변경하여 내부 로직에서는 올바른 값만 받을 수 있도록 했습니다.

```
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginDTO {
  @IsEmail({}, { message: '이메일 형식이 아닙니다.' })
  email: string;

  @IsNotEmpty({ message: '비밀번호를 확인해주세요.' })
  @Length(6, 20, { message: '비밀번호는 6 ~ 20자 사이 입니다.' })
  password: string;
}
```

## Coding Convention

> Husky 라이브러리를 이용해 pre-commit 커밋 이전 es-lint 검사를 진행하도록 했습니다.

커밋 메시지 또한 일관화 하기 위해 Commitizen 라이브러리를 이용했습니다.
<img src="https://velog.velcdn.com/images/gavri/post/ec49ccfe-2e47-43a9-a262-ccc3ae48565b/image.png" alt="commitizen" style="width:100% !important;height:auto !important;margin-left:0px;">

