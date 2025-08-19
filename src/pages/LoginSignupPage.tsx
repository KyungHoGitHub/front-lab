import React, {useEffect, useState} from "react";
import LoginHeader from "../shared/component/layout/header/LoginHeader.tsx";
import test from '@assets/lefImage.png';
import LoginFooter from "../shared/component/layout/footer/LoginFooter.tsx";
import './LoginSignupPage.css';
import signup from '@assets/signupImage.jpg';
import {useLocation, useNavigate} from "react-router";
import Confetti from "react-confetti";
import {toast} from "react-toastify";
import {useWindowSize} from "react-use";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {Button} from "@/components/ui/button.tsx";
interface LoginSignupProps {
    formComponent: React.ReactNode;
}

const LoginSignupPage: React.FC<LoginSignupProps> = ({formComponent}) => {
    const { state } = useLocation();
    const { width, height } = useWindowSize();
    const location = useLocation();
    const navigate = useNavigate();
    const [showConfetti, setShowConfetti] = useState(false);
    const [showAlert, setShowAlert] = useState(true);
    const [loginCheck, setLoginCheck] = useState<boolean>();
    const [hasShownConfetti, setHasShownConfetti] = useState(false);
    const testValue = location.pathname.includes("login");
    console.log("->>>>>>>>>>>>>",  state);
    useEffect(() => {
        setLoginCheck(testValue)
        if (state?.signupSuccess && !hasShownConfetti) {
            setShowAlert(true); // Alert 표시
            setShowConfetti(true);
            setHasShownConfetti(true);
            setTimeout(() => {
                setShowAlert(false);
                setShowConfetti(false);
            }, 3000);
            navigate("/login", { replace: true, state: {} });
        }
    }, [testValue,state]);

    return (
        <div className="loginSignup-page-container">
            <LoginHeader/>
            {showConfetti && (
                <Confetti
                    width={width}
                    height={height}
                    recycle={false}
                    numberOfPieces={200}
                    gravity={0.3}
                />
            )}
            {showAlert && (
                <div className="fixed inset-0 flex items-start justify-center z-50 pt-40">
                    <Alert className="custom-alert max-w-sm w-full">
                        <AlertTitle className="text-green-600 text-xl font-semibold">
                            🥳Welcome🥳
                        </AlertTitle>

                    </Alert>
                </div>
            )}
            <main className="loginSignup-page-main">
                {/*<div className="loginSignup-image">*/}
                {/*    <img src={loginCheck ? test : signup} alt="..." className="loginSignup-image-img"/>*/}
                {/*</div>*/}

                <p>{state?.signupSuccess}</p>
                <div className="loginSignup-page-form-wrapper">
                    {formComponent}
                </div>
            </main>
            <LoginFooter/>
        </div>
    )
}
export default LoginSignupPage;