import authClient from "../../../shared/api/auth.ts";

export const login =async (userId: string, password: string)=>{
    return authClient.post("auth/login",{userId,password})
}