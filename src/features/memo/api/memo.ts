import resourceClient from "../../../shared/api/resourceClient.ts";
import {MEMO_ENDPOINT} from "../endpoints/memo.ts";


export const getMomoList =  async () =>{
    return resourceClient.get(MEMO_ENDPOINT.MEMO.GET);
}