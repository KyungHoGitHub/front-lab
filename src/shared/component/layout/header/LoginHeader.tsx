import React, {useEffect, useState} from "react";
import {NavLink, useLocation} from "react-router";
import logoImg from '@assets/mainLogo.png';
import "./LoginHeader.css"
import {FiLogIn} from "react-icons/fi";
import {MdArrowBackIos} from "react-icons/md";

const LoginHeader: React.FC = () => {
    const location = useLocation();
    const [loginCheck, setLoginCheck] = useState<boolean>();
    const isLoginInclude = location.pathname.includes("login");

    useEffect(() => {
        setLoginCheck(isLoginInclude)
    }, [isLoginInclude]);

    return (
        <header className="login-header">
            <div className="login-container">
                <div className="login-logo-section">
                    <NavLink to="/">
                        <img src={logoImg} alt=".." className="login-logo-img"/>
                    </NavLink>
                </div>
                {
                    loginCheck ?
                        <div className="login-right-section">
                            <NavLink to="/signup" className="signup-button">
                                <span>Sign Up</span>
                                <FiLogIn className="signup-icon"/>
                            </NavLink>
                        </div>
                        : <div>
                            <NavLink to="/login" className="login-button">
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