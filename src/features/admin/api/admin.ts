import resourceClient from "../../../shared/api/resourceClient.ts";
import {buildQueryString} from "../../workspace/api/utils.ts";

import {ADMIN_ENDPOINTS, QUERY_PARAMS} from "../endpoints/admin.ts";

export const getAdminSideMenuList = async (role?: string) => {
    return resourceClient.get("menu/test/menu", {
        params: role ? { role } : {}, // role이 있으면 전달, 없으면 생략
    });
}

export const getUserList = async (searchBy: 'username'| 'userId', query :string)=>{
    const queryString = buildQueryString({
        [QUERY_PARAMS.USERS.SEARCH.SEARCH_BY]: searchBy,
        [QUERY_PARAMS.USERS.SEARCH.QUERY]: query,
    });

    return resourceClient.get(`${ADMIN_ENDPOINTS.USERS.GET}?${queryString}`)
}