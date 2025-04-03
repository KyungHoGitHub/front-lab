import React, {useEffect, useState} from "react";
import {NavLink, useLocation} from "react-router";
import dpImg from '@assets/top-left-logo.png';
import "./LoginHeader.css"
import {FiLogIn} from "react-icons/fi";
import {MdArrowBackIos} from "react-icons/md";

const LoginHeader: React.FC = () => {
    const location = useLocation();
    const isLogin = location.pathname.split('/').filter(Boolean).pop();
    const [loginCheck, isLoginCheck] = useState<boolean>();
    const test = location.pathname.includes("login");

    useEffect(() => {
        isLoginCheck(test)
    }, [test]);


    return (
        <header className="login-header">
            <div className="login-container">
                <div className="login-logo-section">
                    <NavLink to="/">
                        <img src={dpImg} alt=".." className="login-logo-img"/>
                    </NavLink>
                </div>
                {
                    loginCheck ?
                    <div className="login-right-section">
                        <NavLink to="/test/signup" className="signup-button">
                            <span>Sign Up</span>
                            <FiLogIn className="signup-icon"/>
                        </NavLink>
                    </div>
                        :<div>
                            <NavLink to="/test/login" className="login-button">
                                <MdArrowBackIos className="login-icon"/>
                                <span>Login</span>
                            </NavLink>
                        </div>
                }
            </div>
        </header>
    )
}
export default LoginHeader;