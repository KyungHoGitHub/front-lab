import resourceClient from "../../../shared/api/resourceClient.ts";
import {WORKSPACE_ENDPOINTS} from "../endpoints/workspaceEndpoints.ts";

export const getUserInfo  =  async(userIdx : number)=>{
    return resourceClient.get(`${WORKSPACE_ENDPOINTS.CHAT.GET.USER}/${userIdx}`);
}

export const getMessage = async (userIdx: number)=>{
    return resourceClient.get(`${WORKSPACE_ENDPOINTS.CHAT.GET.MESSAGE}/${userIdx}`);
}

