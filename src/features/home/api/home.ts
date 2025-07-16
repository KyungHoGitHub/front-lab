import resourceClient from "../../../shared/api/resourceClient.ts";
import {HOME_ENDPOINT} from "../endpoints/home.ts";

export const getTodoList = async (period: string)=>{
    return resourceClient.get(HOME_ENDPOINT.HOME.TODO.GET, {
        params: { period },
    });
}