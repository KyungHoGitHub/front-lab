import {loginForm} from "../api/login.ts";
import {LoginFormData, LoginFormWithLoginType} from "../types/login.ts";
import {LoginTypes} from "@/features/login/enums/loginTypes.ts";
import {extractData} from "@/shared/utill/response.ts";
import {jwtDecode} from "jwt-decode";
import {mapErrorMessage} from "@/shared/utill/errorUtill.ts";
import {toast} from "react-toastify";
import {useAuth} from "@/features/contexts/components/AuthProvider.tsx";
import {useUserStore} from "@/storage/userStore.ts";

interface JwtPayload {
    exp: number;
    userId: string;
    sub: string;
    role: string;
    userIdx: number;
}

export const useLogin = () => {
    const {login} = useAuth();
    const setUser = useUserStore((state) => state.setUser);

    const loginUser = async (formData: LoginFormData, loginType: LoginTypes): Promise<boolean> => {
        try {
            const formDataWithLoginType: LoginFormWithLoginType = {
                data: {
                    userId: formData.userId,
                    password: formData.password,
                },
                loginType: loginType
            }

            const res = await loginForm(formDataWithLoginType);

            const data = extractData(res);

            // 1. 토큰값 유무로 정상적으로 발급 되었는지 확인
            if (!data.accessToken) {
                throw new Error("토큰 정보를 받아오지 못했습니다.")
            }

            const jwtPayload = jwtDecode<JwtPayload>(data.accessToken);


            // 2. 유저 값 세팅 전에 토큰의 구성 요소 중 (userIdx) 값 확인
            if (!jwtPayload?.userIdx) {
                throw new Error("유효하지 않은 토큰 정보입니다.")
            }

            const userData = {
                userIdx: jwtPayload.userIdx,
                userId: jwtPayload.userId,
                username: jwtPayload.sub,
                role: jwtPayload.role,
                exp: jwtPayload.exp,
            };

            setUser(userData);
            login(data.accessToken);
            return true;

        } catch (error: unknown) {
            const message = mapErrorMessage(error);
            toast.error(message);
            console.error(error);
            return false;
        }
    }

    return {
        loginUser,
    }
}