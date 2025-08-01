import resourceClient from "../../../shared/api/resourceClient.ts";
import {MEMO_ENDPOINT} from "../endpoints/memo.ts";
import {QUERY_PARAMS} from "../../workspace/endpoints/workspaceEndpoints.ts";
import {MemoFormData} from "../types/memo.ts";
import {buildQueryString} from "../../../shared/utill/url/queryString.ts";

type SearchBy = 'title' | 'description';

export const getMomoList =  async () =>{
    return resourceClient.get(MEMO_ENDPOINT.MEMO.GET);
}

export const searchMemos = async (searchBy:SearchBy, query:string) =>{
    const queryString = buildQueryString({
        [QUERY_PARAMS.TODOS.SEARCH.SEARCH_BY]: searchBy,
        [QUERY_PARAMS.TODOS.SEARCH.QUERY]: query,
    });
    return resourceClient.get(`${MEMO_ENDPOINT.MEMO.SEARCH}?${queryString}`);
}

export const createMemo = async (data: MemoFormData)=>{
    return resourceClient.post(MEMO_ENDPOINT.MEMO.CREATE,data)
};