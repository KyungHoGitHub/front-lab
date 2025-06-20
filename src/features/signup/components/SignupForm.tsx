import {useForm, UseFormGetValues} from "react-hook-form"; // getValues 임포트
import React, {useEffect, useState} from "react";
import "./SignupForm.css";
import PasswordStrengthBar from "./PasswordStrengthBar.tsx";
import {getUserInfo, signup, validUserId} from "../api/signup.ts";
import {useUserStore} from "../../../storage/userStore.ts";
import {useNavigate} from "react-router";
import {SignupFormData} from "../types/signup.ts";
import {toSignupRequest} from "../mappers/sigunupMapper.ts";

interface SignupFormProps {
    title: string;
}

//  제출 form 데이터 타입 정의
// interface FormData {
//     email: string;
//     password: string;
//     userId: string;
//     confirmPassword: string;
//     userName: string;
// }

const SignupForm: React.FC<SignupFormProps> = ({title}) => {
    const {user, setUser} = useUserStore();
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    // form 제어 및  초기화를 위해 useForm 훅 사용
    const {
        register,
        watch,
        handleSubmit,
        formState: {errors},
        getValues, // getValues 추가
    } = useForm<SignupFormData>({
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

    const submit = async (values: SignupFormData) => {

        try {
            // const { confirmPassword, ...signupData } = values;
            const formData = toSignupRequest(values);
            const res = await signup(formData);

            if (res.data) {
                const userInfo = await getUserInfo(res.data.data.idx);
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
        console.log('중복체크 벨류 값~~~~~');
        try {

            const values = getValues(); // 현재 폼 값 가져오기
            console.log('중복체크 벨류 값~~~~~', values);
            if (!values.userId) {

                return;
            }

            console.log('중복체크 벨DDDDDDDD류 값~~~~~', values.userId);
            const res = await validUserId(values.userId);
            setUserIdCheck(true);
            setSuccessMessage("이용 가능한 아이디 입니다.");
            setTimeout(() => {
                setSuccessMessage("");
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    };


    const password = watch("password") || "";

    return (
        <div className="signup-form-container">
            {successMessage && <p className="success-message">{successMessage}</p>}
            <div className="signup-form-title">{title}</div>
            <div className="signup-form-sub">추가적인 설명이 필요 할때</div>
            {/*<div>데이터 없나?{user?.data.userId}</div>*/}
            <form className="signup-form" onSubmit={handleSubmit(submit)} noValidate>
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
                {errors.email && <span className="error">{errors.email.message}</span>}
                {/*{errors.email && (*/}
                {/*    <span className="field-error" id="email-error" role="alert" >*/}
                {/*        {errors.email.message}*/}
                {/*    </span>*/}
                {/*)}*/}
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
                    <button type="button" className="user-id-check-button" onClick={userIdCheckClick}>
                        중복체크
                    </button>
                    {/*{userIdCheck === true && <span className="success">사용 가능한 ID입니다.</span>}*/}
                    {userIdCheck === false && <span className="error">이미 사용 중인 ID입니다.</span>}
                    {/*<button type="button" className="user-id-check-button" onClick={() => userIdCheckClick(values)}>*/}
                    {/*</button>*/}
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
                        className={errors.password ? "input-error" : ""}
                        type={showPassword ? "text" : "password"}
                        id="password"
                        {...register("password", {
                            required: "패스워드 입력은 필수 입니다.",
                        })}
                        placeholder="패스워드를 입력하세요"
                    />
                </div>

                {errors.password && <span className="error">{errors.password.message}</span>}

                <PasswordStrengthBar password={password}/>

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