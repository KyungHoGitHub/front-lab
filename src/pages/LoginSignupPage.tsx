import React, {useEffect, useState} from "react";
import LoginHeader from "../shared/component/layout/header/LoginHeader.tsx";
import test from '@assets/lefImage.png';
import LoginFooter from "../shared/component/layout/footer/LoginFooter.tsx";
import './LoginSignupPage.css';
import signup from '@assets/signupImage.jpg';
import {useLocation} from "react-router";

interface LoginSignupProps {
    formComponent: React.ReactNode;
}

const LoginSignupPage: React.FC<LoginSignupProps> = ({formComponent}) => {
    const location = useLocation();
    const [loginCheck, setLoginCheck] = useState<boolean>();
    const testValue = location.pathname.includes("login");

    useEffect(() => {
        setLoginCheck(testValue)
    }, [testValue]);

    return (
        <div className="loginSignup-page-container">
            <LoginHeader/>
            <main className="loginSignup-page-main">
                {/*<div className="loginSignup-image">*/}
                {/*    <img src={loginCheck ? test : signup} alt="..." className="loginSignup-image-img"/>*/}
                {/*</div>*/}
                <div className="loginSignup-page-form-wrapper">
                    {formComponent}
                </div>
            </main>
            <LoginFooter/>
        </div>
    )
}
export default LoginSignupPage;