import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable.tsx";
import ChatUserList from "@/features/chat/components/ChatUserList.tsx";
import ChattingRoom from "@/features/chat/components/ChattingRoom.tsx";
import {useChat} from "@/features/chat/hooks/useChat.ts";
import ChatMessageComponent from "@/features/chat/components/ChatMessageComponent.tsx";


const ChatContainer = () => {
    const {
        selectedUser,
        selectUserList,
        messages,
        sendMessage,
        testMessages,
        chatUserListHandleClick,
        chattingRoomOnChangeSendMessage,
        chattingRoomOnClickSendMessage,
        handleChatCreateButton
    } = useChat();

    return (
        <ResizablePanelGroup
            direction="horizontal"
            className="min-h-[1000px] max-w-md rounded-lg border md:min-w-[680px]"
        >
            <ResizablePanel defaultSize={340}>
                <ChatUserList selectedUser={selectedUser}
                              selectUserList={selectUserList}
                              chatUserListHandleClick={chatUserListHandleClick}
                              handleChatCreateButton={handleChatCreateButton}
                />
            </ResizablePanel>
            <ResizableHandle withHandle/>
            <ResizablePanel defaultSize={340} className="flex flex-col">
                <div className="flex-1 overflow-auto">
                    <ChatMessageComponent messages={testMessages}/>
                </div>
                <ChattingRoom sendMessage={sendMessage}
                              chattingRoomOnChangeSendMessage={chattingRoomOnChangeSendMessage}
                              chattingRoomOnClickSendMessage={chattingRoomOnClickSendMessage}
                />
            </ResizablePanel>
        </ResizablePanelGroup>
    );
};

export default ChatContainer;