import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router";
import {GoogleOAuthProvider} from "@react-oauth/google";
import OathLoginButton from "./OathLoginButton.tsx";
import {googleLoginForm, loginForm} from "../api/login.ts";
import {useAuth} from "../../contexts/components/AuthProvider.tsx";
import {LoginFormData} from "../types/login.ts";
import {toast} from "react-toastify";
import {mapErrorMessage} from "../../../shared/utill/errorUtill.ts";
import KakaoLoginButton from "./KakaoLoginButton.tsx";
import {extractData} from "../../../shared/utill/response.ts";
import {useUserStore} from "../../../storage/userStore.ts";
import {LoginTypes} from "../enums/loginTypes.ts";
import {Button} from "@/components/ui/button.tsx";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Label} from "@/components/ui/label.tsx";
import {TypographyH3} from "@/components/ui/typography/TypographyH3.tsx";
import {TypographyH2} from "@/components/ui/typography/TypographyH2.tsx";
import DividerWithText from "@/shared/component/divider/DividerWithText.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import boomImg from '@assets/prefix.jpeg';
import {jwtDecode} from "jwt-decode";

interface LoginFormProps {
    title: string,
}

const parseJwt = (token: string) => {
    try {
        const base64Payload = token.split('.')[1];
        const playload = atob(base64Payload);
        return JSON.parse(playload)
    } catch (e) {
        return null;
    }
}

const FormSchema = z.object({
    userId: z.string()
        .min(2, {
            message: "아이디는 최소 2자 이상이어야 합니다.",
        })
        .regex(/^[a-zA-Z0-9]+$/, {message: "아이디는 영문과 숫자만 가능합니다."})
    ,
    password: z.string().min(4, {
        message: "비밀번호는 최소 4자 이상이어야 합니다.",
    }),
})


const LoginForm: React.FC<LoginFormProps> = ({title}) => {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [loginType, setLoginType] = useState<LoginTypes>(LoginTypes.ID_PASSWORD);
    const setUser = useUserStore((state) => state.setUser);

    const form = useForm<LoginFormData>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            userId: "",
            password: "",
        },
    });
    const handleGoogleLogin = async (credentialResponse: any) =>{
        const token = credentialResponse.credential;
        const userInfo = jwtDecode(token);
        console.log('구글 로그인한 유저 정보', userInfo);
        try{
        const res  = await googleLoginForm(token);

        console.log(res);

        }catch (error){
            console.log(error)
        }
    }

    const onSubmit = async (formData: LoginFormData) => {
        console.log("폼 제출됨", formData);
        setLoading(true);
        try {
            const test = {
                ...formData,
                loginType: loginType
            }
            const res = await loginForm(test);
            const data = extractData(res);

            const payload = parseJwt(data.accessToken);
            const userData = {
                userId: payload.userId,
                username: payload.sub,
                role: payload.role,
            };

            setUser(userData);

            // 상태 관리 예시
            console.log("로그인 성공", userData);
            console.log('dat', data)
            console.log('data accesstoken', data)
            if (data.accessToken) {
                login(data.accessToken);
                console.log("들어옴??")
                navigate("/home");
            }
        } catch (error) {
            const message = mapErrorMessage(error);
            setErrorMsg("서버에 문제가 발생하였습니다.");
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex flex-col items-center gap-6 border border-gray-300 rounded-lg shadow-lg w-[435px] h-[735px] bg-white mx-auto " >
            <div className="flex items-center gap-2 mt-8">
                <Avatar className="w-24 h-24">
                    <AvatarImage src={boomImg}/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <div className="flex justify-center">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg "
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
                                            className="!focus:ring-blue-300"
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
                                className="flex justify-center w-[320px] mx-auto px-6 py-3 font-sans text-lg cursor-pointer"
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
                            <GoogleOAuthProvider clientId="780923997453-3ftob69gfdffi9qinnm7rcj5qmfjqk74.apps.googleusercontent.com">
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