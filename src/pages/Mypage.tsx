import React, {useEffect, useState} from "react";
import './Mypage.css';
import Card from "../shared/component/common/Card.tsx";
import Avatar from "../shared/component/common/Avatar.tsx";
import Description from "../shared/component/common/Description.tsx";
import {useNavigate} from "react-router";
import {postUserProfile} from "../features/mypage/api/Mypage.ts";
import {getUserInfo} from "../shared/api/user.ts";
import {UserMeResponse} from "../features/mypage/type/mypage.ts";
import {useAuth} from "../features/contexts/components/AuthProvider.tsx";
import {jwtDecode} from "jwt-decode";


interface JwtPayload {
    sub: string;
    userIdx: number;
}
const Mypage: React.FC = () => {
    const [avartarSrc, setAvartarSrc] = useState('');
    const [userData, setUserData] = useState<UserMeResponse | null>(null);

    const {token} = useAuth();


    // const userInfo = Object.entries(userData)
    //     .filter(([key]) => key === "id" || key === "username")
    //     .map(([key, value]) => ({
    //         label: key === "id" ? "ID" : "이름",
    //         // value: value.toString(),
    //     }));


    const companyInfo: { label: string; value: string }[] = [
        {label: '기관명', value: '웹테스트'},
        {label: '부서명', value: '개발팀'},
    ];

    const handleFileChange = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await postUserProfile(formData);
            // 여기 나중에 서버에서 전달주는 객체로 이름 변경해야할듯
            setAvartarSrc(res.data.imageUrl);
        } catch (q) {
            console.log(q);
        }
    }

    // const jwtTokenParsedUserIdx = (toekn: string)=>{
    //     const decodedJwt = jwtDecode(token);
    //     const userIdx = decodedJwt.
    // }
    useEffect(() => {
        const fetchMypage = async () => {
            try {
                const decoded = jwtDecode<JwtPayload>(token);
                console.log(decoded.userIdx);

                const response = await getUserInfo();
                setUserData(response.data.data);

            } catch (error) {
                console.log(error);
            }
        }
        fetchMypage();
    }, []);



    return (

        <Card title={"my page"}>
            <Avatar size={100} src={avartarSrc} onFileChange={handleFileChange}></Avatar>
            <span style={{padding: "10px"}}/>
            <Card title={"기본정보"}>
                <p>dd</p>
                {/*<Description items={userInfo}/>*/}
            </Card>
            <span style={{padding: "10px"}}/>
            <Card title={"기관정보"}>
                <Description items={companyInfo}/>
            </Card>
        </Card>
    )
}
export default Mypage;