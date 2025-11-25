import {Client, IMessage, StompSubscription} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
type MessageCallback = (message: IMessage) => void;

class ChatSocket {
    client: Client;
    connected: boolean;
    subscribers: Record<string, MessageCallback[]>;

    constructor() {
        this.client = new Client({
            webSocketFactory: () => new SockJS("http://localhost:8080/ws-stomp"),
            reconnectDelay: 5000,
        });
        this.connected = false;
        this.subscribers = {};
    }

    connect(onConnected?: () => void) {
        this.client.onConnect = () => {
            this.connected = true;
            onConnected?.();
        };
        this.client.activate();
    }

    subscribeRoom(roomId: string, callback: MessageCallback): StompSubscription {
        if (!this.subscribers[roomId]) this.subscribers[roomId] = [];
        this.subscribers[roomId].push(callback);

        return this.client.subscribe(`/topic/chat/${roomId}`, callback);
    }

    sendMessage(roomId: string, payload: any) {
        this.client.publish({
            destination: `/app/chat/${roomId}`,
            body: JSON.stringify(payload),
        });
    }
}

export const chatSocket = new ChatSocket();