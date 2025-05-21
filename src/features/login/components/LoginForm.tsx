import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import "./LoginForm.css"
import {useNavigate} from "react-router";
import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";
import OathLoginButton from "./OathLoginButton.tsx";
import {login, loginForm} from "../api/login.ts";
import {useAuth} from "../../contexts/components/AuthProvider.tsx";

interface LoginFormProps {
    title: string,
}

type FormData = {
    userId: string;
    password: string;
}

const LoginForm: React.FC<LoginFormProps> = ({title}) => {
    const {login} = useAuth();
    const navigate = useNavigate();

    const signupButtonClick = () => {
        navigate("/test/signup");
    }

    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm<FormData>({
        defaultValues: {
            userId: "",
            password: "",
        },
        mode: "onSubmit",
        reValidateMode: "onChange",
    })


    const [loading, setLoading] = useState<boolean>(false);

    const submit = async (data:FormData)=>{
        // setLoading(true);
        const {...signup}= data;
        try{
            const res = await loginForm(signup);
            console.log(res.data.data.accessToken);
            if(res.data.data.accessToken){
                login(res.data.data.accessToken);
                navigate("/usage");
            }
/*            console.log('res', res);
            // console.log("왜안감?")
            navigate("/usage");*/

            // setLoading(false);
        }catch (error){
            console.log(error)
        }
    }
    useEffect(() => {
        // localStorage.removeItem("accessToken");
    }, []);
    return (

        <div className="login-form-container">
            <div className="login-form-title">{title}</div>
            <div className="login-form-sub">
                추가적인 설명이 필요 할때
            </div>
            { /*todo submit 나중에 추가해야함*/}
            <form className="login-form" onSubmit={handleSubmit(submit)}>
                <div className="form-group">
                    <label htmlFor="userId"></label>
                    <input
                        className={errors.userId ? "input-error" : ""}
                        type="text"
                        id="userId"
                        {...register("userId", {
                            required: "아이디 입력은 필수 입니다."
                        })}
                        placeholder="아이디를 입력하세요"
                    />
                </div>
                {errors.userId && <span className="error">{errors.userId.message}</span>}
                <div className="form-group">
                    <label htmlFor="password"></label>
                    <input
                        type="password"
                        id="password"
                        {...register("password", {
                            required: "패스워드 입력은 필수 입니다."
                        })}
                        placeholder="패스워드를 입력하세요"
                    />
                </div>
                {errors.password && <span className="error">{errors.password.message}</span>}
                <div className="button-container">
                    <button className="login-form-leftButton" type="submit"  disabled={loading}>
                        {loading ? "로그인중" : "로그인"}
                    </button>
                    <GoogleOAuthProvider clientId={"test"}>
                        <OathLoginButton/>
                    </GoogleOAuthProvider>
                </div>
            </form>

        </div>

    )
}
export default LoginForm;