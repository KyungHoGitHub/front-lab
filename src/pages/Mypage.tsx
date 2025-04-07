import React from "react";
import './Mypage.css';
import Card from "../shared/component/common/Card.tsx";
import Avatar from "../shared/component/common/Avatar.tsx";
import userIcon from '@assets/userRed.png';
import Description from "../shared/component/common/Description.tsx";

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
        </Card>
    )
}
export default Mypage;