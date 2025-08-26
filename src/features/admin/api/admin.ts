import resourceClient from "../../../shared/api/resourceClient.ts";
import {ADMIN_ENDPOINTS, QUERY_PARAMS} from "../endpoints/admin.ts";
import {buildQueryString} from "../../../shared/utill/url/queryString.ts";

type SearchBy = 'username' | 'userId';

export const getAdminSideMenuList = async (role?: string) => {
    return resourceClient.get("menu/test/menu", {
        params: role ? { role } : {}, // role이 있으면 전달, 없으면 생략
    });
}

export const getUserList = async (searchBy: SearchBy, query :string)=>{
    const queryString = buildQueryString({
        [QUERY_PARAMS.USERS.SEARCH.SEARCH_BY]: searchBy,
        [QUERY_PARAMS.USERS.SEARCH.QUERY]: query,
    });

    return resourceClient.get(`${ADMIN_ENDPOINTS.USERS.GET}?${queryString}`)
}

export const getUsers = async ()=>{
    return resourceClient.get(ADMIN_ENDPOINTS.USERS.GET);
}

export const getUserCountList = async  ()=>{
    return resourceClient.get(ADMIN_ENDPOINTS.USERS.COUNT);
}

export const getUserVisitList = async () =>{
    return resourceClient.get(ADMIN_ENDPOINTS.USERS.VISITOR_LIST);
}

export const postTokenPolicy = async (data) =>{
    return resourceClient.post(ADMIN_ENDPOINTS.TOKEN_POLICY,data);
}