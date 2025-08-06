import {useForm, UseFormGetValues} from "react-hook-form"; // getValues 임포트
import React, {useEffect, useState} from "react";
import "./SignupForm.css";
import PasswordStrengthBar from "./PasswordStrengthBar.tsx";
import {getUserInfo, signup, validUserId} from "../api/signup.ts";
import {useUserStore} from "../../../storage/userStore.ts";
import {useNavigate} from "react-router";
import {SignupFormData} from "../types/signup.ts";
import {toSignupRequest} from "../mappers/sigunupMapper.ts";
import {mapErrorMessage} from "../../../shared/utill/errorUtill.ts";
import {toast} from "react-toastify";
import {extractData} from "../../../shared/utill/response.ts";
import {
    userEmailValidation,
    userIdValidation,
    userPasswordValidation
} from "../../../shared/utill/validation/validationRules.ts";

interface SignupFormProps {
    title: string;
}

type EmailSelectOptions = {
    label: string;
    value: string;
}

const SignupForm: React.FC<SignupFormProps> = ({title}) => {
    const {user, setUser} = useUserStore();
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setConfirmShowPassword] = useState<boolean>(false);
    const [userIdCheck, setUserIdCheck] = useState<boolean | null>(null); // null로 초기화하여 상태 구분

    // form 제어 및  초기화를 위해 useForm 훅 사용
    const {
        register,
        watch,
        handleSubmit,
        formState: {errors},
        getValues, // getValues 추가
        trigger,
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

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const emailSelectOptions: EmailSelectOptions[] = [
        {
            label: "@naver.com",
            value: "naver.com"
        },
        {
            label: "@google.com",
            value: "google.com"
        },
    ]
    const submit = async (values: SignupFormData) => {
        setLoading(true);
        try {
            // const { confirmPassword, ...signupData } = values;
            const formData = toSignupRequest(values);
            const res = await signup(formData);
            const data = extractData(res);
            if (res.data) {
                const userInfo = await getUserInfo(data.idx);
                setUser(userInfo.data.data);
            }
            navigate("/login");
        } catch (error) {
            const message = mapErrorMessage(error);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    // TODO 중복 체크 확인후 적용
    useEffect(() => {

    }, [user]);

    const userIdCheckClick = async () => {
        const isValid = await trigger("userId");
        if (!isValid) {
            toast.warning("아이디 형식을 다시 확인해주세요.");
            return;
        }
        try {
            const values = getValues(); // 현재 폼 값 가져오기

            if (!values.userId) {
                toast.warning("아이디를 입력해주세요.");
                return;
            }
            const res = await validUserId(values.userId);

            setUserIdCheck(true);
            setSuccessMessage("이용 가능한 아이디 입니다.");
            setTimeout(() => {
                setSuccessMessage("");
            }, 2000);
        } catch (error) {
            setUserIdCheck(false);
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
                    <div className="form-group-email">
                        <input
                            className={errors.email ? "input-error" : ""}
                            type="email"
                            id="email"
                            disabled={loading}
                            {...register("email", userEmailValidation)}
                            placeholder="이메일을 입력하세요"
                        />
                        <select>
                            {emailSelectOptions.map((item) => (
                                <option value={item.value}>{item.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {errors.email && <span className="error">{errors.email.message}</span>}
                <div className="form-group-id">
                    <label htmlFor="userId">ID </label>
                    <input
                        className={errors.userId ? "input-error" : ""}
                        type="text"
                        id="userId"
                        disabled={loading}
                        {...register("userId", userIdValidation)}
                        placeholder="아이디를 입력하세요"
                    />
                    <button type="button"
                            disabled={loading}
                            className="user-id-check-button" onClick={userIdCheckClick}>
                        중복체크
                    </button>
                    {userIdCheck === false && <span className="error">이미 사용 중인 ID입니다.</span>}
                </div>
                {errors.userId && <span className="error">{errors.userId.message}</span>}
                <div className="form-group">
                    <label htmlFor="userName">이름</label>
                    <input
                        className={errors.userName ? "input-error" : ""}
                        type="text"
                        id="userName"
                        disabled={loading}
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
                        disabled={loading}
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
                        disabled={loading}
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
                        {loading ? (<><span className="spinner">회원가입 진행중...</span></>) : "회원가입"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignupForm;