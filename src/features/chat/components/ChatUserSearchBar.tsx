import React, {useEffect, useState} from 'react';
import {Input} from "@/components/ui/input.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {LuMessageSquarePlus} from 'react-icons/lu';
import {IoChatbubblesSharp} from "react-icons/io5";

interface User {
    userIdx : number;
    username: string;
    userId: string;
}

interface ChatUserSearchBarProps {
    selectUserList: User[] | null;
    handleChatCreateButton: (data:any) => void;
}

const ChatUserSearchBar  = ({selectUserList, handleChatCreateButton}: ChatUserSearchBarProps) => {
    const [query, setQuery] = useState<string>("");
    const [results, setResults] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    useEffect(() => {
        if (!selectUserList) {
            setResults([]);
            return;
        }

        const q = (query ?? "").trim().toLowerCase();
        if (q.length === 0) {
            setResults([]);
            return;
        }

        const id = setTimeout(() => {
            const filtered = selectUserList.filter((user) => {
                const uid = (user.userId ?? "").toLowerCase();
                return uid.includes(q);
            });
            setResults(filtered);
        }, 300);

        return () => clearTimeout(id);
    }, [query]);


    const handleSelect = (user: User) => {
        setSelectedUser(user);
        setQuery(user.userId); // input에 선택한 유저 이름 반영
        setResults([]);

    };

    return (
        <Popover>
            <PopoverTrigger>
                <Button onClick={() => {
                    setQuery("")
                }} className="w-80 mt-4" variant="outline"><IoChatbubblesSharp/>채팅</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-1">
                    <div className="flex items-center gap-2 ">
                        <Input
                            placeholder="유저 검색..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <Button onClick={() => handleChatCreateButton(selectedUser)}><LuMessageSquarePlus/></Button>
                    </div>
                    {results.length > 0 && (
                        <ScrollArea className="absolute z-10 w-full max-h-60 mt-1 bg-white border rounded-md shadow-md">
                            <ul>
                                {results.map((user) => (
                                    <li
                                        key={user.userId}
                                        className={cn(
                                            "p-2 cursor-pointer hover:bg-gray-100",
                                            selectedUser?.userId === user.userId && "bg-gray-200"
                                        )}
                                        onClick={() => handleSelect(user)}
                                    >
                                        {user.userId}
                                    </li>
                                ))}
                            </ul>
                        </ScrollArea>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default ChatUserSearchBar;