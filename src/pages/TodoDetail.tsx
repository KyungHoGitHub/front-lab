import React, {useEffect, useState} from "react";
import "./TodoDetail.css";
import {useNavigate, useParams} from "react-router";
import {Todo} from "../features/workspace/type/TodoFormData.ts";
import {getTodoById, updateTodo, updateTodoIsDelete} from "../features/workspace/api/Todo.ts";
import {FiEdit, FiTrash2} from "react-icons/fi";

const TodoDetail: React.FC = () => {
    const {idx} = useParams<{ idx: string }>();
    const navigate = useNavigate();
    const [todo, setTodo] = useState<Todo | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState<Partial<Todo>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const onIsDeleteUpdate = async () => {
        const parsedIdx = Number(idx);
        // 처리 전에는 로딩값 true 로 로딩 상태 처리함
        setLoading(true);
        //  현재 에러를 발생하지 않아서 기본값 null
        setError(null);
        try {
            await updateTodoIsDelete(parsedIdx);
            setSuccessMessage("정상적으로 처리 되었습니다.");
            setTimeout(() => {
                navigate("/workspace/todo");
            }, 1000);
        } catch (e) {
            console.log(e.message);
        } finally {
            setLoading(false);
        }
    }
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
                setEditForm({
                    title: response.data.title,
                    description: response.data.description,
                    status: response.data.status,
                })
            } catch (error) {
                console.error('Todo 상세 조회 오류:', error);
                setError('Todo 데이터를 가져오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };
        fetchTodo();
    }, [idx]);

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const updatedTodo = {
                title: editForm.title,
                description: editForm.description || '',
                status: editForm.status || 'TODO',
            }
            await updateTodo(Number(idx), updatedTodo);
            const res = await getTodoById(Number(idx));
            setTodo(res.data);
            setSuccessMessage(' 정상적으로 수정 되었음');
            setLoading(false);
            setIsEditing(false);
            setTimeout(() => {
                setSuccessMessage(null);
            }, 1000)
        } catch (e) {
            setError('수정 싪패');
        } finally {
            setLoading(false);
        }
    }

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
            {successMessage && <p className="success-message">{successMessage}</p>}
            <div className="todo-detail-card">
                <div className="todo-detail-header">
                    <h2 className="todo-detail-title">{todo?.title}</h2>
                    <div className="todo-detail-actions">
                        <button
                            className="todo-detail-edit-button"
                            onClick={() => setIsEditing(true)}
                            title="수정"
                        >
                            <FiEdit className="icon">
                                수정
                            </FiEdit>
                        </button>
                        <button
                            className="todo-detail-delete-button"
                            onClick={() => onIsDeleteUpdate()}
                            title="삭제"
                        >
                            <FiTrash2 className="icon">
                                삭제
                            </FiTrash2>
                        </button>
                    </div>
                </div>
                <div className="todo-detail-content">
                    <div className="todo-detail-field"   style={{ whiteSpace: 'pre-line' }}>
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
            {
                isEditing && (
                    <div className="todo-modal-overlay">
                        <div className="todo-modal">
                            <h3 className="todo-modal-title">Todo 수정</h3>
                            <form onSubmit={handleEditSubmit} className="todo-modal-form">
                                <div className="form-group">
                                    <label htmlFor="title" className="form-label">제목</label>
                                    <input
                                        id="title"
                                        type="text"
                                        value={editForm.title || ''}
                                        onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                                        className="form-input"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description" className="form-label">내용</label>
                                    <textarea
                                        id="description"
                                        value={editForm.description || ''}
                                        onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                                        className="form-textarea"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="status" className="form-label">상태</label>
                                    <select
                                        id="status"
                                        value={editForm.status || 'TODO'}
                                        onChange={(e) => setEditForm({
                                            ...editForm,
                                            status: e.target.value as Todo['status']
                                        })}
                                        className="form-select"
                                    >
                                        <option value="TODO">할 일</option>
                                        <option value="IN_PROGRESS">진행 중</option>
                                        <option value="DONE">완료</option>
                                    </select>
                                </div>
                                <div className="todo-modal-actions">
                                    <button type="submit" className="todo-detail-button todo-save">
                                        저장
                                    </button>
                                    <button
                                        type="button"
                                        className="todo-detail-button"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        취소
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </div>
    )
        ;
};

export default TodoDetail;