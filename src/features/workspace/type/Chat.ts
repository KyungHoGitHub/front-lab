
export interface User {
    id : string;
    name : string;
    avartar?: string;
}

export interface Conversation {
    user: User;
    lastMessage: string;
    timestamp: string;
}

export interface  Message {
    id: string;
    senderId: number;
    content: string;
    timestamp: string;
    userIdx: number;
}