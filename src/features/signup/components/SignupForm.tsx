import {useForm} from "react-hook-form"; // getValues 임포트
import React, {useState} from "react";

import {validUserId} from "../api/signup.ts";
import {useUserStore} from "../../../storage/userStore.ts";
import {useNavigate} from "react-router";
import {SignupFormData} from "../types/signup.ts";
import {toast} from "react-toastify";
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
import {EyeIcon, EyeOffIcon} from "lucide-react";
import {UserRole} from "@/features/signup/types/UserRole.ts";
import {clsx} from "clsx";
import {SignupError} from "@/features/signup/errors/SignupError.ts";
import {HttpStatus} from "@/constants/httpStatus.ts";


interface SignupFormProps {
    title: string;
}

interface SelectOptions {
    label: React.ReactNode | string;
    value: string;
}

const FormSchema = z.object({
    email: z.string().min(1, {message: "이메일을 입력해주세요."}),
    emailDomain: z.string().min(1, {message: "이메일 도메인을 선택해주세요."}),
    userId: z.string().min(2, {message: "아이디는 최소 2자 이상이어야 합니다."}),
    password: z.string().min(4, {message: "비밀번호는 최소 4자 이상이어야 합니다."}),
    userName: z.string().min(2, {message: "유저명은 최소 2자 이상이어야 합니다."}),
    role: z.string().min(1, {message: "사용자 구분을 선택해주세요."}),
    confirmPassword: z.string().min(8, {message: '비밀번호 확인은 최소 8자 이상이어야 합니다.'}),
}).refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'], // 에러 메시지를 confirmPassword 필드에 표시
})

const SignupForm: React.FC<SignupFormProps> = ({title}) => {
    const {setUser} = useUserStore();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [userIdCheck, setUserIdCheck] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const {onSubmit} = useSignup();

    const form = useForm<SignupFormData>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            emailDomain: "",
            userId: "",
            password: "",
            userName: "",
            role: UserRole.User,
            confirmPassword: "",
        },
        mode: "onSubmit",
    });

    const userIdCheckClick = async () => {
        form.clearErrors("password"); // password 에러 초기화
        const isValid = await form.trigger("userId", {shouldFocus: true});

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
            console.log("데이터 확인",res)
            if (res.status == 200) {
                setUserIdCheck(true);
                setSuccessMessage("이용 가능한 아이디입니다.");
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 2000);
            }
        } catch (error) {
            if(error.response){
                const status = error.response.status;
                if (status === HttpStatus.NOT_FOUND){
                    toast.error("이미 사용중인 아이디 입니다.");
                }
            }else{

            setUserIdCheck(false);
            toast.error(error.message || "아이디 중복 확인에 실패했습니다.");
            console.error("userIdCheck error:", error);
            }
        }
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    // 이메일 도메인 선택 옵션 목록
    const emailDomainOptions: SelectOptions[] = [
        {label: "@naver.com", value: "@naver.com"},
        {label: "@google.com", value: "@google.com"},
        {label: "@daum.com", value: "@daum.com"},
    ];

    // 유저 구분 선택 옵션 목록
    const userCategoryOptions: SelectOptions[] = [
        {
            label: (
                <Badge variant="default" className="bg-blue-500 text-white dark:bg-blue-600">
                    관리자
                </Badge>
            ),
            value: UserRole.ADMIN,
        },
        {
            label:
                <Badge variant="secondary" className="bg-[#07C00A] text-white  rounded-md  shadow-sm">

                    일반 사용자
                </Badge>,
            value: UserRole.User,
        },
    ];

    return (
        <div
            className="flex flex-col items-center gap-6 border border-gray-300 rounded-lg shadow-lg w-[435px] h-[750px]">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit((data) => {
                        console.log("Submitted form data:", data); // 디버깅 로그
                        onSubmit(data);
                    })}
                    className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg"
                >
                    <TypographyH2 title="회원가입" className="text-center mt-8"/>
                    <div className="flex gap-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem className="flex flex-col space-y-1 flex-1">
                                    <FormLabel>이메일</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="!ring-blue-400"
                                            placeholder="ykh12" {...field}
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
                                            <Input
                                                className="!ring-blue-400"
                                                placeholder="아이디를 입력해주세요" {...field} />
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
                                    <Input
                                        className="!ring-blue-400"
                                        placeholder="유저명을 입력해주세요" {...field} />
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
                                        className="!ring-blue-400"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="비밀번호를 입력해주세요"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem className="flex flex-col space-y-1">
                                <FormLabel>비밀번호 확인</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            className="!ring-blue-400"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="비밀번호를 다시 입력해주세요"
                                            {...field}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                            onClick={() => setShowPassword((prev) => !prev)}
                                        >
                                            {showPassword ? (
                                                <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                                            ) : (
                                                <EyeIcon className="h-4 w-4" aria-hidden="true" />
                                            )}
                                            <span className="sr-only">{showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}</span>
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />



                    {/*<div className="flex items-center gap-3">*/}
                    {/*    <Checkbox*/}
                    {/*        id="showPassword"*/}
                    {/*        checked={showPassword}*/}
                    {/*        onCheckedChange={(checked) => setShowPassword(!!checked)}*/}
                    {/*        variant="red"*/}
                    {/*        size="md"*/}
                    {/*    />*/}
                    {/*    <Label htmlFor="showPassword" className="!text-sm !font-medium !text-gray-700">비밀번호*/}
                    {/*        보기</Label>*/}
                    {/*</div>*/}
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
                        className={clsx(
                            "w-full h-[45px] px-6 py-3 font-sans text-lg text-white rounded-md transition-colors duration-200",
                            {
                                "bg-blue-500 hover:bg-blue-600": !loading && userIdCheck,
                                "bg-blue-500 text-white cursor-not-allowed": loading || !userIdCheck,
                            }
                        )}
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