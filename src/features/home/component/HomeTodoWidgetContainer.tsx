import React, {useState} from "react";
import './HomeTodoWidgetContainer.css';
import {useHomeTodoWidgetContainer} from "../hooks/useHomeTodoWigetContainer.ts";

interface DueSelectList {
    name: string,
    value: string,
}

interface TodoStatusList {
    name: string;
    value: string;
}

interface TodoItem {
    id: number;
    title: string;
    date: string;
    status: string;
}


const HomeTodoWidgetContainer: React.FC = () => {
    const {todoList, loading, selectedDue,handleDueChange} = useHomeTodoWidgetContainer();
    const dueSelectList: DueSelectList[] = [
        {name: '이번달', value: 'month'},
        {name: '이번주', value: 'week'},
        {name: '오늘', value: 'today'},
    ]

    const todoStatusList: TodoStatusList[] = [
        {name: '예정된 업무', value: 'todo'},
        {name: "완료된 업무", value: 'in_progress'},
    ]

    const todos: TodoItem[] = [
        {id: 1, title: "오늘은 이거를 해야해", date: "2024-01-02", status: "in_progress"},
        {id: 2, title: "이것도 해야해", date: "2024-01-02", status: "in_progress"},
        {id: 3, title: "또 다른 할일", date: "2024-01-02", status: "in_progress"},
        {id: 4, title: "예정된 작업", date: "2024-01-03", status: "todo"},
        {id: 5, title: "완료된 작업", date: "2024-01-01", status: "done"},
    ];

    // 활성화된 탭 상태 관리
    const [activeTab, setActiveTab] = useState("in_progress");

    // 마커 생성 함수
    const getTodoMarker = (status: string) => {
        let markerClass = "";
        let content = "";
        switch (status) {
            case "in_progress":
                markerClass = "todo-marker in_progress";
                content = "진행중";
                break;
            case "todo":
                markerClass = "todo-marker todo";
                content = "할일";
                break;
            case "done":
                markerClass = "todo-marker done";
                content = "완료";
                break;
            default:
                return null; // 유효하지 않은 상태면 마커 없음
        }
        return <div className="todo-marker-container">
            <span className={markerClass} aria-hidden="true"></span>
            <span style={{fontSize: "14px"}}>{content}</span>
        </div>;
    }


    return (
        <div className="todo-widget-container">
            <div className="todo-widget-container-header">
                <h3 className="todo-tilte">할일</h3>
                <select value={selectedDue} onChange={handleDueChange}>
                    {dueSelectList.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="todo-widget-container-cateogy-tab">
                {todoStatusList.map(tab => (
                    <button
                        key={tab.value}
                        className={`tab-button ${activeTab === tab.value ? "active" : ""}`}
                        onClick={() => setActiveTab(tab.value)}
                    >
                        {tab.name}
                    </button>
                ))}
            </div>
            <div className="todo-list">
                {todos
                    .filter((todo) => todo.status === activeTab)
                    .map((todo) => (
                        <div key={todo.id} className="todo-item">
                            {getTodoMarker(todo.status)}
                            <span>{todo.title}</span>
                            <span>{todo.date}</span>
                        </div>
                    ))}
            </div>
        </div>
    )
};
export default HomeTodoWidgetContainer;