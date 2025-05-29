import React, {useEffect, useState} from "react";
import "./TodoDetail.css";
import {useNavigate, useParams} from "react-router";
import {Todo} from "../features/workspace/type/TodoFormData.ts";
import {getTodoById} from "../features/workspace/api/Todo.ts";
import {FiEdit, FiTrash2} from "react-icons/fi";

const TodoDetail: React.FC = () => {
    const {idx} = useParams<{ idx: string }>();
    const navigate = useNavigate();
    const [todo, setTodo] = useState<Todo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTodo = async () => {
            if (!idx) {
                setError('유효하지 않은 Todo ID입니다.');
                setLoading(false);
                return;
            }
            try {
                const response = await getTodoById(Number(idx));
                setTodo(response.data);
            } catch (error) {
                console.error('Todo 상세 조회 오류:', error);
                setError('Todo 데이터를 가져오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };
        fetchTodo();
    }, [idx]);

    if (loading) {
        return (
            <div className="todo-detail-loading">
                <svg className="spinner" viewBox="0 0 24 24">
                    <circle className="spinner-path" cx="12" cy="12" r="10"/>
                </svg>
                <p>로딩 중...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="todo-detail-error">
                <p>{error}</p>
                <button className="todo-detail-button" onClick={() => navigate('/workspace')}>
                    목록으로 돌아가기
                </button>
            </div>
        );
    }

    if (!todo) {
        return (
            <div className="todo-detail-error">
                <p>Todo를 찾을 수 없습니다.</p>
                <button className="todo-detail-button" onClick={() => navigate('/workspace')}>
                    목록으로 돌아가기
                </button>
            </div>
        );
    }

    const statusConfig = {
        TODO: {label: '할 일', className: 'todo-badge todo'},
        IN_PROGRESS: {label: '진행 중', className: 'todo-badge in-progress'},
        DONE: {label: '완료', className: 'todo-badge done'},
    };

    const {label, className} = statusConfig[todo.status] || {
        label: todo.status,
        className: 'todo-badge default',
    };

    return (
        <div className="todo-detail-container">
            <div className="todo-detail-card">
                <div className="todo-detail-header">
                    <h2 className="todo-detail-title">{todo?.title}</h2>
                    <div className="todo-detail-actions">
                        <button
                            className="todo-detail-edit-button"
                            onClick={() => navigate('/workspace')}
                            title="수정"
                        >
                            <FiEdit className="icon">
                                수정
                            </FiEdit>
                        </button>
                        <button
                            className="todo-detail-delete-button"
                            onClick={() => navigate('/workspace')}
                            title="삭제"
                        >
                            <FiTrash2 className="icon">
                                삭제
                            </FiTrash2>
                        </button>
                    </div>
                </div>
                <div className="todo-detail-content">
                    <div className="todo-detail-field">
                        <span className="todo-detail-label">내용:</span>
                        <span className="todo-detail-value">{todo?.description || '없음'}</span>
                    </div>
                    <div className="todo-detail-field">
                        <span className="todo-detail-label">상태:</span>
                        <span className={className}>{label}</span>
                    </div>
                    <div className="todo-detail-field">
                        <span className="todo-detail-label">생성일자:</span>
                        <span className="todo-detail-value">{todo?.createdAt || 'N/A'}</span>
                    </div>
                    <div className="todo-detail-field">
                        <span className="todo-detail-label">수정일자:</span>
                        <span className="todo-detail-value">{todo?.updatedAt || 'N/A'}</span>
                    </div>
                </div>
                <div className="todo-detail-footer">
                    <button
                        className="todo-detail-button"
                        onClick={() => navigate('/workspace')}
                    >
                        목록으로 돌아가기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoDetail;