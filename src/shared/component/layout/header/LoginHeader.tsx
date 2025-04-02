import React from "react";
import {NavLink, useLocation} from "react-router";
import dpImg from '@assets/top-left-logo.png';
import "./LoginHeader.css"

const LoginHeader:React.FC =() =>{
    const location = useLocation();
    const isLogin = location.pathname.split('/').filter(Boolean).pop();
    console.log();
    return(
        <header className="login-header">
            <div className="login-container">
                <div className="login-logo-section">
                    <NavLink to="/">
                        <img src={dpImg} alt=".." className="login-logo-img"/>
                    </NavLink>
                </div>
                {
                    isLogin != "login" &&
                    <div className="login-right-section">
                        test
                    </div>
                }
            </div>
        </header>
    )
}
export default LoginHeader;