import React, {useState} from "react";
import {GoogleLogin, googleLogout, useGoogleLogin} from "@react-oauth/google";
import axios from 'axios';
import "./OathLoginButton.css";
import {FaGoogle} from "react-icons/fa";
import {googleLoginForm} from "@/features/login/api/login.ts";
import googleLogoImg from '@assets/google.svg';
interface UserInfo {
    name: string;
    email: string;
    picture: string;
}

const OathLoginButton: React.FC = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    const login = useGoogleLogin({
        flow: 'implicit',
        scope: 'openid profile email',
        onSuccess: async (tokenResponse) => {
            try {

                console.log('토큰 정보', tokenResponse);

                const data = {
                    token : tokenResponse.access_token
                }
                // 2. 백엔드(Spring)에 토큰 전달 → JWT 발급
                const serverRes = await googleLoginForm(data);

                console.log(serverRes);

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
                     shadow-md" onClick={() => login()}>
                <img src={googleLogoImg} alt="" className="w-7 h-7 -ml-3 mr-3" />
                <span className="flex-1 text-center">Google 로그인</span>
            </button>
        </div>
    )
}

export default OathLoginButton;