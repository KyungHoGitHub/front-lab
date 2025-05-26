
import React, {useState} from 'react';
import Table from "../shared/component/common/Table.tsx";
import {useNavigate} from "react-router";
import "./Todo.css";
import TodoModal from "../features/workspace/components/TodoModal.tsx";
const Todo: React.FC = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [todos, setTodos] = useState<{ title: string; description: string }[]>([]);

    // const handleAddTodo = (todo: { title: string; description: string }) => {
    //     console.log('새 Todo:', todo); // 임시: 콘솔 출력
    //     setTodos([...todos, todo]); // 로컬 상태에 추가
    // };

    const activityData= [
        { id: 1, name: '김길동',action: '로그인', initDate: '2023-10-01' ,currentDate:'2025-04-08'},
        { id: 2,name: '홍길동', action: '프로필 업데이트', initDate: '2023-10-02',currentDate:'2025-04-08' },
        { id: 3,name: '서초동', action: '로그아웃', initDate: '2023-10-03',currentDate:'2025-04-08' },
        { id: 1, name: '김길동',action: '로그인', initDate: '2023-10-01' ,currentDate:'2025-04-08'},
        { id: 2,name: '홍길동', action: '프로필 업데이트', initDate: '2023-10-02',currentDate:'2025-04-08' },
        { id: 3,name: '서초동', action: '로그아웃', initDate: '2023-10-03',currentDate:'2025-04-08' },
        { id: 1, name: '김길동',action: '로그인', initDate: '2023-10-01' ,currentDate:'2025-04-08'},
        { id: 2,name: '홍길동', action: '프로필 업데이트', initDate: '2023-10-02',currentDate:'2025-04-08' },
        { id: 3,name: '서초동', action: '로그아웃', initDate: '2023-10-03',currentDate:'2025-04-08' },
        { id: 1, name: '김길동',action: '로그인', initDate: '2023-10-01' ,currentDate:'2025-04-08'},
        { id: 2,name: '홍길동', action: '프로필 업데이트', initDate: '2023-10-02',currentDate:'2025-04-08' },
        { id: 3,name: '서초동', action: '로그아웃', initDate: '2023-10-03',currentDate:'2025-04-08' },
        { id: 1, name: '김길동',action: '로그인', initDate: '2023-10-01' ,currentDate:'2025-04-08'},
        { id: 2,name: '홍길동', action: '프로필 업데이트', initDate: '2023-10-02',currentDate:'2025-04-08' },
        { id: 3,name: '서초동', action: '로그아웃', initDate: '2023-10-03',currentDate:'2025-04-08' },
    ];
    // 상세 페이지로 이동하는 핸들러
    const handleCellClick = (record) => {
        navigate(`/activity/${record.id}`); // 예: /activity/1로 이동
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
            title : '이름',
            dataIndex: 'name',
            sorter: (a, b) => a.id - b.id, // 숫자 정렬
            onCellClick: handleCellClick,
        },
        {

            title: '활동',
            dataIndex: 'action',
            sorter: (a, b) => a.action.localeCompare(b.action), // 문자열 정렬
        },
        {
            title: '생성일자',
            dataIndex: 'initDate',
            sorter: (a, b) => a.initDate.localeCompare(b.initDate), // 날짜 문자열 정렬
        },
        {
            title : '최근접속일자',
            dataIndex: 'currentDate',
        }
    ];

    return (
        <div className="todo-container">
            <button className="todo-create-button" onClick={()=>setIsModalOpen(true)}>
                할일 만들기
            </button>
            <TodoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                // onSubmit={handleAddTodo}
            />
            <Table columns={activityColumns} dataSource={activityData}/>
        </div>
    );
};

export default Todo;