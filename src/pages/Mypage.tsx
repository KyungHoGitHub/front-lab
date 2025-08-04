import React, {useCallback, useEffect, useState} from "react";
import './Mypage.css';
import Card from "../shared/component/common/Card.tsx";
import Avatar from "../shared/component/common/Avatar.tsx";
import Description from "../shared/component/common/Description.tsx";
import {useNavigate} from "react-router";
import {postUserProfile, uploadProfile} from "../features/mypage/api/Mypage.ts";
import {getUserInfo} from "../shared/api/user.ts";
import {UserMeResponse} from "../features/mypage/type/mypage.ts";
import {useAuth} from "../features/contexts/components/AuthProvider.tsx";
import {jwtDecode} from "jwt-decode";
import {extractData} from "../shared/utill/response.ts";
import {useFormStatus} from "react-dom";


interface JwtPayload {
    sub: string;
    userIdx: number;
    userId : string;
}

// Description UI props item interface
interface UserInfoItem {
    label : string;
    value : string;
}

const Mypage: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [avartarSrc, setAvartarSrc] = useState('');
    const [userData, setUserData] = useState<UserMeResponse | null>(null);
    const [companyInfo, setCompanyInfo] = useState<UserInfoItem[]>([]);
    const {token} = useAuth();

    const onProfileChange = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await uploadProfile(formData);
            // 여기 나중에 서버에서 전달주는 객체로 이름 변경해야할듯

            setAvartarSrc(res.data.imageUrl);
        } catch (q) {
            console.log(q);
        }
    }

    const formatUserInfo = (data : UserMeResponse): UserInfoItem[] =>{
        return [
            {label: '이메일', value: data.email || '-'},
            {label: '아이디', value: data.userId},
            {label: '이름', value: data.username},
        ]
    }


    useEffect(() => {
        const fetchMypage = async () => {
            try {

                const decoded = jwtDecode<JwtPayload>(token);

                const response = await getUserInfo();
                const data =  extractData(response);
                const test = {
                    email: "",
                    idx: 0,
                    imageUrl: data.imageUrl,
                    username : decoded.sub,
                    userId : decoded.userId
                }
                setUserData(test);
                setCompanyInfo(formatUserInfo(test));
            } catch (error) {
                console.log(error);
            }
        }
        fetchMypage();
    }, []);


    return (
        <>
            <Card title={"마이페이지"}>
                <span style={{padding: "10px"}}/>
                <Card title={"기본정보"}>
                    <div style={{marginLeft: "100px"}}>
                        {userData?.imageUrl &&
                            <Avatar size={100} src={userData.imageUrl} onProfileChange={onProfileChange}></Avatar>
                        }
                    </div>
                    <div style={{marginLeft: "400px"}}>
                    <Description items={companyInfo}/>
                    </div>
                </Card>
                <span style={{padding: "10px"}}/>
            </Card>
            <Card title={"기관정보"}>
                <Description items={companyInfo}/>
            </Card>
        </>
    )
}
export default Mypage;