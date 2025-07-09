// ChatBox.tsx
import React, { useEffect, useRef, useState } from 'react';
import styles from './ChatBox.module.css';
import { Message } from '../type/Chat.ts';
import { io, Socket } from 'socket.io-client';
import config from '../../../config.ts';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import {useLocation} from "react-router";
import {jwtDecode} from "jwt-decode";
import {useAuth} from "../../contexts/components/AuthProvider.tsx";

const ChatBox: React.FC = () => {
    const location = useLocation();

    const paths = location.pathname.split('/');
    const userId = paths[paths.length - 1];
    const parsedUserId = userId; // 테스트용 하드코딩
    const {token} = useAuth();
    const decoded = jwtDecode(token);
    const currentUserId = decoded.userId;
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [connectionError, setConnectionError] = useState<string | null>(null);
    const socketRef = useRef<Socket | null>(null);
    const messageListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        socketRef.current = io(`http://localhost:8082`, {
            path: '/socket.io',
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        socketRef.current.on('connect', () => {

            setIsConnected(true);
            setIsLoading(false);
            setConnectionError(null);
            const conversationId = `9`;
            socketRef.current?.emit('join_room', conversationId);
            console.log(`대화방(${conversationId})에 join_room emit`);
        });

        socketRef.current.on('chat_message', (message: Message) => {

            setMessages((prev) => [...prev, message]);
            console.log('수신된 메시지:', message);
        });

        socketRef.current.on('connect_error', (error) => {
            console.error('Socket.IO Connect Error:', error);
            setConnectionError(`Connection Error: ${error.message}`);
            setIsConnected(false);
            setIsLoading(false);
        });

        socketRef.current.on('disconnect', (reason) => {
            console.error('Socket.IO Disconnected:', reason);
            setConnectionError(`Disconnected: ${reason}`);
            setIsConnected(false);
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, [parsedUserId]);

    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (!newMessage.trim() || !socketRef.current?.connected) {
            console.warn('Cannot send message: empty or not connected');
            return;
        }
        const decoded = jwtDecode(token);

        const message: Message = {
            id: "1",
            senderUserId: decoded.userId,
            content: newMessage,
            timestamp: new Date().toISOString(),
            userId: parsedUserId,
        };

        console.log('전송할 메시지:', message);
        socketRef.current?.emit('chat_message', message);
        setMessages((prev) => [...prev, message]);
        setNewMessage('');
    };

    if (isLoading) {
        return <div>Connecting to Socket.IO...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.userName}>Chat #{parsedUserId}</h2>
            </div>
            <div className={styles.messageList} ref={messageListRef}>
                {messages.length === 0 ? (
                    <div className={styles.emptyState}>No messages yet</div>
                ) : (
                    messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`${styles.message} ${
                                msg.senderId === currentUserId ? styles.sent : styles.received
                            }`}
                        >
                            <p className={styles.messageContent}>{msg.content}</p>
                            <span className={styles.messageTime}>
                                {format(new Date(msg.timestamp), 'a h:mm', { locale: ko })}
                            </span>
                        </div>
                    ))
                )}
            </div>
            <div className={styles.inputArea}>
                <input
                    type="text"
                    placeholder="Type a message..."
                    className={styles.messageInput}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && newMessage.trim()) {
                            handleSendMessage();
                        }
                    }}
                    disabled={!isConnected}
                />
                <button
                    className={styles.sendButton}
                    onClick={handleSendMessage}
                    disabled={!isConnected}
                >
                    Send
                </button>
            </div>
            {connectionError && <div className={styles.error}>{connectionError}</div>}
            {!isConnected && !connectionError && (
                <div className={styles.error}>Socket.IO disconnected</div>
            )}
        </div>
    );
};

export default ChatBox;