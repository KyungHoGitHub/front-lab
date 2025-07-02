import resourceClient from "../../../shared/api/resourceClient.ts";
import {WORKSPACE_ENDPOINTS} from "../endpoints/workspaceEndpoints.ts";
import {SIGNUP_ENDPOINT} from "../../signup/endpoints/signup.ts";

export const getUserInfo  =  async(userIdx : number)=>{
    return resourceClient.get(`${WORKSPACE_ENDPOINTS.CHAT.GET.USER}/${userIdx}`);
}

export const getMessage = async (userIdx: number)=>{
    return resourceClient.get(`${WORKSPACE_ENDPOINTS.CHAT.GET.MESSAGE}/${userIdx}`);
}

export const getMessageUserList = async () =>{
    return resourceClient.get(`${WORKSPACE_ENDPOINTS.CHAT.GET.ALL_USER}`)
}

export const getConversationList  = async (userId :string) =>{
    return resourceClient.get(WORKSPACE_ENDPOINTS.CHAT.GET.CONVERSATION_LIST(userId))
}

