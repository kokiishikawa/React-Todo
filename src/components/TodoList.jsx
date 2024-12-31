import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoSearch from './TodoSearch';
import TodoInput from './TodoInput';
import TaskCard from './TaskCard';
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from './index';
import { todoListStyles } from '../styles/todoList';
import { useTaskContext } from './TodoContext';

/**
 * タスク管理コンポーネント
 * @description タスクの一覧表示、追加、削除、編集、検索機能を提供するメインコンポーネント
 */
const TodoList = () => {
    // ナビゲーションと状態管理のフック
    const navigate = useNavigate();
    const { tasks, setTasks } = useTaskContext();
    const [searchKeyword, setSearchKeyword] = useState('');

    /**
     * タスク更新処理
     * @param {Object} updatedTask - 更新するタスクの内容
     */
    const updateTask = useCallback(
        (updatedTask) => {
            setTasks((prevTasks) =>
                prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
            );
        },
        [setTasks]
    );

    /**
     * タスク操作関連の処理をまとめたオブジェクト
     */
    const handleTaskOperations = {
        // 新規タスク追加
        addTodo: useCallback(
            (newTodo) => {
                const newTask = {
                    ...newTodo,
                    id: Date.now(), // ユニークIDとしてタイムスタンプを使用
                    priority: '中',
                };
                setTasks((prevTasks) => [...prevTasks, newTask]);
            },
            [setTasks]
        ),

        // タスク削除
        deleteTodo: useCallback(
            (id) => {
                setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
            },
            [setTasks]
        ),

        // タスクのステータス更新
        updateTaskStatus: useCallback(
            (id, newStatus) => {
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id === id ? { ...task, status: newStatus } : task
                    )
                );
            },
            [setTasks]
        ),

        // タスクの優先度更新
        updateTaskPriority: useCallback(
            (id, newPriority) => {
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id === id ? { ...task, priority: newPriority } : task
                    )
                );
            },
            [setTasks]
        ),

        // タスク詳細画面への遷移
        handleTaskClick: useCallback(
            (task) => {
                navigate(`/task/${task.id}`, {
                    state: { taskData: task },
                });
            },
            [navigate]
        ),
    };

    /**
     * 検索関連の処理をまとめたオブジェクト
     */
    const searchOperations = {
        // 検索キーワード更新
        handleSearch: useCallback((keyword) => {
            setSearchKeyword(keyword.toLowerCase());
        }, []),

        // タスクの検索フィルタリング
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
     * タスクの優先度情報を取得
     */
    const getPriorityInfo = useCallback((priority) => {
        return PRIORITY_OPTIONS.find((option) => option.value === priority) || PRIORITY_OPTIONS[0];
    }, []);

    /**
     * タスク一覧のレンダリング
     * メモ化によりパフォーマンスを最適化
     */
    const renderedTasks = useMemo(
        () =>
            searchOperations.filteredTasks.map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    updateTaskStatus={handleTaskOperations.updateTaskStatus}
                    updateTaskPriority={handleTaskOperations.updateTaskPriority}
                    deleteTodo={handleTaskOperations.deleteTodo}
                    getStatusInfo={getStatusInfo}
                    getPriorityInfo={getPriorityInfo}
                    onTaskClick={handleTaskOperations.handleTaskClick}
                    updateTask={updateTask}
                />
            )),
        [
            searchOperations.filteredTasks,
            handleTaskOperations.updateTaskStatus,
            handleTaskOperations.updateTaskPriority,
            handleTaskOperations.deleteTodo,
            getStatusInfo,
            getPriorityInfo,
            handleTaskOperations.handleTaskClick,
            updateTask,
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
