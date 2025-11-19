import { Client } from '@stomp/stompjs';
import { useEffect, useRef } from 'react';

let client: Client | null = null;

export const useWebSocket = (roomId: string, onMessageReceived: (msg: any) => void) => {
    const clientRef = useRef<Client | null>(null);

    useEffect(() => {
        if (!roomId) return;

        client = new Client({
            brokerURL: 'ws://localhost:8080/ws', // 너 백엔드 주소
            connectHeaders: {
                // Authorization: `Bearer ${token}`  // 나중에 로그인 붙이면
            },
            debug: (str) => {
                console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        client.onConnect = () => {
            console.log('웹소켓 연결 성공!');

            // 이 방의 메시지 구독
            client.subscribe(`/topic/room/${roomId}`, (message) => {
                const payload = JSON.parse(message.body);
                onMessageReceived(payload);
            });
        };

        client.activate();
        clientRef.current = client;

        return () => {
            client?.deactivate();
        };
    }, [roomId]);

    // 메시지 보내는 함수
    const sendMessage = (content: string) => {
        if (!client?.connected) {
            alert('연결 중입니다...');
            return;
        }

        const message = {
            roomId,
            senderId: 1, // 로그인 유저 ID 나중에 넣기
            content,
            createdAt: new Date().toISOString(),
        };

        client.publish({
            destination: '/app/chat.sendMessage',
            body: JSON.stringify(message),
        });
    };

    return { sendMessage };
};