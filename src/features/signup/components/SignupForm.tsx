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
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {TypographyH2} from "@/components/ui/typography/TypographyH2.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select.tsx";
import {SelectValue} from "@radix-ui/react-select";
import {Button} from "@/components/ui/button.tsx";
import {useSignup} from "@/features/signup/hooks/useSignup.ts";
import {Badge} from "@/components/ui/badge.tsx";

interface SignupFormProps {
    title: string;
}

interface SelectOptions {
    label: React.ReactNode | string;
    value: string;
}

const FormSchema = z.object({
    email: z.string().min(1, { message: "이메일을 입력해주세요." }),
    emailDomain: z.string().min(1, { message: "이메일 도메인을 선택해주세요." }),
    userId: z.string().min(2, { message: "아이디는 최소 2자 이상이어야 합니다." }),
    password: z.string().min(4, { message: "비밀번호는 최소 4자 이상이어야 합니다." }),
    userName: z.string().min(2, { message: "유저명은 최소 2자 이상이어야 합니다." }),
    role: z.string().min(1, { message: "사용자 구분을 선택해주세요." }),
});

const SignupForm: React.FC<SignupFormProps> = ({ title }) => {
    const { setUser } = useUserStore();
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [userIdCheck, setUserIdCheck] = useState<boolean>(false);
    const { onSubmit } = useSignup();

    const form = useForm<SignupFormData>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            emailDomain: "",
            userId: "",
            password: "",
            userName: "",
            role: "",
        },
        mode: "onSubmit",
    });

    const userIdCheckClick = async () => {
        await form.clearErrors("password"); // password 에러 초기화
        const isValid = await form.trigger("userId", { shouldFocus: true });
        console.log("Trigger result for userId:", isValid);
        console.log("Form errors:", form.formState.errors);
        if (!isValid) {
            toast.warning("아이디 형식을 다시 확인해주세요.");
            return;
        }
        try {
            const values = form.getValues();
            if (!values.userId) {
                toast.warning("아이디를 입력해주세요.");
                return;
            }
            const res = await validUserId(values.userId);
            console.log("validUserId response:", res);
            if (res.status == 200 ) {
                setUserIdCheck(true);
                setSuccessMessage("이용 가능한 아이디입니다.");
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 2000);
            } else {
                throw new Error(res.message || "아이디 중복 확인 실패");
            }
        } catch (error) {
            setUserIdCheck(false);
            toast.error(error.message || "아이디 중복 확인에 실패했습니다.");
            console.error("userIdCheck error:", error);
        }
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const emailDomainOptions: SelectOptions[] = [
        { label: "@naver.com", value: "@naver.com" },
        { label: "@google.com", value: "@google.com" },
        { label: "@daum.com", value: "@daum.com" },
    ];

    const userCategoryOptions: SelectOptions[] = [
        {
            label: (
                <Badge variant="default" className="bg-blue-500 text-white dark:bg-blue-600">
                    관리자
                </Badge>
            ),
            value: "admin",
        },
        {
            label: <Badge variant="secondary">일반 사용자</Badge>,
            value: "user",
        },
    ];

    return (
        <div className="flex justify-center">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit((data) => {
                        console.log("Submitted form data:", data); // 디버깅 로그
                        onSubmit(data);
                    })}
                    className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg"
                >
                    <TypographyH2 title="회원가입" className="text-center"/>
                    <div className="flex gap-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem className="flex flex-col space-y-1 flex-1">
                                    <FormLabel>이메일</FormLabel>
                                    <FormControl>
                                        <Input placeholder="ykh12" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="emailDomain"
                            render={({field}) => (
                                <FormItem className="flex flex-col space-y-1 flex-1">
                                    <FormLabel>&nbsp;</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => {
                                                console.log("emailDomain selected:", value); // 디버깅 로그
                                                field.onChange(value);
                                            }}
                                            value={field.value}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="도메인 선택"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {emailDomainOptions.map((item) => (
                                                    <SelectItem key={item.value} value={item.value}>
                                                        {item.label}
                                                    </SelectItem>
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
                                    <div className="flex gap-2">
                                        <FormControl className="flex-[2]">
                                            <Input placeholder="아이디를 입력해주세요" {...field} />
                                        </FormControl>
                                        <Button type="button" className="flex-[1]" onClick={userIdCheckClick}>
                                            중복확인
                                        </Button>
                                    </div>
                                    <div className="min-h-[20px]">
                                        {successMessage && <p className="text-green-600 text-sm">{successMessage}</p>}
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
                                    <Input placeholder="유저명을 입력해주세요" {...field} />
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
                                    />
                                </FormControl>
                                <FormMessage/>
                                <Button
                                    type="button"
                                    variant="link"
                                    className="text-sm p-0 h-auto"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                                </Button>
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
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="관리자 / 일반사용자"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {userCategoryOptions.map((item) => (
                                                <SelectItem key={item.value} value={item.value}>
                                                    {item.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        variant="default"
                        className="w-full px-6 py-3 font-sans text-lg"
                        disabled={loading || !userIdCheck}
                    >
                        {loading ? "회원가입 중..." : "회원가입"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default SignupForm;