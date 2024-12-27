// src/contexts/TaskContext.jsx
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    // localStorageから初期データを読み込む
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    // tasksが更新されたらlocalStorageに保存
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const updateTask = useCallback((updatedTask) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );
    }, []);

    return (
        <TaskContext.Provider value={{ tasks, setTasks, updateTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => useContext(TaskContext);

export default TaskContext;
