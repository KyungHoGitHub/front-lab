import authClient from "../../../shared/api/auth.ts";
import {LoginFormRequest} from "../types/login.ts";
import {LOGIN_ENDPOINT} from "../endpoints/login.ts";

export const loginForm = async (data: LoginFormRequest) => {
    return authClient.post(LOGIN_ENDPOINT.AUTH.LOGIN, data);
}

export const googleLoginForm = async (data)=>{
    return authClient.post(LOGIN_ENDPOINT.AUTH.LOGIN,data)
}