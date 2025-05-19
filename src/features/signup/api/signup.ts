import authClient from "../../../shared/api/auth.ts";

export const signup = async (data: { email: string; userId: string; userName: string; password: string }) => {
    return authClient.post("auth/sign/up", data);
};

export const getUserInfo = async (data: { userIdx: number }) => {
    return authClient.get(`user/${data.userIdx}`);
}
export const validUserId = async (userId:string) =>{
    return authClient.post("auth/duplicate/check/userId",userId);
}