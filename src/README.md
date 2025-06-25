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


### 컴포넌트 UI 작성 팁
# 🛠️ Frontend Project Structure Guide

> 이 프로젝트는 **도메인 중심 Feature-based 구조**에 기반하여 `Container`, `Presentational`, `Reusable UI` 컴포넌트를 명확하게 분리하여 유지보수성과 확장성을 고려해 설계되었습니다.

---

## 📁 디렉토리 구조 개요

```bash
src/
├── features/
│   └── todo/
│       ├── components/
│       │   ├── TodoTable/              # 도메인 특화 테이블 구성
│       │   │   ├── TodoTableContainer.tsx           # Container (데이터 처리)
│       │   │   ├── TodoTable.tsx       # Presentational (UI)
│       ├── hooks/
│       │   └── useTodos.ts             # 비즈니스 로직, 상태 관리
│       ├── types/
│       │   └── todo.ts                 # Todo 타입 정의
├── shared/
│   └── components/
│       └── table/
│           └── GenericTable.tsx        # 재사용 가능한 범용 테이블 컴포넌트
├── App.tsx
└── ...
```
### 📌 주요 개념 및 설계 의도

##### Container / Presentational 컴포넌트 분리
| 종류             | 역할                                   |
|----------------|--------------------------------------|
| Container      | 상태관리, 데이터 로딩, API 호출 등 비즈니스 로직을 담당한다 |
| Presentational | 순수  UI 컴포넌트, props 기반으로 화면만 렌더링      |

3. 공통 UI 컴포넌트 (Generic)
- GenericTable 처럼 도메인에 의존하지 않는 범용 UI 컴포넌트는 shared/components/ 에 위치시킵니다.
- 이는 다양한 도메인에서 동일한 UI 패턴을 활용할 수 있도록 하며 중복 코드를 줄입니다.

```typescript
// Container: 상태 관리 & 데이터 전달
<TodoTableContainer />

// Presentational: 도메인 UI 렌더링
<TodoTable todos={...} />

// Generic: 공통 테이블 UI (도메인과 무관)
<GenericTable data={...} columns={...} />

```
****
### 커밋 메세지 
- udacity style 커밋 메세지 구조 로 적용해보면 아래의 같은 구조를 나타낸다 <br>
```json
type: subject

body

footer
```

- 새로운 로그인 양식 화면 작업을 추가한다면
```json
feature : 로그인 폼 

url : /login 경로에 로그인 폼 화면을 추가함

footer
```

- 아래래는 참고 <br>
type 종류<br>
feat:  새로운 기능을 추가한 경우<br>
chore : 환경설정, 의존성 업데이트 등 루틴 한 작업들을 한 경우<br>
fix : 버그를 수정한 경우<br>
refactor : 기능의 변경 없이, 코드를 리팩토링 한 경우<br>
deprecate : 특정 기능의 사용을 중지하는 경우<br>

[릴리즈 / 테스트/ 스타일 / 문서]

release : 새 버전을 릴리스하는 것과 관계가 있는 경우<br>
test : 테스트 코드를 추가/수정한 경우<br>
docs : 문서나 주석을 추가/수정하는 경우<br>
style :  스타일 관련 작업의 경우<br>

상세한 커밋 메시지를 작성하는 부분, type과 마찬가지로 필수이며, 256글자를 넘어가면 안 된다.<br>
아래 규칙을 지키면 명확한 메시지를 작성할 수 있다.<br>
명령조 사용하기<br>
소스코드를 보지 않고도 변경 사항이 무엇인지 알 수 있게 하기<br>
커밋 메시지 본문으로 "why", "what", "how"를 포함하기 & 상세 내용 추가<br>

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
