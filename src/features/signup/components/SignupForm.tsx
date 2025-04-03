import {useForm} from "react-hook-form";
import React, {useState} from "react";
import './SignupForm.css';
import PasswordStrengthBar from "./PasswordStrengthBar.tsx";

interface SignupFormProps {
    title: string,
}

type FormData = {
    email: string,
    password: string,
    userId: string,
}

const SignupForm: React.FC<SignupFormProps> = ({title}) => {
    const {
        register,
        watch,
        formState: {errors},
    } = useForm<FormData>({
        defaultValues: {
            email: "",
            userId: "",
            password: "",
        },
        mode: "onSubmit",
        reValidateMode: "onChange",
    })


    const [loading, setLoading] = useState<boolean>(false);
    const password = watch("password") || "";
    return (
        <div className="signup-form-container">
            <div className="signup-form-title">{title}</div>
            <div className="signup-form-sub">
                추가적인 설명이 필요 할때
            </div>
            { /*todo submit 나중에 추가해야함*/}

            <form className="signup-form">
                <div className="form-group">
                    <label htmlFor="email"></label>
                    <input
                        className={errors.email ? "input-error" : ""}
                        type="email"
                        id="email"
                        {...register("email", {
                            required: "이메일 입력은 필수 입니다."
                        })}
                        placeholder="이메일을 입력하세요"
                    />
                </div>
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
                <PasswordStrengthBar password={password}/>

                <div className="button-container">
                    <button className="login-form-rightButton" disabled={loading}>
                        회원가입
                    </button>
                </div>
            </form>
        </div>
    )
}
export default SignupForm;