import React, {useState} from "react";
import {GoogleLogin, googleLogout, useGoogleLogin} from "@react-oauth/google";
import axios from 'axios';
import "./OathLoginButton.css";
import {FaGoogle} from "react-icons/fa";

interface UserInfo {
    name: string;
    email: string;
    picture: string;
}

const OathLoginButton: React.FC = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const res = await axios.get('https://www.googleapis.com/oauth2/v3/userInfo', {
                    headers: {
                        Authorization: `Bearrer ${tokenResponse.access_token}`,
                    },
                });
                setUserInfo({
                    name: res.data.name,
                    email: res.data.email,
                    picture: res.data.picture,
                });
            } catch (error) {
                console.log(error);
            }
        },
        onError: (error) => {
            console.error(error);
        }
    });

    const logout = () => {
        googleLogout();
        setUserInfo(null);
    };


    return (
        <div className="oauth-container">
            <button className="google-login-button" onClick={() => login()}>
                <FaGoogle className="google-icon"/>
                Sign in with google
            </button>

        </div>
    )
}

export default OathLoginButton;