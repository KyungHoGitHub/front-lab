import React, {useState} from "react";
import './HomeTodoWidgetContainer.css';
import {useHomeTodoWidgetContainer} from "../hooks/useHomeTodoWigetContainer.ts";
import {TodoStatus, TodoTab} from "../type/enums.ts";
import dayjs from "dayjs";
import {EMPTY_MESSAGE} from "../type/message.ts";
import { isEmpty } from 'lodash';

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
    const {todoList, loading, selectedDue, handleDueChange} = useHomeTodoWidgetContainer();
    // 활성화된 탭 상태 관리
    const [activeTab, setActiveTab] = useState("pending");

    const dueSelectList: DueSelectList[] = [
        {name: '이번달', value: 'month'},
        {name: '이번주', value: 'week'},
        {name: '오늘', value: 'today'},
    ]

    const todoStatusList: TodoStatusList[] = [
        {name: '예정된 업무', value: 'pending'},
        {name: "완료된 업무", value: 'done'},
    ]

    // 마커 생성 함수
    const getTodoMarker = (status: string) => {
        let markerClass = "";
        let content = "";
        switch (status) {
            case "IN_PROGRESS":
                markerClass = "todo-marker in_progress";
                content = "진행중";
                break;
            case "TODO":
                markerClass = "todo-marker todo";
                content = "할일";
                break;
            case "DONE":
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

    const filteredTodos = todoList?.filter((todo) => {
        if (activeTab === TodoTab.PENDING) {
            return todo.status === TodoStatus.TODO || todo.status === TodoStatus.IN_PROGRESS;
        } else if (activeTab === TodoTab.DONE) {
            return todo.status === TodoStatus.DONE;
        }
        return true;
    }) || [];

    const processedTodos = [...filteredTodos]
        .sort((a,b)=> dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf())
        .map(todo =>({
            ...todo,
            createdAt : dayjs(todo.createdAt).format('MM-DD')
            }));


    const isTodoListEmpty = isEmpty(processedTodos);

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
                {loading ? (
                    <div className="empty-message">{EMPTY_MESSAGE.loading}</div>
                ) : isTodoListEmpty ? (
                    <div className="empty-message">{EMPTY_MESSAGE.noData}</div>
                ) : (
                    processedTodos.map((todo) => (
                        <div key={todo.idx} className="todo-item">
                            {getTodoMarker(todo.status)}
                            <span>{todo.title}</span>
                            <span>{todo.createdAt}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
};
export default HomeTodoWidgetContainer;