import './userPage.css';
import Table from "../../../shared/component/common/Table.tsx";
import SearchBar from "../../../shared/component/common/SearchBar.tsx";
import {useUserPage} from "../hooks/useUserPage.ts";
import {useEffect} from "react";
import {getUsers} from "../api/admin.ts";

const UserPage: React.FC = () => {
    const {userList, handleSearch, setUserList} = useUserPage();
    const selectOptions = [
        {
            label: "이름",
            value: "username"
        },
        {
            label: "아이디",
            value: "userId"
        },
    ]
    const activityColumns = [
        {
            title: '아이디',
            dataIndex: 'userId',
            // sorter: (a, b) => a.id - b.id, // 숫자 정렬
        },
        {
            title: '이름',
            dataIndex: 'userName',
            sorter: (a, b) => a.id - b.id, // 숫자 정렬
        },
        {

            title: '이메일',
            dataIndex: 'email',
            sorter: (a, b) => a.action.localeCompare(b.action), // 문자열 정렬
        },
        {
            title: '권한',
            dataIndex: 'role',
        },
        {
            title: '생성일자',
            dataIndex: 'createdAt',
            sorter: (a, b) => a.initDate.localeCompare(b.initDate), // 날짜 문자열 정렬
        }
    ];

    useEffect(() => {
        const fetchUserList = async () => {
            try {
                const res = await getUsers();
                console.log('res.data----------------<>',res.data);
                setUserList(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchUserList();
    }, []);

    return (
        <div className="user-list-container">
            <div className="user-list-header"><SearchBar onSearch={handleSearch} selectOptions={selectOptions}
            /></div>
            <div style={{padding: "10px"}}></div>
            <Table columns={activityColumns} dataSource={userList}/>
        </div>
    )
}
export default UserPage;