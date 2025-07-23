import React, {useCallback, useEffect, useState} from "react";
import {getTodoList} from "../api/home.ts";

interface TodoData {
    idx: number;
    title: string;
    description: string;
    isDeleted: boolean;
    status: string;
    createdAt: string;
}

export const useHomeTodoWidgetContainer = () => {
    const [todoList, setTodoList] = useState<TodoData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedDue, setSelectedDue] = useState('week');

    const fetchTodo = useCallback(async (period: string) => {
        setLoading(true);
        try {
            setLoading(true);
            const res = await getTodoList(period);

            setTodoList(res.data);
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }, []);


    const handleDueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDue(e.target.value);
    };
    useEffect(() => {

        fetchTodo(selectedDue);
    }, [selectedDue]);

    return {todoList, loading, selectedDue, handleDueChange}
}
