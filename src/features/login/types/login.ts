import {LoginTypes} from "../enums/loginTypes.ts";

export interface LoginFormRequest {
    userId: string;
    password: string;
}

export interface LoginFormWithLoginType {
    data : LoginFormRequest,
    loginType : LoginTypes;
}
