import React, {useEffect, useState} from "react";
import styles from './MessageUserListModal.module.css';
import {getMessageUserList} from "../api/Chat.ts";
import {AiOutlineClose} from "react-icons/ai";
import {useNavigate} from "react-router";

interface MessageUserListProps {
    isOpen: boolean;
    onClose: () => void;
}

const MessageUserListModal: React.FC<MessageUserListProps> = ({isOpen, onClose}) => {
    // 유저 검색값
    const [searchTerm, setSearchTerm] = useState<string>("");
    // 유저 목록
    const [users, setUsers] = useState([]);
    // 필터링할 유저 목록
    const [filteredUsers, setFilteredUsers] = useState([]);
    const navigate = useNavigate();

    // 유저 목록 조회 함수
    const handleUserFind = async () => {
        try {
            const fetchUsers = await getMessageUserList();
            console.log('유저 목록',fetchUsers)
            setUsers(fetchUsers.data);
            setFilteredUsers(fetchUsers.data);
        } catch (error) {
            console.log(error)
        }
    }
    // 유저 목록 필터링 함수
    const handleSearch = () => {
        const filtered = users.filter((user) =>
            user.userId.toLocaleString().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    };
    const handleUserClick =(userId: string)=>{
        navigate(`/workspace/chat/${userId
        }`);
        onClose();
    }

    useEffect(() => {
            handleUserFind();

    }, []);
    if (!isOpen) {
        return;
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.header}>
                    <input
                        type="text"
                        placeholder="유저 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                    <button onClick={handleSearch} className={styles.searchButton}>
                        검색
                    </button>
                    <button className={styles.closeButton} onClick={onClose}>
                        <AiOutlineClose size={24}/>
                    </button>
                </div>
                <div className={styles.userList}>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <div key={user.userId} className={styles.userItem} onClick={()=>handleUserClick(user.userId)}>
                                <img
                                    src={user.imageUrl || 'https://ui-avatars.com/api/?name=John+Doe&background=random'}
                                    className={styles.userAvatar}
                                />
                                <span className={styles.userId}>{user.userId}</span>
                                <hr className={styles.divider}/>
                            </div>
                        ))
                    ) : (
                        <p>유저가 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    );
};
export default MessageUserListModal;