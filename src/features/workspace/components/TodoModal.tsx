// src/features/workspace/components/TodoModal.tsx
import React, { useState } from 'react';
import './TodoModal.css';

interface TodoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (todo: { title: string; description: string }) => void;
}

const TodoModal: React.FC<TodoModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        onSubmit({ title, description });
        setTitle('');
        setDescription('');
        onClose();
    };

    return (
        <div className="antd-modal-overlay">
            <div className="antd-modal-content">
                <h2>Todo 추가</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">제목</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">상태</label>
                        <select
                            id="status"
                            value={status}
                    
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">설명</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="antd-modal-actions">
                        <button type="button" onClick={onClose}>
                            취소
                        </button>
                        <button type="submit">추가</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TodoModal;