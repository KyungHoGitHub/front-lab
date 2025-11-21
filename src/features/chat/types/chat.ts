
export  interface ChatMessage {
    id: number;
    email: string;
    senderId: number;
    text: string;
    timestamp: string;
}

export interface ChatUser {
    idx: string;
    email: string;
    username:string;
    avatar : string;
    lastMessage: string;
    lastMessageTime : string;
}