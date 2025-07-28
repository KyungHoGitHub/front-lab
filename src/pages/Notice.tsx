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

const Notice = () => {
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
                <SearchButton onClick={() => handleSearch(searchSelect, searchInput)} title={"검색"}/>
                {decodeToken?.role == "admin" &&
                    <CreateButton onClick={handleCreate} title={"추가하기"}/>
                }
            </NoticeSearchs>
            <NoticeList className="custom-notice-list" notices={notices}>
                <NoticeListHeaderLine />
                <NoticePageFooter/>
            </NoticeList>
        </>
    )
}
export default Notice;