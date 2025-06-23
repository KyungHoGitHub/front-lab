// src/features/workspace/components/TodoModal.tsx
import React, { useState } from 'react';
import './TodoModal.css';
import {todoModalSubmit} from "../api/Todo.ts";
import {useForm} from "react-hook-form";
import {TodoFormData} from "../type/TodoFormData.ts";

interface TodoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (todo: { title: string; description: string }) => void;
}

const TodoModal: React.FC<TodoModalProps> = ({ isOpen, onClose }) => {
    const [error, setError] = useState<string| null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const {register, handleSubmit, reset, formState: {errors}} = useForm<TodoFormData>({
        defaultValues:{
            title: '',
            description: '',
            status:'TODO',
        }
    });

    const statusOptions: { value: TodoFormData['status']; label: string }[] = [
        { value: 'TODO', label: '할 일' },
        { value: 'IN_PROGRESS', label: '진행 중' },
        { value: 'DONE', label: '완료' }
    ];

    const onSubmit = async (data: TodoFormData) =>{
        setLoading(true);
        setError(null);
        try{
            await todoModalSubmit(data);
            reset();
            onClose();
        }catch (e){
            console.log(e.message);
        }finally {
            setLoading(false);
        }
    }

    const handleCancel = () => {
        reset(); // 폼 초기화
        onClose(); // 모달 닫기
    };
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleCancel(); // 오버레이 클릭 시 모달 닫기
        }
    };

    if (!isOpen) {
        return null; // isOpen이 false면 아무것도 렌더링하지 않음
    }

    return (
        <div className="antd-modal-overlay">
            <div className="antd-modal-content">
                <h2>Todo 추가</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="title">제목</label>
                        <input
                            id="title"
                            {...register('title',{required: '제목은 필수임'})}
                        />
                        {errors.title && <p style={{ color: 'red' }}>{errors.title.message}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">상태</label>
                        <select
                            id="status"
                            {...register('status', {required: '상태를 선택하세요.'})}
                        >
                            {statusOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {errors.status && <p style={{ color: 'red' }}>{errors.status.message}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">설명</label>
                        <textarea
                            id="description"
                            {...register('description', {required: '내용를 입력하세요.'})}
                        />
                        {errors.description && <p style={{ color: 'red' }}>{errors.description.message}</p>}
                    </div>
                    <div className="antd-modal-actions">
                        <button type="button" onClick={handleCancel} disabled={loading}>
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