import React, {useState} from "react";
import {GoogleLogin, googleLogout, useGoogleLogin} from "@react-oauth/google";
import axios from 'axios';
import "./OathLoginButton.css";
import {FaGoogle} from "react-icons/fa";
import {googleLoginForm} from "@/features/login/api/login.ts";
import googleLogoImg from '@assets/google.svg';
import {LoginTypes} from "@/features/login/enums/loginTypes.ts";
import {useNavigate} from "react-router";
import {extractData} from "@/shared/utill/response.ts";
import {useAuth} from "@/features/contexts/components/AuthProvider.tsx";
interface UserInfo {
    name: string;
    email: string;
    picture: string;
}

interface OauthLoginButtonProps {
    setIsTermsModalOpen : (value: boolean) => void;
}

const OathLoginButton: React.FC<OauthLoginButtonProps> = ({setIsTermsModalOpen}) => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const navigate = useNavigate();
    const {login} = useAuth();
    const logins = useGoogleLogin({
        flow: 'implicit',
        scope: 'openid profile email',
        onSuccess: async (tokenResponse) => {
            try {

                const data = {
                    data: {
                        token : tokenResponse.access_token,
                    },
                    loginType : LoginTypes.GOOGLE
                }
                // 2. 백엔드(Spring)에 토큰 전달 → JWT 발급
                const serverRes = await googleLoginForm(data);

                const res = extractData(serverRes);
                // if (res.accessToken == "100688563434354731537") {
                //     setIsTermsModalOpen(true);
                // }

                localStorage.setItem("user-mail",res.oauthEmail);

                if(localStorage.getItem("user-mail")){
                    setIsTermsModalOpen(true);
                }
                login(res.accessToken);
                navigate("/home", { replace: true, state: {} });
            } catch (error) {
                console.log(error);
            }
        },
        onError: (error) => {
            console.error(error);
        }
    });

    console.log(userInfo);
    const logout = () => {
        googleLogout();
        setUserInfo(null);
    };


    return (
        <div className="p-4">
            <button type="button" className="google-login-button flex items-center justify-between px-4 py-3 w-[320px] h-[45px]
                     transition-transform duration-100 ease-in-out
                     hover:scale-105
                     active:scale-95
                     rounded-lg
                     shadow-md" onClick={() => logins()}>
                <img src={googleLogoImg} alt="" className="w-7 h-7 -ml-3 mr-3" />
                <span className="flex-1 text-center">Google 로그인</span>
            </button>
        </div>
    )
}

export default OathLoginButton;