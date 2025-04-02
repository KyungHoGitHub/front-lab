# Front basic template Project

이 프로젝트는 React와 TypeScript를 사용해 모듈별로 구성된 웹 애플리케이션입니다. 

## 목적
- 프론트 엔드 작업시 공통적인 탬플릿 제공
- 모듈화된 구조로 유지보수성과 확장성을 높임.
- 협업 시 각 기능별로 책임을 분리해 충돌 최소화.

## 디렉토리 구조
프로젝트는  `FIRST-FEATURES, DOMAIN-DRIVEN` 을 기반으로 기능 단위로 구성됩니다. 예시는 `login` 모듈입니다:


### 각 폴더 역할
- **`api/`**: 백엔드와의 통신 로직을 처리.
    - `axios.ts`: 공통 Axios 인스턴스 설정 (토큰 관리, 에러 처리).
    - `config.ts`: API URL과 엔드포인트를 상수로 정의.
    - `loginApi.ts`: `login()`, `refreshToken()` 등의 API 함수.
- **`component/`**: UI 요소를 정의 (예: `LoginForm.tsx`).
- **`type/`**: TypeScript 인터페이스와 타입 정의.

### 새로운 기능을 추가한 다면
- `src/features` 에 새로 추가하는 기능 명칭에 폴더를 하나 만들고 기본 구성인 <br>
  api, component, type을 추가하여 작업을 진행합니다.
- 
### 주석 규칙
- css 파일에 역활과 의도를 설명하는 주석 추가
```css
/* 로그인 버튼 : 사용자 인증 요청 */
.login-button {
  padding: 10px
}
```

### 다국어 적용
- i18n 라이브러리를 사용해서 다국어 기능을 제공
- 
- **`locals/`**: 언어 데이터 폴더
  - `ko/trans.json`: 한국어
  - `en/trnas.json`: 영어
- **`i18n.ts/`**: i18n 설정파일

```json
{
  /* 계층형으로 작성합니다 헤더 -> 제목 */
  "header": { 
    "title": "Oops",
    "menu1": "Menu 1",
    "menu2": "Menu 2",
    "menu3": "Menu 3"
  }
}
```

## 설치 및 실행

### prerequisites
- Node.js (>= 16.x)
- npm (>= 8.x)

### 설치
```bash
git clone https://github.com/username/repo.git
cd repo
npm instal

REACT_APP_API_BASE_URL=https://api.example.coml
```

### 실행
```bash
npm stasrt
```
