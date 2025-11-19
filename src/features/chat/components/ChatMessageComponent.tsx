import {ChatMessage} from "@/features/chat/types/chat.ts";

const myUserId = 2;

const ChatMessageComponent = ({ messages }: { messages: ChatMessage[] }) => {

    const formattedMessages = messages.map(msg => ({
        ...msg,
        isMe: msg.senderId === myUserId,
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