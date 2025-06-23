import React, {useState} from "react";
import "./Memo.css";
import {FiEdit, FiTrash2} from "react-icons/fi";

// 메모 데이터 타입 정의
interface MemoData {
    id: number;
    title: string;
    content: string;
    createdAt: string; // 예: "2024.12"
}

// Memo 컴포넌트의 Props 타입 정의
interface MemoProps {
    memo: MemoData;
    onEdit: (id: number) => void; // 수정 버튼 클릭 시 호출
    onDelete: (id: number) => void; // 삭제 버튼 클릭 시 호출
    className?: string; // 추가적인 CSS 클래스 (선택적)
    index: number;
}

const Memo:React.FC<MemoProps> = ({ memo, onEdit, onDelete, className = '', index })=>{
    const [backgroundColor, setBackgroundColor] = useState('#fff');
    const [showMenu, setShowMenu] = useState(false);

    const colorOptions = [
        { name: '회색', value: '#f5f5f5' },
        { name: '노랑', value: '#fff9c4' },
        { name: '초록', value: '#c8e6c9' },
        { name: '파랑', value: '#bbdefb' },
        { name: '분홍', value: '#f8bbd0' },
    ];

    const toggleMenu = () => {
        setShowMenu(!showMenu);
        onEdit(memo.id);
    };

    const handleColorChange = (color: string) => {
        setBackgroundColor(color);
        setShowMenu(false);
    };

    const handleContentEdit = () => {
        alert('내용 수정 기능은 나중에 구현 예정입니다.');
        setShowMenu(false);
    };

    return (
        <div className={`memo memo-appear ${className}`} style={{ backgroundColor, animationDelay:`${index * 0.2}s` }}>
            <div className="memo-header">
                <h3 className="memo-title">{memo?.title}</h3>
                <div className="memo-actions">
                    <button className="memo-edit" onClick={toggleMenu}>
                        <FiEdit className="icon">
                            수정
                        </FiEdit>
                    </button>
                    <button className="memo-delete" onClick={() => onDelete(memo.id)}>
                        <FiTrash2 className="icon">
                            삭제
                        </FiTrash2>
                    </button>
                    {showMenu && (
                        <div className="memo-edit-menu">
                            <button className="memo-edit-option" onClick={handleContentEdit}>
                                내용 수정
                            </button>
                            <button className="memo-edit-option memo-color-option">
                                색상 변경
                                <div className="color-palette">
                                    {colorOptions.map((color) => (
                                        <span
                                            key={color.value}
                                            className="color-swatch"
                                            style={{ backgroundColor: color.value }}
                                            title={color.name}
                                            onClick={() => handleColorChange(color.value)}
                                        />
                                    ))}
                                </div>
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <p className="memo-content">{memo.content}</p>
            <div className="memo-footer">
                <span className="memo-created-at">생성일: {memo.createdAt}</span>
            </div>
        </div>
    );
}
export default Memo;