import resourceClient from "@/shared/api/resourceClient.ts";
import {ChatUser} from "@/features/chat/types/chat.ts";

export const getMessageList = async (senderId: number,
                                     recipient:number)=>{
    return resourceClient.get(`chatmessage/${senderId}/${recipient}`);
}

export const createChatUser = async (chatUser:ChatUser)=>{
    return resourceClient.post('chatUser',chatUser);
}

export const fetchChatMessages = async (roomId:number)=>{
    return resourceClient.get(`chatmessages/${roomId}`);
}