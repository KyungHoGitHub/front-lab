import resourceClient from "@/shared/api/resourceClient.ts";

export const getMessageList = async (senderId: number,
                                     recipient:number)=>{
    return resourceClient.get(`chatmessage/${senderId}/${recipient}`);
}