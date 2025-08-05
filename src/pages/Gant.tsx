import {Gantt, Task, ViewMode} from "gantt-task-react";
import {useState} from "react";

let tasks: Task[] = [
    {
        start: new Date(2020, 1, 1),
        end: new Date(2020, 1, 2),
        name: 'Idea',
        id: 'Task 0',
        type:'task',
        progress: 45,
        isDisabled: true,
        styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
    },
];

const Gant = () =>{


    return (
        <div>
            <h1>간트 차트 예제</h1>
            <Gantt tasks={tasks} />
        </div>
    )
}
export default Gant;