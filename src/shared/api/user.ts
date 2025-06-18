import resourceClient from "./resourceClient.ts";
import {SHARE_ENDPOINTS} from "../endpoints/shareEndpoints.ts";

export const getUserInfo = async ()=>{
    return resourceClient.get(`users/${SHARE_ENDPOINTS.USER.GET}`);
}