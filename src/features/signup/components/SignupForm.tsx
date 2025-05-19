import { useForm, UseFormGetValues } from "react-hook-form"; // getValues 임포트
import React, {useEffect, useState} from "react";
import "./SignupForm.css";
import PasswordStrengthBar from "./PasswordStrengthBar.tsx";
import {getUserInfo, signup, validUserId} from "../api/signup.ts";
import {useUserStore} from "../../../storage/userStore.ts";
import {useNavigate} from "react-router";

interface SignupFormProps {
    title: string;
}

interface FormData {
    email: string;
    password: string;
    userId: string;
    confirmPassword: string;
    userName: string;
}

const SignupForm: React.FC<SignupFormProps> = ({ title }) => {
    const {user, setUser } = useUserStore();
    const navigate = useNavigate();
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
        getValues, // getValues 추가
    } = useForm<FormData>({
        defaultValues: {
            email: "",
            userId: "",
            password: "",
            confirmPassword: "",
            userName: "",
        },
        mode: "onSubmit",
        reValidateMode: "onChange",
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setConfirmShowPassword] = useState<boolean>(false);
    const [userIdCheck, setUserIdCheck] = useState<boolean | null>(null); // null로 초기화하여 상태 구분

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const submit = async (values: FormData) => {

        try {
            const { confirmPassword, ...signupData } = values;

            const res = await signup(signupData);
            console.log("회원가입 처리",res.data)
            if (res.data){
                console.log("회원가입 하고 데이터 있으면",res.data)
                const userInfo = await  getUserInfo({userIdx: Number(res.data.data.idx)});
                setUser(userInfo.data.data);
            }
            navigate("/login");
        } catch (error) {
            console.log("Signup error:", error);
        }
    };

    // TODO 중복 체크 확인후 적용
    useEffect(() => {

    }, [user]);
    const userIdCheckClick = async () => {
        try {
            const values = getValues(); // 현재 폼 값 가져오기

            if (!values.userId) {

                return;
            }
            const res = await validUserId(values.userId);

            if (res.data =='') {
            setUserIdCheck(true);

            }
        } catch (error) {

        }
    };


    const password = watch("password") || "";

    return (
        <div className="signup-form-container">
            <div className="signup-form-title">{title}</div>
            <div className="signup-form-sub">추가적인 설명이 필요 할때</div>
            {/*<div>데이터 없나?{user?.data.userId}</div>*/}
            <form className="signup-form" onSubmit={handleSubmit(submit)}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        className={errors.email ? "input-error" : ""}
                        type="email"
                        id="email"
                        {...register("email", {
                            required: "이메일 입력은 필수 입니다.",
                        })}
                        placeholder="이메일을 입력하세요"
                    />
                </div>
                <div className="form-group-id">
                    <label htmlFor="userId">ID </label>
                    <input
                        className={errors.userId ? "input-error" : ""}
                        type="text"
                        id="userId"
                        {...register("userId", {
                            required: "아이디 입력은 필수 입니다.",
                        })}
                        placeholder="아이디를 입력하세요"
                    />
                    {/*<button type="button" className="user-id-check-button" onClick={userIdCheckClick}>*/}
                    {/*    중복체크*/}
                    {/*</button>*/}
                    {/*{userIdCheck === true && <span className="success">사용 가능한 ID입니다.</span>}*/}
                    {/*{userIdCheck === false && <span className="error">이미 사용 중인 ID입니다.</span>}*/}
                    {/* <button type="button" className="user-id-check-button" onClick={() => userIdCheckClick(values)}> */}
                    {/* 주석 처리된 부분은 values 전달이 불가능하므로 제거 */}
                </div>
                {errors.userId && <span className="error">{errors.userId.message}</span>}
                <div className="form-group">
                    <label htmlFor="userName">이름</label>
                    <input
                        className={errors.userName ? "input-error" : ""}
                        type="text"
                        id="userName"
                        {...register("userName", {
                            required: "이름 입력은 필수 입니다.",
                        })}
                        placeholder="이름을 입력하세요"
                    />
                </div>
                {errors.userName && <span className="error">{errors.userName.message}</span>}
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        {...register("password", {
                            required: "패스워드 입력은 필수 입니다.",
                        })}
                        placeholder="패스워드를 입력하세요"
                    />
                </div>
                {errors.password && <span className="error">{errors.password.message}</span>}

                <PasswordStrengthBar password={password} />

                <div className="form-group">
                    <label htmlFor="confirmPassword">Repeat Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        {...register("confirmPassword", {
                            required: "패스워드 입력은 필수 입니다.",
                            validate: (value) =>
                                value === watch("password") || "비밀번호가 일치하지 않습니다.",
                        })}
                        placeholder="패스워드 확인 입력"
                    />
                </div>
                {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}

                <div className="button-container">
                    <button className="login-form-rightButton" type="submit" disabled={loading}>
                        회원가입
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignupForm;