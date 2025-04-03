import React, {useEffect, useState} from "react";
import LoginHeader from "../header/LoginHeader.tsx";
import test from '@assets/leftImge.jpg';
import LoginFooter from "../footer/LoginFooter.tsx";
import './authLayout.css';
import signup from '@assets/signupImage.jpg';
import {useLocation} from "react-router";

interface AuthLayoutProps {
    formComponent: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({formComponent}) => {
    const location = useLocation();
    const [loginCheck, isLoginCheck] = useState<boolean>();
    const testValue = location.pathname.includes("login");

    useEffect(() => {
        isLoginCheck(testValue)
    }, [testValue]);

    return (
        <div className="authLayout-page-container">
            <LoginHeader/>
            <main className="authLayout-page-main">
                <div className="authLayout-image">
                    <img src={loginCheck ? test : signup} alt="..." className="authLayout-image-img"/>
                </div>
                <div className="authLayout-page-form-wrapper">
                    {formComponent}
                </div>
            </main>
            <LoginFooter/>
        </div>
    )
}
export default AuthLayout;