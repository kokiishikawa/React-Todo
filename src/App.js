import './App.css';
import TodoList from './components/TodoList';
import './index.css';
import TaskDetail from './pages/TaskDetail';
// Routeを含めて react-router-dom からインポート
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TodoList />} />
                <Route path="/task/:id" element={<TaskDetail />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
