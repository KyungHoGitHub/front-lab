import resourceClient from "./resourceClient.ts";
import {SHARE_ENDPOINTS} from "../endpoints/shareEndpoints.ts";

export const postVisitLog = async ()=>{
    return resourceClient.post(SHARE_ENDPOINTS.VISIT_LOG.POST);
}