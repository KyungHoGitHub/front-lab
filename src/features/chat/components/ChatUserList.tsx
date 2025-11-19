import * as React from "react"


import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemMedia,
    ItemSeparator,
    ItemTitle,
} from "@/components/ui/item"

const ChatUserList = ({selectUserList,chatUserListHandleClick})=> {

    if (selectUserList===null) return ;
    return (
        <div className="flex w-full max-w-md flex-col gap-6">
            <ItemGroup>
                {selectUserList.map((person, index) => (
                    <React.Fragment key={person.username}>
                        <Item onClick={()=>chatUserListHandleClick(person)}>
                            <ItemMedia>
                                <Avatar>
                                    <AvatarImage src={person.avatar} className="grayscale" />
                                    <AvatarFallback>{person.username.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </ItemMedia>
                            <ItemContent className="gap-1">
                                <ItemTitle>{person.username}</ItemTitle>
                                <ItemDescription>{`${person.lastMessage}`}</ItemDescription>
                            </ItemContent>
                            <ItemContent className="flex-none text-center">
                                <ItemDescription>{person.lastMessageTime}</ItemDescription>
                            </ItemContent>
                        </Item>
                        {index !== selectUserList.length - 1 && <ItemSeparator />}
                    </React.Fragment>
                ))}
            </ItemGroup>
        </div>
    )
}
export default ChatUserList;
