import resourceClient from "../../../shared/api/resourceClient.ts";
import {MYPAGE_ENDPOINTS} from "../endpoints/mypageEndpoints.ts";
import authClient from "../../../shared/api/auth.ts";
import {Http} from "../../../shared/utill/constants/http.ts";

export const postUserProfile = async (formData: FormData) =>{
    return resourceClient.post(MYPAGE_ENDPOINTS.MYPAGE.USER_PROFILE.CREATE ,formData,{
        headers : Http.CONTENT_TYPE.MULTIPART_FORM,
    })
}

export const getUserMe = async (userIdx: number)=>{
    return authClient.get(MYPAGE_ENDPOINTS.USERS.ME);
}