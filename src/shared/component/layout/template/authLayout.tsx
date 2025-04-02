import React from "react";
import LoginHeader from "../header/LoginHeader.tsx";
import test from '@assets/leftImge.jpg';
import LoginFooter from "../footer/LoginFooter.tsx";
import './authLayout.css';

interface AuthLayoutProps{
    formComponent: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({formComponent}) => {

    return (
            <div className="authLayout-page-container">
                <LoginHeader/>
                <main className="authLayout-page-main">
                    <div className="authLayout-image">
                        <img src={test} alt="..." className="authLayout-image-img"/>
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