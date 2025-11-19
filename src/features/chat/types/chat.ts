
export  interface ChatMessage {
    id: number;
    email: string;
    senderId: number;
    text: string;
    timestamp: string;
}

export interface ChatUserList {
    id: string;
    email: string;
    username:string;
    avatar : string;
    lastMessage: string;
    lastMessageTime : string;
}