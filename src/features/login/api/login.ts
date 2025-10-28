import authClient from "../../../shared/api/auth.ts";
import {LoginFormRequest} from "../types/login.ts";
import {LOGIN_ENDPOINT} from "../endpoints/login.ts";

export const loginForm = async (data: LoginFormRequest) => {
    return authClient.post(LOGIN_ENDPOINT.AUTH.LOGIN, data);
}

export const googleLoginForm = async (data)=>{
    return authClient.post(LOGIN_ENDPOINT.AUTH.LOGIN,data)
}

export const termsForm  = async (data: any,userEmail: string)=>{
    return authClient.post(`/user-terms/${userEmail}`,data)
}

export const getAllTermsList = async () =>{
    return authClient.get(LOGIN_ENDPOINT.AUTH.ALL_TERMS_LIST);
}