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
import {extractData} from "../shared/utill/response.ts";
import {useFormStatus} from "react-dom";


interface JwtPayload {
    sub: string;
    userIdx: number;
    userId : string;
}

interface UserInfoItem {
    label : string;
    value : string;
}
const Mypage: React.FC = () => {
    const [avartarSrc, setAvartarSrc] = useState('');
    const [userData, setUserData] = useState<UserMeResponse | null>(null);
    const [companyInfo, setCompanyInfo] = useState<UserInfoItem[]>([]);
    const {token} = useAuth();



    // const userInfo = Object.entries(userData)
    //     .filter(([key]) => key === "id" || key === "username")
    //     .map(([key, value]) => ({
    //         label: key === "id" ? "ID" : "이름",
    //         // value: value.toString(),
    //     }));


    // const companyInfo: { label: string; value: string }[] = [
    //     {label: '이메일', value: 'ykh12@dgtpharm.com'},
    //     {label: '아이디', value: 'abab'},
    //     {label: '이름', value: '오렌지'},
    //     {label: '패스워드', value: 'abab'},
    // ];

    const handleFileChange = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await postUserProfile(formData);
            // 여기 나중에 서버에서 전달주는 객체로 이름 변경해야할듯
            console.log(res.data);
            setAvartarSrc(res.data.imageUrl);
        } catch (q) {
            console.log(q);
        }
    }

    const fomatUserInfo = (data : UserMeResponse): UserInfoItem[] =>{
        return [
            {label: '이메일', value: data.email || '-'},
            {label: '아이디', value: data.userId},
            {label: '이름', value: data.username},
            {label: '패스워드', value: 'abab'},
        ]
    }
    // const jwtTokenParsedUserIdx = (toekn: string)=>{
    //     const decodedJwt = jwtDecode(token);
    //     const userIdx = decodedJwt.
    // }

    useEffect(() => {
        const fetchMypage = async () => {
            try {
                const decoded = jwtDecode<JwtPayload>(token);
                console.log('decoded',decoded);
                const response = await getUserInfo();
                const data =  extractData(response);
                const test = {
                    email: "", idx: 0,
                    imageUrl: data.imageUrl,
                    username : decoded.sub,
                    userId : decoded.userId
                }
                setUserData(test);
                setCompanyInfo(fomatUserInfo(test));
            } catch (error) {
                console.log(error);
            }
        }
        fetchMypage();
    }, []);
    console.log('data 확인 ----->', userData);

    return (
        <>
            <Card title={"마이페이지"}>
                <span style={{padding: "10px"}}/>
                <Card title={"기본정보"}>
                    <div style={{marginLeft: "100px"}}>
                        {userData?.imageUrl &&
                            <Avatar size={100} src={userData.imageUrl} onFileChange={handleFileChange}></Avatar>
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