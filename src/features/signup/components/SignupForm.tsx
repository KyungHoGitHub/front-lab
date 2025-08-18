import {useForm, UseFormGetValues} from "react-hook-form"; // getValues 임포트
import React, {ReactNode, useEffect, useState} from "react";

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

} from "../../../shared/utill/validation/validationRules.ts";
import {z} from "zod";
import {LoginFormData} from "@/features/login/types/login.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {TypographyH2} from "@/components/ui/typography/TypographyH2.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select.tsx";
import {SelectValue} from "@radix-ui/react-select";
import {Button} from "@/components/ui/button.tsx";
import {useSignup} from "@/features/signup/hooks/useSignup.ts";
import {Badge} from "@/components/ui/badge.tsx";
import {BadgeCheckIcon} from "lucide-react";

interface SignupFormProps {
    title: string;
}

interface SelectOptions {
    label: ReactNode | string;
    value: string;
}

const FormSchema = z.object({
    userId: z.string().min(2, {
        message: "아이디는 최소 2자 이상이어야 합니다.",
    }),
    password: z.string().min(4, {
        message: "비밀번호는 최소 4자 이상이어야 합니다.",
    }),
})


const SignupForm: React.FC<SignupFormProps> = ({title}) => {
    const {user, setUser} = useUserStore();
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setConfirmShowPassword] = useState<boolean>(false);
    const [userIdCheck, setUserIdCheck] = useState<boolean | null>(null); // null로 초기화하여 상태 구분
    const {onSubmit} = useSignup();
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

    const form = useForm<SignupFormData>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            userId: "",
            password: "",
            confirmPassword: "",
            userName: "",
        },
    });


    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const emailDomainOptions: SelectOptions[] = [
        {
            label: "@naver.com",
            value: "naver.com"
        },
        {
            label: "@google.com",
            value: "google.com"
        },
        {
            label: "@daum.com",
            value: "daum.com"
        },
    ]
    const userCategoryOptions: SelectOptions[] = [
        {
            label:
                <Badge
                    variant="default"
                    className="bg-blue-500 text-white dark:bg-blue-600">

                    관리자
                </Badge>,
            value: "admin"
        },
        {
            label: <Badge variant="secondary">일반 사용자</Badge>,
            value: "user"
        },
    ]

    const submit = async (values: SignupFormData) => {
        setLoading(true);
        try {
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

        <>
            <div className="flex justify-center">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg "
                    >
                        <TypographyH2 title={"회원가입"} className={"text-center"}/>
                        <FormLabel>Email</FormLabel>
                        <div className="flex gap-2">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem className="flex flex-col space-y-1">
                                        <FormControl>
                                            <Input
                                                className="!focus:ring-blue-300"
                                                placeholder="ykh12" {...field}
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="emailDomain"
                                render={({field}) => (
                                    <FormItem className="flex flex-col space-y-1">
                                        <FormControl>
                                            <Select>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="@google.com"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {emailDomainOptions.map((item) => (
                                                        <SelectItem value={item.value}>{item.label}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex gap-2 items-end">
                            <FormField
                                control={form.control}
                                name="userId"
                                render={({field}) => (
                                    <FormItem className="flex flex-col flex-1">
                                        <FormLabel>아이디</FormLabel>

                                        {/* Input + Button 한 줄 */}
                                        <div className="flex gap-2">
                                            <FormControl className="flex-[2]">
                                                <Input
                                                    placeholder="아이디를 입력해주세요"
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                            <Button className="flex-[1]" onClick={userIdCheckClick}>
                                                중복확인
                                            </Button>
                                        </div>

                                        {/* 메시지 아래 고정 */}
                                        <div className="min-h-[20px]">
                                            <FormMessage/>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="userName"
                            render={({field}) => (
                                <FormItem className="flex flex-col space-y-1">
                                    <FormLabel>유저명</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="유저명을 입력해주세요"
                                            {...field}
                                            value={field.value || ""}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem className="flex flex-col space-y-1">
                                    <FormLabel>비밀번호</FormLabel>
                                    <FormControl>
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="비밀번호를 입력해주세요"
                                            {...field}
                                            value={field.value || ""}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="role"
                            render={({field}) => (
                                <FormItem className="flex flex-col space-y-1">
                                    <FormLabel>사용자 구분</FormLabel>
                                    <FormControl>
                                        <Select>
                                            <SelectTrigger className="w-[380px]">
                                                <SelectValue placeholder="관리자 / 일반사용자"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {userCategoryOptions.map((item) => (
                                                    <SelectItem value={item.value}>{item.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" variant="default"
                                className="flex justify-center w-[390px] mx-auto px-6 py-3 font-sans text-lg cursor-pointer">
                            회원가입
                        </Button>
                    </form>

                </Form>
            </div>
            {/*{successMessage && <p className="success-message">{successMessage}</p>}*/}
            {/*<div className="signup-form-title">{title}</div>*/}
            {/*<div className="signup-form-sub">추가적인 설명이 필요 할때</div>*/}
            {/*/!*<div>데이터 없나?{user?.data.userId}</div>*!/*/}
            {/*<form className="signup-form" onSubmit={handleSubmit(submit)} noValidate>*/}
            {/*    <div className="form-group">*/}
            {/*        <label htmlFor="email">Email</label>*/}
            {/*        <div className="form-group-email">*/}
            {/*            <input*/}
            {/*                className={errors.email ? "input-error" : ""}*/}
            {/*                type="email"*/}
            {/*                id="email"*/}
            {/*                disabled={loading}*/}
            {/*                {...register("email", userEmailValidation)}*/}
            {/*                placeholder="이메일을 입력하세요"*/}
            {/*            />*/}
            {/*            <select>*/}
            {/*                {emailSelectOptions.map((item) => (*/}
            {/*                    <option value={item.value}>{item.label}</option>*/}
            {/*                ))}*/}
            {/*            </select>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    {errors.email && <span className="error">{errors.email.message}</span>}*/}
            {/*    <div className="form-group-id">*/}
            {/*        <label htmlFor="userId">ID </label>*/}
            {/*        <input*/}
            {/*            className={errors.userId ? "input-error" : ""}*/}
            {/*            type="text"*/}
            {/*            id="userId"*/}
            {/*            disabled={loading}*/}
            {/*            {...register("userId", userIdValidation)}*/}
            {/*            placeholder="아이디를 입력하세요"*/}
            {/*        />*/}
            {/*        <button type="button"*/}
            {/*                disabled={loading}*/}
            {/*                className="user-id-check-button" onClick={userIdCheckClick}>*/}
            {/*            중복체크*/}
            {/*        </button>*/}
            {/*        {userIdCheck === false && <span className="error">이미 사용 중인 ID입니다.</span>}*/}
            {/*    </div>*/}
            {/*    {errors.userId && <span className="error">{errors.userId.message}</span>}*/}
            {/*    <div className="form-group">*/}
            {/*        <label htmlFor="userName">이름</label>*/}
            {/*        <input*/}
            {/*            className={errors.userName ? "input-error" : ""}*/}
            {/*            type="text"*/}
            {/*            id="userName"*/}
            {/*            disabled={loading}*/}
            {/*            {...register("userName", {*/}
            {/*                required: "이름 입력은 필수 입니다.",*/}
            {/*            })}*/}
            {/*            placeholder="이름을 입력하세요"*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    {errors.userName && <span className="error">{errors.userName.message}</span>}*/}
            {/*    <div className="form-group">*/}
            {/*        <label htmlFor="password">Password</label>*/}
            {/*        <input*/}
            {/*            className={errors.password ? "input-error" : ""}*/}
            {/*            type={showPassword ? "text" : "password"}*/}
            {/*            id="password"*/}
            {/*            disabled={loading}*/}
            {/*            {...register("password", {*/}
            {/*                required: "패스워드 입력은 필수 입니다.",*/}
            {/*            })}*/}
            {/*            placeholder="패스워드를 입력하세요"*/}
            {/*        />*/}
            {/*    </div>*/}

            {/*    {errors.password && <span className="error">{errors.password.message}</span>}*/}

            {/*    <PasswordStrengthBar password={password}/>*/}

            {/*    <div className="form-group">*/}
            {/*        <label htmlFor="confirmPassword">Repeat Password</label>*/}
            {/*        <input*/}
            {/*            type="password"*/}
            {/*            id="confirmPassword"*/}
            {/*            disabled={loading}*/}
            {/*            {...register("confirmPassword", {*/}
            {/*                required: "패스워드 입력은 필수 입니다.",*/}
            {/*                validate: (value) =>*/}
            {/*                    value === watch("password") || "비밀번호가 일치하지 않습니다.",*/}
            {/*            })}*/}
            {/*            placeholder="패스워드 확인 입력"*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}*/}

            {/*    <div className="button-container">*/}
            {/*        <button className="login-form-rightButton" type="submit" disabled={loading}>*/}
            {/*            {loading ? (<><span className="spinner">회원가입 진행중...</span></>) : "회원가입"}*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*</form>*/}
        </>
    );
};

export default SignupForm;