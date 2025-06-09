
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