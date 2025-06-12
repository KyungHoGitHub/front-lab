import React, {useState} from "react";
import './Mypage.css';
import Card from "../shared/component/common/Card.tsx";
import Avatar from "../shared/component/common/Avatar.tsx";
import userIcon from '@assets/userRed.png';
import Description from "../shared/component/common/Description.tsx";
import Table, {Column} from "../shared/component/common/Table.tsx";
import {useNavigate} from "react-router";
import {postUserProfile} from "../features/mypage/api/Mypage.ts";

interface UserActivity {
    id: number;
    name: string;
    action: string;
    initDate: string;
    currentDate: string;
}

const Mypage: React.FC = () => {
    const [avartarSrc, setAvartarSrc] = useState('');
    const navigate = useNavigate();

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

    // 상세 페이지로 이동하는 핸들러
    const handleCellClick = (record: UserActivity) => {
        navigate(`/activity/${record.id}`); // 예: /activity/1로 이동
        // 또는 간단히 테스트용으로 alert 사용:
        // alert(`Clicked activity: ${record.action} (ID: ${record.id})`);
    };

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
            onCellClick: handleCellClick,
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

    const handleFileChange  = async (file:File) =>{
        // console.log()
        // const file = event.target.files?.[0];
        // if(!file)return;
        console.log('Selected file:', file.name); // 디버깅
        const formData = new FormData();
        formData.append('file', file);
        console.log('FormData entries:', [...formData.entries()]); // FormData 내용 확인

        try{
            const res = await postUserProfile(formData);
            // 여기 나중에 서버에서 전달주는 객체로 이름 변경해야할듯
            setAvartarSrc(res.data);
        }catch (q){
            console.log(q);
        }
    }

    return (

        <Card title={"my page"}>
            <Avatar size={100} src={avartarSrc} onFileChange={handleFileChange}></Avatar>
            <span style={{padding: "10px"}}/>
            <Card title={"기본정보"}>
                <Description items={userInfo}/>
            </Card>
            <span style={{padding: "10px"}}/>
            <Card title={"기관정보"}>
                <Description items={companyInfo}/>
            </Card>

            {/*<Card>*/}
            {/*    <Table columns={activityColumns} dataSource={activityData} />*/}
            {/*</Card>*/}
        </Card>
    )
}
export default Mypage;