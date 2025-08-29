import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router";
import {GoogleOAuthProvider} from "@react-oauth/google";
import OathLoginButton from "./OathLoginButton.tsx";
import {LoginFormData} from "../types/login.ts";
import KakaoLoginButton from "./KakaoLoginButton.tsx";
import {LoginTypes} from "../enums/loginTypes.ts";
import {Button} from "@/components/ui/button.tsx";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Label} from "@/components/ui/label.tsx";
import {TypographyH2} from "@/components/ui/typography/TypographyH2.tsx";
import DividerWithText from "@/shared/component/divider/DividerWithText.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import boomImg from '@assets/prefix.jpeg';
import {useLogin} from "@/features/login/hooks/useLogin.ts";
import {clsx} from "clsx";
import {CLIENT_ID} from "@/config.ts";

// 로그인 폼 유효성 검사 객체 정의
const FormSchema = z.object({
    userId: z.string()
        .trim()
        .min(2, {
            message: "아이디는 최소 2자 이상이어야 합니다.",
        })
        .regex(/^[a-zA-Z0-9]+$/, {message: "아이디는 영문과 숫자만 가능합니다."}),
    password: z.string()
        .trim()
        .min(4, {
        message: "비밀번호는 최소 4자 이상이어야 합니다.",
    }),
})

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [loginType, setLoginType] = useState<LoginTypes>(LoginTypes.ID_PASSWORD);
    const { loginUser } = useLogin();

    // todo 로그인 버튼 className 선언 -> 나중에 cva 로 적용하기!
    const loginButtonClass = clsx(
        "flex justify-center w-[320px] h-[45px] mx-auto",
        "px-6 py-3 font-sans text-lg cursor-pointer",
        "bg-blue-400 text-white rounded-lg shadow-md",
        "transition-transform duration-100 ease-in-out",
        "hover:bg-blue-500 hover:scale-105",
        "active:scale-95"
    );

    /**
     * form userForm 객체 사용,
     * zod 유효성 객체 생성 사용
     * form filed 기본 값 정의
     */
    const form = useForm<LoginFormData>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            userId: "",
            password: "",
        },
    });

    const onSubmit = async (formData: LoginFormData) => {
        setLoading(true);
        const res = await loginUser(formData,loginType);
        if(res){
            navigate("/home");
        }
        setLoading(false);
    };

    return (
        <div
            className="w-[435px] h-[750px] flex flex-col items-center gap-6 border border-gray-300 rounded-lg shadow-lg  bg-white mx-auto ">
            <div className="flex items-center gap-2 mt-7">
                <Avatar className="w-24 h-24">
                    <AvatarImage src={boomImg}/>
                    <AvatarFallback>Null</AvatarFallback>
                </Avatar>
            </div>
            <div className="flex justify-center">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full max-w-md p-8 space-y-2 bg-white rounded-lg "
                    >
                        <TypographyH2 title={"로그인"} className={"text-center"}/>
                        {/* 아이디 */}
                        <FormField
                            control={form.control}
                            name="userId"
                            render={({field}) => (
                                <FormItem className="flex flex-col space-y-1">
                                    <FormLabel>아이디</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="!ring-blue-400"
                                            placeholder="아이디를 입력해주세요" {...field}
                                            value={field.value || ""}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        {/* 비밀번호 */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem className="flex flex-col space-y-1">
                                    <FormLabel>비밀번호</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="!ring-blue-400"
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
                        {/* 비밀번호 보기 체크박스 */}
                        <div className="flex items-center gap-3">
                            <Checkbox
                                id="showPassword"
                                checked={showPassword}
                                onCheckedChange={(checked) => setShowPassword(!!checked)}
                                variant="red"
                                size="md"
                            />
                            <Label htmlFor="showPassword" className="!text-sm !font-medium !text-gray-700">비밀번호
                                보기</Label>
                        </div>
                        <Button type="submit" variant="default"
                                className={loginButtonClass}
                                onClick={() => setLoginType(LoginTypes.ID_PASSWORD)}
                        > {loading ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                </svg>
                                로그인 중...
                            </span>
                        ) : (
                            "로그인"
                        )}</Button>
                        <DividerWithText children={"or"}/>
                        <div className="flex flex-col gap-3 items-center">
                            <GoogleOAuthProvider
                                clientId={CLIENT_ID}>
                                <OathLoginButton/>
                            </GoogleOAuthProvider>
                            <KakaoLoginButton/>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}
export default LoginForm;