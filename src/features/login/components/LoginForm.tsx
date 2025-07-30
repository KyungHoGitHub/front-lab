import React, {useState} from "react";
import {useForm} from "react-hook-form";
import "./LoginForm.css"
import {useNavigate} from "react-router";
import {GoogleOAuthProvider} from "@react-oauth/google";
import OathLoginButton from "./OathLoginButton.tsx";
import {loginForm} from "../api/login.ts";
import {useAuth} from "../../contexts/components/AuthProvider.tsx";
import {LoginFormData} from "../types/login.ts";
import {toast} from "react-toastify";
import {mapErrorMessage} from "../../../shared/utill/errorUtill.ts";
import KakaoLoginButton from "./KakaoLoginButton.tsx";
import {extractData} from "../../../shared/utill/response.ts";
import dayjs from "dayjs";

interface LoginFormProps {
    title: string,
}

const LoginForm: React.FC<LoginFormProps> = ({title}) => {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");

    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm<LoginFormData>({
        defaultValues: {
            userId: "",
            password: "",
        },
        mode: "onSubmit",
        reValidateMode: "onChange",
    })

    const submit = async (formData: LoginFormData) => {
        setLoading(true);
        try {

            const test = {
                ...formData,
                loginType: "ID_PASSWORD"
            }
            console.log('test', test);
            const res = await loginForm(test);
            const  data = extractData(res)
            if (data.accessToken) {
                login(data.accessToken);
                navigate("/home");
            } else {
                setErrorMsg("서버에 문제가 발생하였습니다.")
                toast.error(errorMsg);
            }
        } catch (error) {
            const message = mapErrorMessage(error);
            setErrorMsg("서버에 문제가 발생하였습니다.")
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-form-container">
            <div className="login-form-title">{title}</div>
            <div className="login-form-sub">
                추가적인 설명이 필요 할때
            </div>
            <form className="login-form" onSubmit={handleSubmit(submit)}>
                <div className="form-group">
                    <label htmlFor="userId"></label>
                    <input
                        className={errors.userId ? "input-error" : ""}
                        type="text"
                        id="userId"
                        disabled={loading}
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
                        type={showPassword ? "text" : "password"}
                        id="password"
                        disabled={loading}
                        {...register("password", {
                            required: "패스워드 입력은 필수 입니다."
                        })}
                        placeholder="패스워드를 입력하세요"
                    />
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <label
                        style={{
                            display: "flex",         // 내부 요소를 수평 정렬
                            alignItems: "center",
                            justifyContent: "flex-start" // 라벨 안 요소 왼쪽 정렬
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={(e) => setShowPassword(e.target.checked)}
                            style={{marginRight: "0px"}}
                        />
                        비밀번호 보기
                    </label>
                </div>
                {errors.password && <span className="error">{errors.password.message}</span>}
                <div className="button-container">
                    <button className="login-form-leftButton" type="submit" disabled={loading}>
                        {loading ? (<><span className="spinner"> 로그인 중...</span></>) : "로그인"}
                    </button>
                    <GoogleOAuthProvider clientId={"test"}>
                        <OathLoginButton/>
                    </GoogleOAuthProvider>
                    <KakaoLoginButton/>
                </div>
            </form>
        </div>
    )
}
export default LoginForm;