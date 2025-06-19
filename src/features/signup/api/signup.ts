import authClient from "../../../shared/api/auth.ts";
import {SignupRequest} from "../types/signup.ts";
import {SIGNUP_ENDPOINT} from "../endpoints/signup.ts";

export const signup = async (data: SignupRequest) => {
    return authClient.post(SIGNUP_ENDPOINT.AUTH.SIGNUP, data);
};

export const getUserInfo = async (userIdx: number) => {
    return authClient.get(SIGNUP_ENDPOINT.USER.GET(userIdx));
}
export const validUserId = async (userId: string) => {
    return authClient.post(SIGNUP_ENDPOINT.AUTH.DUPLICATE.CHECK(userId));
}