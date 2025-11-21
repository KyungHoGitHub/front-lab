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

interface ChatUserListProps {
    selectedUser: ChatUser | null;
    selectUserList: ChatUser[] | null;
    chatUserListHandleClick: (chatUser: ChatUser) => void;
}

const ChatUserList = ({selectedUser, selectUserList, chatUserListHandleClick}: ChatUserListProps) => {
    if (selectUserList === null) return;

    return (
        <div className="flex w-full max-w-md flex-col gap-6">
            <ItemGroup>
                {selectUserList?.map((user, index) => (
                    <React.Fragment key={user.userIdx}>
                        <Item onClick={() => chatUserListHandleClick(user)}
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
        </div>
    )
}
export default ChatUserList;
