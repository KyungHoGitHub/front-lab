import React from "react";
import LoginForm from "../features/login/components/LoginForm.tsx";
import LoginHeader from "../shared/component/layout/header/LoginHeader.tsx";
import LoginFooter from "../shared/component/layout/footer/LoginFooter.tsx";
import test from '@assets/leftImge.jpg';
import './Login.css';

const Login: React.FC = () => {
    return (
        <div className="login-page-container">
            <LoginHeader/>
            <main className="login-page-main">
                <div className="login-image">
                    <img src={test} alt="..." className="login-image-img"/>
                </div>
                <div className="login-form-wrapper">
                    <LoginForm title="Title"/>
                </div>
            </main>
            <LoginFooter/>
        </div>
    )
}
export default Login;