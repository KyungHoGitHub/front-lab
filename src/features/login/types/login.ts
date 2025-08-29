import {LoginTypes} from "../enums/loginTypes.ts";

export interface LoginFormRequest {
    userId: string;
    password: string;
}

export interface LoginFormData {
    userId: string;
    password: string;
}

export interface LoginFormWithLoginType  extends LoginFormData{
    loginType : LoginTypes;
}