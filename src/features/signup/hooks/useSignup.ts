import {useState} from "react";
import {LoginFormData} from "@/features/login/types/login.ts";
import {loginForm} from "@/features/login/api/login.ts";
import {SignupFormData} from "@/features/signup/types/signup.ts";
import {toSignupRequest} from "@/features/signup/mappers/sigunupMapper.ts";
import {getUserInfo, signup} from "@/features/signup/api/signup.ts";
import {extractData} from "@/shared/utill/response.ts";
import {useUserStore} from "@/storage/userStore.ts";
import {mapErrorMessage} from "@/shared/utill/errorUtill.ts";
import {toast} from "react-toastify";
import {useNavigate} from "react-router";

export const useSignup = () =>{
    const {user, setUser} = useUserStore();
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();


    const onSubmit = async (values: SignupFormData)=> {
        setLoading(true);
        try{
            const formData = toSignupRequest(values);
            const res = await signup(formData);
            const data = extractData(res);
            if (res.data) {
                const userInfo = await getUserInfo(data.idx);
                setUser(userInfo.data.data);
            }
            navigate("/login", { state: { signupSuccess: true } }); // 성공 상태
        }   catch (error){
            const message = mapErrorMessage(error);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }

    return{
        onSubmit,
    }
}