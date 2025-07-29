import './Notice.css';
import IconAndTextButton from "../shared/component/buttons/IconAndTextButton.tsx";
import noticeImg from '@assets/noticeIcon.png';
import {
    CreateButton,
    NoticeSearchs,
    SearchButton,
    SearchInput,
    SearchSelect
} from "../features/notice/components/NoticeSearchs.tsx";
import useNoticeSearch from "../features/notice/hooks/useNoticeSearch.ts";
import {useAuth} from "../features/contexts/components/AuthProvider.tsx";
import {jwtDecode} from "jwt-decode";
import {
    NoticeCard,
    NoticeList,
    NoticeListHeaderLine,
    NoticePageFooter
} from '../features/notice/components/NoticeList.tsx';
import NoticeModals from "../features/notice/components/NoticeModals.tsx";
import {useState} from "react";

const Notice = () => {
    const [isOpen,setIsOpen] = useState<boolean>(false);
    const {
        searchSelect,
        setSearchSelect,
        searchInput,
        setSearchInput,
        handleSearch
    } = useNoticeSearch();
    const {token} = useAuth();
    const decodeToken = jwtDecode(token);

    const notices = [
        { idx: '1', category: '릴리스', title: '1.12 버전 배포', createdAt: '2025-12-11', content:  `
    <h2>2025년 7월 릴리스 노트</h2>

<p>이번 업데이트에서는 여러 기능 개선과 버그 수정이 포함되었습니다. 주요 내용은 아래와 같습니다.</p>

<h3>신규 기능</h3>
<ul>
  <li><strong>다크 모드 지원</strong> — 사용자 환경에 따라 UI가 자동으로 어두워집니다.</li>
  <li><strong>실시간 알림</strong> — 새로운 메시지 및 이벤트를 즉시 확인할 수 있습니다.</li>
  <li><strong>멀티 플랫폼 동기화</strong> — 모바일과 데스크톱 간 데이터가 자동 동기화됩니다.</li>
</ul>

<h3>버그 수정</h3>
<ol>
  <li>로그인 오류 문제 해결</li>
  <li>이미지 업로드 시 간헐적 실패 현상 수정</li>
  <li>검색 성능 최적화</li>
</ol>

<h3>화면 구성 예시</h3>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color:#f2f2f2;">
      <th>기능</th>
      <th>설명</th>
      <th>버전</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>다크 모드</td>
      <td>환경 설정에 따른 UI 변경 기능</td>
      <td>v2.3.0</td>
    </tr>
    <tr>
      <td>실시간 알림</td>
      <td>푸시 알림 기능 추가</td>
      <td>v2.3.0</td>
    </tr>
  </tbody>
</table>

<p>아래 이미지는 새롭게 추가된 다크 모드 설정 화면입니다:</p>
<img src="https://picsum.photos/600/300" alt="다크 모드 설정 화면" style="max-width:100%; height:auto;" />

<blockquote>
  <p>“더 나은 사용자 경험을 위해 항상 노력하겠습니다.” - 개발팀</p>
</blockquote>

<h3>코드 예제</h3>
<pre><code>public void greet() {
    System.out.println("안녕하세요, 사용자님!");
}
</code></pre>

<p>추가 문의 사항은 <a href="mailto:support@example.com">support@example.com</a> 으로 연락주세요.<
    ` },
        { idx: '2', category: '릴리스', title: '1.11 버전 배포', createdAt: '2025-12-10', content: '버그 수정.' },
        { idx: '1', category: '릴리스', title: '1.12 버전 배포', createdAt: '2025-12-11', content: '새로운 기능 추가.' },
        { idx: '2', category: '릴리스', title: '1.11 버전 배포', createdAt: '2025-12-10', content: '버그 수정.' },
        { idx: '1', category: '릴리스', title: '1.12 버전 배포', createdAt: '2025-12-11', content: '새로운 기능 추가.' },
        { idx: '2', category: '릴리스', title: '1.11 버전 배포', createdAt: '2025-12-10', content: '버그 수정.' },
        { idx: '1', category: '릴리스', title: '1.12 버전 배포', createdAt: '2025-12-11', content: '새로운 기능 추가.' },
        { idx: '2', category: '릴리스', title: '1.11 버전 배포', createdAt: '2025-12-10', content: '버그 수정.' },
        { idx: '1', category: '릴리스', title: '1.12 버전 배포', createdAt: '2025-12-11', content: '새로운 기능 추가.' },
        { idx: '2', category: '릴리스', title: '1.11 버전 배포', createdAt: '2025-12-10', content: '버그 수정.' },
        { idx: '1', category: '릴리스', title: '1.12 버전 배포', createdAt: '2025-12-11', content: '새로운 기능 추가.' },
        { idx: '2', category: '릴리스', title: '1.11 버전 배포', createdAt: '2025-12-10', content: '버그 수정.' },
        { idx: '1', category: '릴리스', title: '1.12 버전 배포', createdAt: '2025-12-11', content: '새로운 기능 추가.' },
        { idx: '2', category: '릴리스', title: '1.11 버전 배포', createdAt: '2025-12-10', content: '버그 수정.' },
    ];


    const SearchSelectOptions = [
        {
            label: "릴리스", value: "release"
        },
        {
            label: "일반", value: "basic"
        },
        {
            label: "에러", value: "error"
        },
    ]
    const handleCreate = () => {
        console.log("클릭")
    }

    return (
        <>
            <IconAndTextButton
                icon={noticeImg}
                text="공지사항"
                className="my-button"
                style={{
                    width: "140px",
                    height: "45px",
                    border: "none"
                }}
            />
            <NoticeSearchs className={"test"}>
                <SearchSelect value={searchSelect} onChange={setSearchSelect} options={SearchSelectOptions}/>
                <SearchInput value={searchInput} placeholder="검색어를 입력해주세요." onChange={setSearchInput}/>
                <SearchButton onClick={() => handleSearch(searchSelect, searchInput)} title={"FaSearch"}/>
                {decodeToken?.role == "admin" &&
                    <CreateButton onClick={handleCreate} title={"FaPlus"}/>
                }
            </NoticeSearchs>
            <button onClick={()=>setIsOpen(true)}>Click</button>
            <NoticeList className="custom-notice-list" notices={notices}>
                <NoticeListHeaderLine />
                <NoticePageFooter/>
            </NoticeList>
            <NoticeModals isOpen={isOpen} onClose={()=> setIsOpen(false)}/>
        </>
    )
}
export default Notice;