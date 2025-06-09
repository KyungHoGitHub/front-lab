import React from "react";
import {Outlet} from "react-router";
import MessageBox from "../features/workspace/components/MessageBox.tsx";
import './Chat.css';

const Chat: React.FC = () => {
    return (
        <div className="chat-content">
            <MessageBox/>
            <Outlet/>
        </div>
    )
}
export default Chat;