import {useEffect, useRef, useState} from "react";
import {ChatMessage, ChatUser} from "@/features/chat/types/chat.ts";
import {Client} from "@stomp/stompjs";
declare global {
    interface Window {
        stompClient?: Client;  // ← 이거 추가하면 에러 사라짐
    }
}
import SockJS from 'sockjs-client';
import {io, Socket} from "socket.io-client";
import {useQuery} from "@tanstack/react-query";
import {getMessageUserList} from "@/features/workspace/api/Chat.ts";
import {getMessageList} from "@/features/chat/api/chatApi.ts";
import {useAuth} from "@/features/contexts/components/AuthProvider.tsx";
import {jwtDecode} from "jwt-decode";

const dummyMessages: ChatMessage[] = [
    {id: 1,  email: "alice",senderId :2, text: "안녕하세요!", timestamp: new Date().toISOString()},
    {id: 1,  email: "alice",senderId :2, text: "안녕하세요!", timestamp: new Date().toISOString()},
    {id: 1,  email: "alice",senderId :2, text: "안녕하세요!", timestamp: new Date().toISOString()},
    {id: 1,  email: "alice",senderId :1, text: "안녕하세요!", timestamp: new Date().toISOString()},
    {id: 1,  email: "alice",senderId :1, text: "안녕하세요!", timestamp: new Date().toISOString()},
];

const dummyChatUsers: ChatUser[] =[
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
    const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [selectUserList, setSelectUserList] = useState<ChatUser[] | null>(null);
    const [sendMessage, setSendMessage] = useState<ChatMessage>();
    console.log("값확인 ------->",selectedUser)
    const socketRef = useRef<Socket | null>(null);

    const [connected, setConnected] = useState(false);
    const clientRef = useRef(null);  // client 저장용 ref 추가
    const {token} = useAuth();
    const decoded = jwtDecode(token);
    useEffect(() => {
        const client = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8080/ws-stomp'),  // http:// + SockJS!!
            debug: (str) => console.log('STOMP DEBUG:', str),
            heartbeatIncoming: 0,
            heartbeatOutgoing: 0,

            reconnectDelay: 5000,
        });
        client.onConnect = (frame) => {

            setConnected(true);
            window.stompClient = client;


            // 구독
            // ✅ /topic/chat 구독 - 서버에서 보낸 메시지 수신
            client.subscribe("/topic/chat", (message) => {
                console.log("📨 [메시지 수신]:", message.body);

                try {
                    const receivedMessage = JSON.parse(message.body);
                    console.log("✅ [파싱된 메시지]:", receivedMessage);

                    // 📌 받은 메시지를 state에 추가
                    setMessages(prev => [...prev, receivedMessage]);
                } catch (error) {
                    console.error("❌ 메시지 파싱 실패:", error);
                }
            });

            // 테스트 메시지 전송
            client.publish({
                destination: "/app/message",
                body: JSON.stringify({ text: "Hello from React!" })
            });
        };

        client.onStompError = (frame) => {
            console.error("STOMP error:", frame);
            setConnected(false);
        };

        client.activate();  // 연결 시작
        clientRef.current = client;

        return () => {
            client.deactivate();  // disconnect
        };
    }, []);


    const {data: fetchedUsers} = useQuery({
        queryKey: ['chatUserList'],
        queryFn: async ()=>{
            const {data} = await  getMessageUserList();
            return data;
        },
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });

    const {data: chatMessages} = useQuery({
        queryKey: ['chatMessages'],
        queryFn: async ()=>{
            const {data} = await  getMessageList(selectedUser.userIdx,decoded.userIdx);
            return data;
        },

    })

    useEffect(() => {
        if(fetchedUsers){
       setSelectUserList(fetchedUsers);
        }

    }, [fetchedUsers]);

    useEffect(() => {
        if(chatMessages){
            setMessages(chatMessages)
        }
    }, [chatMessages]);
    // useEffect(() => {
    //     if (!selectedUser) return;
    //     // 테스트용: dummyMessages 필터링
    //     const userMessages = dummyMessages.filter(msg => msg.email === selectedUser.email);
    //
    //     setMessages(userMessages);
    // }, [selectedUser]);


    const chatUserListHandleClick = (chatUser: ChatUser )=>{

        setSelectedUser(chatUser);
    };

    // 채팅창 입력 상태값 처리 함수
    const chattingRoomOnChangeSendMessage = (data:ChatMessage) =>{
        setSendMessage(data);
    };

    // 채팅 메세지 전송 이벤트 ( 여기 소켓 연동 )
    const chattingRoomOnClickSendMessage = (userIdx) => {

        console.log("토큰 정보 파싱한 데이터",userIdx);
        console.log("🔵 [버튼 클릭]");
        console.log("   - 연결 상태:", connected);
        console.log("   - clientRef.current?.connected:", clientRef.current?.connected);
        console.log("   - window.stompClient?.connected:", window.stompClient?.connected);
        console.log("   - 메시지:", sendMessage);
        console.log("   - 선택된 사용자:", selectedUser);

        // 1. 빈 메시지 체크
        if (!sendMessage || sendMessage.trim() === "") {
            console.warn("⚠️ 메시지가 비어있습니다");
            return;
        }

        // 2. 사용자 선택 체크
        if (!selectedUser) {
            console.warn("⚠️ 사용자를 선택해주세요");
            return;
        }

        // 3. 연결 상태 체크
        if (!clientRef.current?.connected) {
            console.error("❌ STOMP 클라이언트가 연결되지 않았습니다");
            console.error("   clientRef.current:", clientRef.current);
            console.error("   connected:", clientRef.current?.connected);
            return;
        }

        const payLoad = {
            sendMessage: sendMessage,
            senderId: userIdx,
            timestamp: new Date().toISOString(),
            recipient: selectedUser.id,
        };

        console.log("📤 [STOMP 전송]:", payLoad);

        try {
            clientRef.current.publish({
                destination: "/app/chat.sendMessage",
                body: JSON.stringify(payLoad),
            });
            console.log("✅ 메시지 전송 성공");
            setSendMessage(""); // 입력창 비우기
        } catch (error) {
            console.error("❌ 메시지 전송 실패:", error);
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