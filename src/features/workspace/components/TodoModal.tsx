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
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const {register, handleSubmit, reset, formState: {errors}} = useForm<TodoFormData>({
        defaultValues:{
            title: '',
            descriptions: '',
            status:'TODO',
        }
    });

    const statusOptions: { value: TodoFormData['status']; label: string }[] = [
        { value: 'TODO', label: '할 일' },
        { value: 'IN_PROGRESS', label: '진행 중' },
        { value: 'DONE', label: '완료' }
    ];
    const [error, setError] = useState<string| null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const onSubmit = async (data: TodoFormData) =>{
        setLoading(true);
        setError(null);

        try{
            await todoModalSubmit(data);
            reset();
        }catch (e){
            console.log(e.message);
        }finally {
            setLoading(false);
        }
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