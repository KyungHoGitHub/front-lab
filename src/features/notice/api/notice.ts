import {buildQueryString} from "../../workspace/api/utils.ts";
import resourceClient from "../../../shared/api/resourceClient.ts";
import {NOTICE_ENDPOINT, QUERY_PARAMS} from "../endpoints/noticeEndpoints.ts";

export const searchNotice = async (searchBy: string, query:string) =>{
    const queryString = buildQueryString({
        [QUERY_PARAMS.NOTICE.SEARCH.SEARCH_BY]: searchBy,
        [QUERY_PARAMS.NOTICE.SEARCH.QUERY]: query,
    });
    return resourceClient.get(`${NOTICE_ENDPOINT.NOTICE.SEARCH}?${queryString}`);
}

export const getNoticeList =async ()=>{
    return resourceClient.get(NOTICE_ENDPOINT.NOTICE.LIST);
}

