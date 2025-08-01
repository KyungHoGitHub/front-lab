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
import {useEffect, useState} from "react";
import {getNoticeList} from "../features/notice/api/notice.ts";

interface NoticeList {
    idx : number,
    title : string,
    category : string,
    content : string,
    createAt  : string,
}
const Notice = () => {
    const [isOpen,setIsOpen] = useState<boolean>(false);
    const [data, setData] = useState();

    const {
        searchSelect,
        setSearchSelect,
        searchInput,
        setSearchInput,
        handleSearch
    } = useNoticeSearch();

    const {token} = useAuth();
    const decodeToken = jwtDecode(token);

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

    useEffect(() => {
        const fetchData = async ()=>{
            try {
                const res = await getNoticeList();
                setData(res.data);

            }catch (error){
                console.log(error)
            }
        }
        fetchData();
    }, []);
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
                    <CreateButton onClick={()=>setIsOpen(true)} title={"FaPlus"}/>
                }
            </NoticeSearchs>

            <NoticeList className="custom-notice-list" notices={data}>
                <NoticeListHeaderLine />
                <NoticePageFooter/>
            </NoticeList>
            <NoticeModals isOpen={isOpen} onClose={()=> setIsOpen(false)}/>
        </>
    )
}
export default Notice;