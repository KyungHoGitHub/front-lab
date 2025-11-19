import {useEffect, useRef, useState} from "react";
import {ChatMessage, ChatUserList} from "@/features/chat/types/chat.ts";
import {Client} from "@stomp/stompjs";
declare global {
    interface Window {
        stompClient?: Client;  // ← 이거 추가하면 에러 사라짐
    }
}
import SockJS from 'sockjs-client';

const dummyMessages: ChatMessage[] = [
    {id: 1,  email: "alice",senderId :2, text: "안녕하세요!", timestamp: new Date().toISOString()},
    {id: 1,  email: "alice",senderId :2, text: "안녕하세요!", timestamp: new Date().toISOString()},
    {id: 1,  email: "alice",senderId :2, text: "안녕하세요!", timestamp: new Date().toISOString()},
    {id: 1,  email: "alice",senderId :1, text: "안녕하세요!", timestamp: new Date().toISOString()},
    {id: 1,  email: "alice",senderId :1, text: "안녕하세요!", timestamp: new Date().toISOString()},
];

const dummyChatUsers: ChatUserList[] =[
    {
        id: "1",
        username: "shadcn",
        avatar: "https://github.com/shadcn.png",
        email: "alice",
        lastMessage: "안녕하세요",
        lastMessageTime : "11월19일"
    },
    {
        id: "2",
        username: "maxleiter",
        avatar: "https://github.com/maxleiter.png",
        email: "maxleiter@vercel.com",
        lastMessage: "확인부탁드립니다.",
        lastMessageTime : "11월10일"

    },
    {
        id: "3",
        username: "evilrabbit",
        avatar: "https://github.com/evilrabbit.png",
        email: "evilrabbit@vercel.com",
        lastMessage: "서비스가 정상적으로 동작하나요?",
        lastMessageTime : "11월8일"
    },
];

export const useChat = () => {
    const [selectedUser, setSelectedUser] = useState<ChatUserList | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [selectUserList, setSelectUserList] = useState<ChatUserList[] | null>(null);
    const [sendMessage, setSendMessage] = useState<ChatMessage>();
    const [isConnected, setIsConnected] = useState(false);
    const socketRef = useRef<WebSocket | null>(null);
    const clientRef = useRef<Client | null>(null);
    const connectionAttemptRef = useRef(0);
    const maxReconnectAttemptsRef = useRef(5);
    const [connectionError, setConnectionError] = useState<string>("");

    const checkServerHealth = async (): Promise<boolean> => {
        try {
            const response = await fetch("http://localhost:8080/api/chat/health");
            console.log("✅ 서버 응답:", response.status);
            return response.ok;
        } catch (error) {
            console.error("❌ 서버 연결 불가:", error);
            return false;
        }
    };
    
    // STOMP 연결 설정
    const connectToStomp = () => {
        console.log(`🔄 STOMP 연결 시도 (${connectionAttemptRef.current + 1}/${maxReconnectAttemptsRef.current})`);

        const client = new Client({
            brokerURL: undefined,
            webSocketFactory: () => {
                console.log("🔌 SockJS 연결 중: ws://localhost:8080/ws");
                return new SockJS("http://localhost:8080/ws", null, {
                    timeout: 10000,
                    transports: ["websocket", "xhr-streaming", "xhr-polling"],
                });
            },
            connectHeaders: {
                login: "guest",
                passcode: "guest",
            },
            debug: (str) => {
                if (str.includes("CONNECT") || str.includes("connected")) {
                    console.log("[STOMP]", str);
                }
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: (frame) => {
                console.log("✅✅✅ STOMP 연결 성공!!!");
                setIsConnected(true);
                setConnectionError("");
                connectionAttemptRef.current = 0;

                // /topic/public 구독
                client.subscribe("/topic/public", (message) => {
                    try {
                        const msg = JSON.parse(message.body);
                        console.log("📨 메시지 수신:", msg);
                        setMessages((prev) => [...prev, msg]);
                    } catch (error) {
                        console.error("메시지 파싱 오류:", error);
                    }
                });
            },
            onDisconnect: () => {
                console.warn("⚠️ STOMP 연결 해제");
                setIsConnected(false);
            },
            onStompError: (frame) => {
                console.error("❌ STOMP 에러:", frame.headers["message"], frame.body);
                setIsConnected(false);
                setConnectionError(`STOMP 에러: ${frame.headers["message"]}`);
            },
            onWebSocketError: (event) => {
                console.error("❌ WebSocket 에러:", event);
                setIsConnected(false);
                setConnectionError("WebSocket 연결 실패");
            },
            onWebSocketClose: () => {
                console.warn("⚠️ WebSocket 연결 종료");
                setIsConnected(false);

                // 재연결 시도
                if (connectionAttemptRef.current < maxReconnectAttemptsRef.current) {
                    connectionAttemptRef.current++;
                    console.log(`🔄 ${connectionAttemptRef.current}번째 재연결 대기 중...`);
                    setTimeout(() => connectToStomp(), 3000);
                } else {
                    setConnectionError("최대 연결 시도 횟수 초과");
                    console.error("❌ 최대 재연결 횟수 도달");
                }
            },
        });

        try {
            client.activate();
            clientRef.current = client;
            window.stompClient = client;
        } catch (error) {
            console.error("❌ STOMP 활성화 실패:", error);
            setConnectionError("STOMP 활성화 실패");
        }
    };

    useEffect(() => {
        const initializeChat = async () => {
            console.log("🚀 채팅 초기화 시작...");
            setSelectUserList(dummyChatUsers);

            // 서버 헬스 체크 (1초 대기 후 시작)
            await new Promise(resolve => setTimeout(resolve, 1000));

            const serverIsHealthy = await checkServerHealth();
            if (serverIsHealthy) {
                connectToStomp();
            } else {
                setConnectionError("서버가 응답하지 않습니다. 8080 포트를 확인하세요.");
                console.error("❌ 서버 헬스 체크 실패");
            }
        };

        initializeChat();

        return () => {
            if (clientRef.current?.active) {
                console.log("🛑 STOMP 연결 종료");
                clientRef.current.deactivate();
            }
        };
    }, []);

    useEffect(() => {
       setSelectUserList(dummyChatUsers);
    }, []);

    useEffect(() => {
        if (!selectedUser) return;
        // 테스트용: dummyMessages 필터링
        const userMessages = dummyMessages.filter(msg => msg.email === selectedUser.email);

        setMessages(userMessages);
    }, [selectedUser]);


    const chatUserListHandleClick = (chatUser: ChatUserList )=>{

        setSelectedUser(chatUser);
    };

    // 채팅창 입력 상태값 처리 함수
    const chattingRoomOnChangeSendMessage = (data:any) =>{
        setSendMessage(data);
    };

    // 채팅 메세지 전송 이벤트 ( 여기 소켓 연동 )
    const chattingRoomOnClickSendMessage = ()=>{
        if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
            console.error("웹소켓 연결 안 됨!", socketRef.current?.readyState);
            return;
        }
        const payLoad = {
            sendMessage : sendMessage,
            senderId: selectedUser?.id,
            timestamp: new Date().toISOString(),
            recipient: 1,
        }

        if (window.stompClient?.connected) {
            window.stompClient.publish({
                destination: "/app/chat.sendMessage", // ← 컨트롤러에서 받을 경로
                body: JSON.stringify(payLoad),
            });
        }
    };


    return {
        selectedUser,
        selectUserList,
        messages,
        sendMessage,
        chatUserListHandleClick,
        chattingRoomOnChangeSendMessage,
        chattingRoomOnClickSendMessage,
    };
};