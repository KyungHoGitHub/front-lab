import React from "react";
import {useParams} from "react-router";
import styles from './ChatBox.module.css';

const ChatBox:React.FC = () =>{
    const {userId} = useParams<{userId: string}>();
  // 샘플 메시지 데이터 (실제로는 API에서 가져옴)
    const sampleMessages = [
        { id: 'm1', senderId: userId || '1', content: 'Hi there!', timestamp: '10:25 AM' },
        { id: 'm2', senderId: 'currentUser', content: 'Hello! How can I help you?', timestamp: '10:26 AM' },
    ];
    console.log('들어옴?')
    // 샘플 유저 데이터 (실제로는 API 또는 컨텍스트에서 가져옴)
    const user = [
        { id: '1', name: 'Elmer Laverity', avatar: null },
        { id: '2', name: 'Florencio Dorrance', avatar: null },
        { id: '3', name: 'Laverne Laboy', avatar: null },
        { id: '4', name: 'Titus Kitamura', avatar: null },
        { id: '5', name: 'Geoffrey Mott', avatar: null },
        { id: '6', name: 'Alfonzo Schuessler', avatar: null },
    ].find(u => u.id === userId);

    if (!user) {
        return <div className={styles.emptyState}>Select a contact to start chatting</div>;
    }
    return (

        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.userName}>{user.name}</h2>
            </div>
            <div className={styles.messageList}>
                {sampleMessages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`${styles.message} ${
                            msg.senderId === 'currentUser' ? styles.sent : styles.received
                        }`}
                    >
                        <p className={styles.messageContent}>{msg.content}</p>
                        <span className={styles.messageTime}>{msg.timestamp}</span>
                    </div>
                ))}
            </div>
            <div className={styles.inputArea}>
                <input
                    type="text"
                    placeholder="Type a message..."
                    className={styles.messageInput}
                />
                <button className={styles.sendButton}>Send</button>
            </div>
        </div>


    )
}
export default ChatBox;