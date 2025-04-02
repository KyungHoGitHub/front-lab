import React from "react";
import {NavLink} from "react-router";
import dpImg from '@assets/top-left-logo.png';
import "./LoginHeader.css"

const LoginHeader:React.FC =() =>{
    return(
        <header className="login-header">
            <div className="login-container">
                <div className="login-logo-section">
                    <NavLink to="/">
                        <img src={dpImg} alt=".." className="login-logo-img"/>
                    </NavLink>
                </div>
            </div>
        </header>
    )
}
export default LoginHeader;