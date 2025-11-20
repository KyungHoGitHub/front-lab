import {ChatMessage} from "@/features/chat/types/chat.ts";
import {useEffect, useRef} from "react";
import {useAuth} from "@/features/contexts/components/AuthProvider.tsx";
import {jwtDecode} from "jwt-decode";

const myUserId = 2;

const ChatMessageComponent = ({ messages }: { messages: ChatMessage[] }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const {token} = useAuth();
    const decoded = jwtDecode(token);
    // 새 메시지가 올 때마다 자동으로 맨 아래로 스크롤
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    console.log("채팅창 메시지",messages)
    console.log("decoded.userIdx",decoded.userIdx)
    const formattedMessages = messages.map(msg => ({
        ...msg,
        isMe: Number(msg.senderId) === decoded.userIdx,
    }));

    return (
        <div className="flex-1 overflow-auto p-4 space-y-4">
            {formattedMessages.map((msg, index) => (
                <div
                    key={index}
                    className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
                >
                    <div
                        className={`max-w-[70%] px-3 py-2 rounded-xl shadow text-sm
                            ${msg.isMe ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}
                        `}
                    >
                        {msg.text}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChatMessageComponent;