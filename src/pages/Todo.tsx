import React, {useEffect, useState} from 'react';
import Table from "../shared/component/common/Table.tsx";
import {Outlet, useLocation, useNavigate} from "react-router";
import "./Todo.css";
import TodoModal from "../features/workspace/components/TodoModal.tsx";
import {TodoFormData} from "../features/workspace/type/TodoFormData.ts";
import {getTodoList, searchTodos} from "../features/workspace/api/Todo.ts";
import {FaCheckCircle, FaClock, FaSync} from "react-icons/fa";
import SearchBar from "../shared/component/common/SearchBar.tsx";

const Todo: React.FC = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [todos, setTodos] = useState<{
        id: string;
        title: string;
        description: string;
        status: TodoFormData['status']
    }[]>([]);
    const location = useLocation();
    const isDetailPage = location.pathname.includes('detail');
    // 검색 핸들러
    const handleSearch = async (searchBy: 'title' | 'description', searchTerm: string) => {
        try {
            const res = await searchTodos(searchBy, searchTerm);
            setTodos(res.data);
        } catch (e) {
            console.log(e);
        } finally {
            console.log('끝')
        }
    }
    // 상세 페이지로 이동하는 핸들러
    const handleCellClick = (record :{idx :number}) => {
        console.log('record 값 확인  ---->',record);
        navigate(`/workspace/todo/detail/${record.idx}`); // 예: /activity/1로 이동
        // 또는 간단히 테스트용으로 alert 사용:
        // alert(`Clicked activity: ${record.action} (ID: ${record.id})`);
    };

    const activityColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            // sorter: (a, b) => a.id - b.id, // 숫자 정렬
        },
        {
            title: '제목',
            dataIndex: 'title',
            sorter: (a, b) => a.title.localeCompare(b.title),
            onCellClick: handleCellClick,
        },
        {
            title: '상태',
            dataIndex: 'status',
            sorter: (a, b) => a.status.localeCompare(b.status),
            render: (status: TodoFormData['status']) => {
                const tagConfig = {
                    TODO: {label: '할 일', className: 'todo', icon: <FaClock className="tag-icon"/>},
                    IN_PROGRESS: {label: '진행 중', className: 'in-progress', icon: <FaSync className="tag-icon"/>},
                    DONE: {label: '완료', className: 'done', icon: <FaCheckCircle className="tag-icon"/>},
                };
                const {label, className, icon} = tagConfig[status] || {label: status, className: '', icon: null};
                return (
                    <span className={`custom-tag ${className}`}>
            {icon}
                        {label}
          </span>
                );
            },
        },
        {
            title: '생성일자',
            dataIndex: 'createdAt',
            sorter: (a, b) => a.initDate.localeCompare(b.initDate), // 날짜 문자열 정렬
        },
        {
            title: '수정일자',
            dataIndex: 'updateAt',
        }
    ];

    useEffect(() => {
        const fetchTodo = async () => {

            try {
                const res = await getTodoList();
                setTodos(res.data);
                console.log('todo 리스트 데이터 옴', res.data)
            } catch (e) {
                console.log(e);
            } finally {
                console.log('exit')
            }
        };
        fetchTodo();
    }, [location]);
    return (
        <div className="todo-container">
            {!isDetailPage && (
                <>
                    <div className="todo-header">
                        <button className="todo-create-button" onClick={() => setIsModalOpen(true)}>
                            할일 만들기
                        </button>

                        <SearchBar onSearch={handleSearch}/>
                    </div>
                    <TodoModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        // onSubmit={handleAddTodo}
                    />
                    <Table columns={activityColumns} dataSource={todos}/>
                </>
            )}
            <Outlet/>
        </div>
    );
};

export default Todo;