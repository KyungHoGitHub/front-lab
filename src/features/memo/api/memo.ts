import resourceClient from "../../../shared/api/resourceClient.ts";
import {MEMO_ENDPOINT} from "../endpoints/memo.ts";
import {buildQueryString} from "../../workspace/api/utils.ts";
import {QUERY_PARAMS, WORKSPACE_ENDPOINTS} from "../../workspace/endpoints/workspaceEndpoints.ts";


export const getMomoList =  async () =>{
    return resourceClient.get(MEMO_ENDPOINT.MEMO.GET);
}

export const searchMemos = async (searchBy: 'title' | 'description', query:string) =>{
    const queryString = buildQueryString({
        [QUERY_PARAMS.TODOS.SEARCH.SEARCH_BY]: searchBy,
        [QUERY_PARAMS.TODOS.SEARCH.QUERY]: query,
    });
    return resourceClient.get(`${MEMO_ENDPOINT.MEMO.SEARCH}?${queryString}`);
}