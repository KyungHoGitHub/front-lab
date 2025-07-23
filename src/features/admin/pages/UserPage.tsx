import './userPage.css';
import Table from "../../../shared/component/common/Table.tsx";
import SearchBar from "../../../shared/component/common/SearchBar.tsx";
import {useUserPage} from "../hooks/useUserPage.ts";

const UserPage:React.FC =()=>{
    const {userList,handleSearch} = useUserPage();
    const selctOptions = [
        {
          label: "이름",
          value : "username"
        },
        {
            label: "아이디",
             value: "userId"
        },
    ]
    const activityColumns = [
        {
            title: '아이디',
            dataIndex: 'id',
            // sorter: (a, b) => a.id - b.id, // 숫자 정렬
        },
        {
            title : '이름',
            dataIndex: 'name',
            sorter: (a, b) => a.id - b.id, // 숫자 정렬
        },
        {

            title: '이메일',
            dataIndex: 'action',
            sorter: (a, b) => a.action.localeCompare(b.action), // 문자열 정렬
        },
        {
            title: '생성일자',
            dataIndex: 'initDate',
            sorter: (a, b) => a.initDate.localeCompare(b.initDate), // 날짜 문자열 정렬
        },
        {
            title : '최근접속일자',
            dataIndex: 'currentDate',
        }
    ];

    const activityData= [
        { id: 1, name: '김길동',action: '로그인', initDate: '2023-10-01' ,currentDate:'2025-04-08'},
        { id: 2,name: '홍길동', action: '프로필 업데이트', initDate: '2023-10-02',currentDate:'2025-04-08' },
        { id: 3,name: '서초동', action: '로그아웃', initDate: '2023-10-03',currentDate:'2025-04-08' },
        { id: 1, name: '김길동',action: '로그인', initDate: '2023-10-01' ,currentDate:'2025-04-08'},
        { id: 2,name: '홍길동', action: '프로필 업데이트', initDate: '2023-10-02',currentDate:'2025-04-08' },
        { id: 3,name: '서초동', action: '로그아웃', initDate: '2023-10-03',currentDate:'2025-04-08' },
        { id: 1, name: '김길동',action: '로그인', initDate: '2023-10-01' ,currentDate:'2025-04-08'},
        { id: 2,name: '홍길동', action: '프로필 업데이트', initDate: '2023-10-02',currentDate:'2025-04-08' },
        { id: 3,name: '서초동', action: '로그아웃', initDate: '2023-10-03',currentDate:'2025-04-08' },
        { id: 1, name: '김길동',action: '로그인', initDate: '2023-10-01' ,currentDate:'2025-04-08'},
        { id: 2,name: '홍길동', action: '프로필 업데이트', initDate: '2023-10-02',currentDate:'2025-04-08' },
        { id: 3,name: '서초동', action: '로그아웃', initDate: '2023-10-03',currentDate:'2025-04-08' },
        { id: 1, name: '김길동',action: '로그인', initDate: '2023-10-01' ,currentDate:'2025-04-08'},
        { id: 2,name: '홍길동', action: '프로필 업데이트', initDate: '2023-10-02',currentDate:'2025-04-08' },
        { id: 3,name: '서초동', action: '로그아웃', initDate: '2023-10-03',currentDate:'2025-04-08' },
    ];
    return(
        <div className="user-list-container">
            <div className="user-list-header"><SearchBar onSearch={handleSearch} selectOptions={selctOptions}
            /></div>
            <div style={{padding:"10px"}}></div>
            <Table columns={activityColumns} dataSource={activityData}/>
        </div>
    )
}
export default UserPage;