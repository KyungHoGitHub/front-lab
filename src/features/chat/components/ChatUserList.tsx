import * as React from "react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemMedia,
    ItemSeparator,
    ItemTitle,
} from "@/components/ui/item"
import {ChatUser} from "@/features/chat/types/chat.ts";
import ChatUserSearchBar from "@/features/chat/components/ChatUserSearchBar.tsx";
import {
    Pagination,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import {useChatStore} from "@/features/chat/store/chatStore.ts";

interface ChatUserListProps {
    selectedUser: ChatUser | null;
    selectUserList: ChatUser[] | null;
    chatUserListHandleClick: (chatUser: ChatUser) => void;
    handleChatCreateButton:()=> void;
}

const ChatUserList = ({selectedUser, selectUserList, chatUserListHandleClick,handleChatCreateButton}: ChatUserListProps) => {
    const testSelectedUser  = useChatStore((state)=> state.testSelectedUser);
    const setTestSelectedUser = useChatStore((state)=> state.setTestSelectedUser);
    if (selectUserList === null) return;

    const handleChatUserSelect = (user) =>{
        setTestSelectedUser(user);
    };

    console.log("값 확인 0000", testSelectedUser);
    return (
        <div className="flex w-full max-w-md flex-col gap-6">
            <ChatUserSearchBar selectUserList={selectUserList} handleChatCreateButton={handleChatCreateButton}/>
            <ItemGroup>
                {selectUserList?.map((user, index) => (
                    <React.Fragment key={user.userIdx}>
                        <Item onClick={() => handleChatUserSelect(user)}
                              className={`cursor-pointer transition border rounded-md ${
                                  selectedUser?.userIdx === user.userIdx ? 'border border-blue-500 bg-blue-50' : 'border-transparent bg-white'
                              }`}
                        >
                            <ItemMedia>
                                <Avatar>
                                    <AvatarImage src={user?.avatar} className="grayscale"/>
                                    <AvatarFallback>{user?.username?.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </ItemMedia>
                            <ItemContent className="gap-1">
                                <ItemTitle>{user?.username}</ItemTitle>
                                <ItemDescription>{`${user?.lastMessage}`}</ItemDescription>
                            </ItemContent>
                            <ItemContent className="flex-none text-center">
                                <ItemDescription>{user?.lastMessageTime}</ItemDescription>
                            </ItemContent>
                        </Item>
                        {index !== selectUserList?.length - 1 && <ItemSeparator/>}
                    </React.Fragment>
                ))}
            </ItemGroup>
            <Pagination className="w-full flex justify-center mt-4">
                <PaginationContent className="w-full flex justify-between">
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
export default ChatUserList;
