import TodoList from './components/TodoList';
import TaskDetail from './pages/TaskDetail';
import { TaskProvider } from './components/TodoContext';
import { Routes, Route } from 'react-router-dom';
import React from 'react';

const App = () => {
    return (
        <TaskProvider>
            <Routes>
                <Route path="/" element={<TodoList />} />
                <Route path="/task/:id" element={<TaskDetail />} />
            </Routes>
        </TaskProvider>
    );
};

export default App;
