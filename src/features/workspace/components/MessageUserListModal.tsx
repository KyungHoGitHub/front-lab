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
            const fetcUsers = await getMessageUserList();
            setUsers(fetcUsers.data);
            setFilteredUsers(fetcUsers.data);
        } catch (error) {

        }
    }
    // 유저 목록 필터링 함수
    const handleSearch = () => {
        const filtered = users.filter((user) =>
            user.userId.toLocaleString().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    };
    const handleUserClick =(userIdx: number)=>{
        navigate(`/workspace/chat/${userIdx}`);
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
                            <div key={user.userId} className={styles.userItem} onClick={()=>handleUserClick(user.userIdx)}>
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