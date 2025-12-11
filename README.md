# Front basic template Project

이 프로젝트는 React와 TypeScript를 사용해 모듈별로 구성된 웹 애플리케이션입니다.

## 목적
- 프론트 엔드 작업시 공통적인 탬플릿 제공
- 모듈화된 구조로 유지보수성과 확장성을 높임.
- 협업 시 각 기능별로 책임을 분리해 충돌 최소화.

## 디렉토리 구조
프로젝트는  `FIRST-FEATURES, DOMAIN-DRIVEN` 을 기반으로 기능 단위로 구성됩니다. 예시는 `login` 모듈입니다:

```
src/
├─ assets/        # 이미지, 아이콘 폰트 등 정적 파일 보관
├─ components/    # shadcn/ui + 공통 컴포넌트
│   ├─ ui/
│   └─ masicui/
├─ constants/     # 색상, 라우트 등 상수
├─ features/      # 기능 단위 모듈화 (진행 중)
│   ├─ admin/
│   ├─ chat/
│   └─ login/
├─ fonts/         # 텍스트 폰트 파일 보관
├─ lib/           # firebase 설정 파일 보관
├─ locals/        # 다국어 지원을 위한 json 파일 보관
│   ├─ en/
│   └─ ko/
├─ pages/         # 화면 ui 컴포넌트
├─ shared/        # 전역  axios 인터셉터, 공통 ui 컴포넌트, 엔드포인트
│   ├─ api/
│   ├─ component/
│   ├─ endpoints/
│   ├─ hooks/
│   └─ utill/
├─ storage/           # zustand store 파일 정의
└─ App.tsx
```

### 각 폴더 역할
| 폴더            | 역할                                 |
|---------------|------------------------------------|
| `assets/`     | 이미지, 아이콘 등 정적 파일 보관                |
| `components/` | shadcn/ui 기반 재사용 컴포넌트 + 프로젝트 공통 UI |
| `features/`   | 기능 단위 모듈화 (현재는 점진 도입 중, 향후 확장 목표)  |
| `constants/`  | 색상, 라우팅 경로 등 변하지 않는 값 중앙 관리        |
| `lib/`        | 외부 라이브러리 설정 및 범용 유틸 함수             |
| `loclas/`     | 다국어 지원을 위한 ko,en 등의 json 파일 정의     |
| `styles/`     | Tailwind 설정, 전역 CSS, 테마 관련 스타일     |


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
