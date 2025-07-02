import React, {useEffect, useState} from "react";
import styles from './MessageBox.module.css';
import {Conversation, User} from '../../types';
import {Plus} from "lucide-react";
import {AiOutlinePlus} from "react-icons/ai";
import {useNavigate} from "react-router";
import MessageUserListModal from "./MessageUserListModal.tsx";
import {getConversationList} from "../api/Chat.ts";
import {useAuth} from "../../contexts/components/AuthProvider.tsx";
import {jwtDecode} from "jwt-decode";

const MessageBox: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const {token} = useAuth();
    const [data, setData] = useState();

    const navigate = useNavigate();
    // 예시 데이터 (샘플 대화 목록)
    const sampleConversations: Conversation[] = [
        {
            user: {id: '1', avatar: null, name: 'Elmer Laverity'},
            lastMessage: 'Hehe oh man 😄',
            timestamp: '12m',
        },
        {
            user: {id: '2', avatar: null, name: 'Florencio Dorrance'},
            lastMessage: 'wooohooo',
            timestamp: '24m',
        },
        {
            user: {id: '3', avatar: null, name :'Laverne Laboy'},
            lastMessage: 'Haha that\'s terrifying 😱',
            timestamp: '1h',
        },
        {
            user: {id: '4', avatar: null, name: 'Titus Kitamura'},
            lastMessage: 'omg, this is amazing',
            timestamp: '5h',
        },
        {
            user: {id: '5', avatar: null, name: 'Geoffrey Mott'},
            lastMessage: 'aww 😊',
            timestamp: '2d',
        },
        {
            user: {id: '6', avatar: null, name: 'Alfonzo Schuessler'},
            lastMessage: 'perfect',
            timestamp: '1m',
        },
    ];
    console.log(isModalOpen);
    const filteredConversations = sampleConversations.filter((conv) =>
        conv.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectUser = (userId: string) =>{
        navigate(`/workspace/chat/${userId}`);
    }

    const messageUserListButtonClick =()=>{
        setIsModalOpen(true);
    }

    const conv = {
        user: {
            id: 'test',
            avatar: null,
            name: 'test',
        },
        lastMessage: 'test',
        timestamp: '2222'
    }

    useEffect(() => {
        const fetchConversationList = async ()=>{
            setLoading(true);
            try{
                const decoded = jwtDecode(token);
                console.log('deddddddd------->',decoded)
                const res = await getConversationList(decoded.sub);
                setData(res);
            }catch (error){
                console.error(error);
            }finally {
                setLoading(false);
            }
        }
        fetchConversationList();
    }, []);


    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Messages</h2>
                <button
                    onClick={messageUserListButtonClick}
                    className={styles.addButton}
                    aria-label="Add new contact"
                >
                    {/* 루시드 라이브 러리 아이콘 적용 방법 */}
                    {/*<Plus className = {styles.addIcon}/>*/}
                    <AiOutlinePlus size={24} color="#3765fc"/>
                </button>
                <MessageUserListModal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)} >
                </MessageUserListModal>
            </div>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="Search or add contact..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
            </div>
            <div className={styles.conversationList}>
                {filteredConversations.map((conv) => (
                <div
                    key={conv.user.id}
                    className={styles.conversationItem}
                    onClick={() => handleSelectUser(conv.user.id)}
                >
                    <img
                        src={'https://ui-avatars.com/api/?name=John+Doe&background=random'}
                        alt={conv.user.name}
                        className={styles.avatar}
                    />
                    <div className={styles.conversationInfo}>
                        <h3 className={styles.userName}>{conv.user.name}</h3>
                        <p className={styles.lastMessage}>{conv.lastMessage}</p>
                    </div>
                    <span className={styles.timestamp}>{conv.timestamp}</span>
                </div>
                ))}
            </div>
            {/*{isPopupOpen && (*/}
            {/*    <div className={styles.popupOverlay}>*/}
            {/*        <div className={styles.popup}>*/}
            {/*            <h3 className={styles.popupTitle}>Add New Contact</h3>*/}
            {/*            <input*/}
            {/*                type="text"*/}
            {/*                placeholder="Enter contact name or email"*/}
            {/*                className={styles.popupInput}*/}
            {/*            />*/}
            {/*            <div className={styles.popupActions}>*/}
            {/*                <button onClick={() => setIsPopupOpen(false)} className={styles.cancelButton}>*/}
            {/*                    Cancel*/}
            {/*                </button>*/}
            {/*                <button onClick={handleAddContact} className={styles.addContactButton}>*/}
            {/*                    Add*/}
            {/*                </button>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    )
}

export default MessageBox;