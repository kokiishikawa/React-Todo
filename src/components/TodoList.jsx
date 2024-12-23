import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoSearch from './TodoSearch';
import TodoInput from './TodoInput';
import TaskCard from './TaskCard';
import { STATUS_OPTIONS } from './index';
import { todoListStyles } from '../Styles/todoList';

/**
 * タスク管理コンポーネント
 * タスクの一覧表示、追加、削除、ステータス変更、検索機能を提供
 */
const TodoList = () => {
    const navigate = useNavigate();

    // State管理
    const [tasks, setTasks] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');

    // タスク操作関連のハンドラー
    const handleTaskOperations = {
        /**
         * 新規タスク追加
         */
        addTodo: useCallback((newTodo) => {
            const newTask = { ...newTodo, id: Date.now() };
            setTasks((prevTasks) => [...prevTasks, newTask]);
        }, []),

        /**
         * タスク削除
         */
        deleteTodo: useCallback((id) => {
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        }, []),

        /**
         * タスクステータス更新
         */
        updateTaskStatus: useCallback((id, newStatus) => {
            setTasks((prevTasks) =>
                prevTasks.map((task) => (task.id === id ? { ...task, status: newStatus } : task))
            );
        }, []),

        /**
         * タスク詳細画面への遷移
         */
        handleTaskClick: useCallback(
            (task) => {
                navigate(`/task/${task.id}`, {
                    state: { taskData: task },
                });
            },
            [navigate]
        ),
    };

    // 検索関連の処理
    const searchOperations = {
        /**
         * 検索キーワード更新
         */
        handleSearch: useCallback((keyword) => {
            setSearchKeyword(keyword.toLowerCase());
        }, []),

        /**
         * タスクのフィルタリング
         */
        filteredTasks: useMemo(() => {
            if (!searchKeyword) return tasks;
            return tasks.filter(
                (task) =>
                    task.title.toLowerCase().includes(searchKeyword) ||
                    task.details.toLowerCase().includes(searchKeyword)
            );
        }, [tasks, searchKeyword]),
    };

    /**
     * タスクのステータス情報を取得
     */
    const getStatusInfo = useCallback((status) => {
        return STATUS_OPTIONS.find((option) => option.value === status) || STATUS_OPTIONS[0];
    }, []);

    /**
     * タスク一覧のレンダリング
     */
    const renderedTasks = useMemo(
        () =>
            searchOperations.filteredTasks.map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    updateTaskStatus={handleTaskOperations.updateTaskStatus}
                    deleteTodo={handleTaskOperations.deleteTodo}
                    getStatusInfo={getStatusInfo}
                    onTaskClick={handleTaskOperations.handleTaskClick}
                />
            )),
        [
            searchOperations.filteredTasks,
            handleTaskOperations.updateTaskStatus,
            handleTaskOperations.deleteTodo,
            getStatusInfo,
            handleTaskOperations.handleTaskClick,
        ]
    );

    return (
        <div className={todoListStyles.container}>
            <div className={todoListStyles.card}>
                <div className={todoListStyles.header}>
                    <h1 className={todoListStyles.title}>タスク管理</h1>
                </div>
                <div className={todoListStyles.content}>
                    <TodoSearch onSearch={searchOperations.handleSearch} />
                    <TodoInput onAddTodo={handleTaskOperations.addTodo} />
                    <div className={todoListStyles.taskList}>
                        {renderedTasks.length > 0 ? (
                            renderedTasks
                        ) : (
                            <div className={todoListStyles.emptyState}>タスクがありません</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoList;
