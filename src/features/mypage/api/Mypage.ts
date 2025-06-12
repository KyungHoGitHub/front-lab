import resourceClient from "../../../shared/api/resourceClient.ts";
import {MYPAGE_ENDPOINTS} from "../endpoints/mypageEndpoints.ts";

export const postUserProfile = async (formData: FormData) =>{
    return resourceClient.post(`${MYPAGE_ENDPOINTS.MYPAGE.USER_PROFILE.CREATE}`,formData,{
        headers : {
            "Content-Type": "multipart/form-data", // 선택 사항
        }
    })
}