import React from "react";
import './Mypage.css';
import Card from "../shared/component/common/Card.tsx";
import Avatar from "../shared/component/common/Avatar.tsx";
import userIcon from '@assets/userRed.png';
import Description from "../shared/component/common/Description.tsx";
import Table, {Column} from "../shared/component/common/Table.tsx";

interface UserActivity {
    id: number;
    name: string;
    action: string;
    initDate: string;
    currentDate: string;
}

const Mypage: React.FC = () => {
    const userInfo: { label: string; value: string }[] = [
        { label: 'ID', value: 'user123' },
        { label: '이름', value: '홍길동' },
        { label: '휴대폰번호', value: '010-****-1234' },
    ];

    const companyInfo: { label: string; value: string }[] = [
        { label: '기관명', value: '웹테스트' },
        { label: '부서명', value: '개발팀' },
    ];

    const activityData: UserActivity[] = [
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

    const activityColumns: Column<UserActivity>[] = [
        {
            title: 'ID',
            dataIndex: 'id',
            // sorter: (a, b) => a.id - b.id, // 숫자 정렬
        },
        {
            title : '이름',
            dataIndex: 'name',
            sorter: (a, b) => a.id - b.id, // 숫자 정렬
        },
        {

            title: '활동',
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
    const handleAvatarChange = () => {
        alert('이미지 변경 로직을 여기에 추가하세요!');
        // 실제로는 파일 업로드 로직 등 구현
    };
    return (

        <Card title={"my page"}>
            <Avatar size={100} src={userIcon} onChange={handleAvatarChange}></Avatar>
            <span style={{padding: "10px"}}/>
            <Card title={"기본정보"}>
                <Description items={userInfo}/>
            </Card>
            <span style={{padding: "10px"}}/>
            <Card title={"기관정보"}>
                <Description items={companyInfo}/>
            </Card>

            <Card>
                <Table columns={activityColumns} dataSource={activityData} />
            </Card>
        </Card>
    )
}
export default Mypage;