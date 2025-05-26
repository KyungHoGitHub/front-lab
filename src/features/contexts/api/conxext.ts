import authClient from "../../../shared/api/auth.ts";
import {CONTEST_ENDPOINTS} from "../endpoints/context.ts";

export const validationToken = async ( accessToken: string ) => {
    return authClient.post(CONTEST_ENDPOINTS.POST_TOKEN,{},
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
};