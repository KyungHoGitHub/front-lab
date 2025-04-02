import React from "react";
import "./LoginFooter.css"
import {FaFileAlt, FaLock} from "react-icons/fa";

const LoginFooter:React.FC = ()=>{
    const openPrivacyPolicy = () => {
        window.open("/privacy-policy", "_blank", "width=800,height=600");
    };
    const data = `
    제품에 대한 추가적인 정보가 필요할때
`
    return(
        <div className="login-footer">
            <p className="footer-text" style={{ whiteSpace: 'pre-line' }}>{data}</p>
            <div className="login-footer-options">
                <button className="login-footer-button" onClick={openPrivacyPolicy}>
                    <FaLock className="login-button-icon"/>이용약관
                </button>
                <button className="login-footer-button"
                        onClick={() => window.open("/consent-form", "_blank", "width=800,height=600")}>
                    <FaFileAlt className="login-button-icon"/>
                    개인정보처리방침
                </button>
            </div>
        </div>
    )
}
export default LoginFooter;
