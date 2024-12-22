import React, { useState, useCallback, useMemo } from 'react';
import { Clock, PlayCircle, CheckCircle, Trash2 } from 'lucide-react';
import TodoSearch from './TodoSearch';
import TodoInput from './TodoInput';
import TaskCard from './TaskCard';

// 定数定義
const STATUS_OPTIONS = [
    { value: '新規', label: '新規', icon: Clock, color: 'bg-blue-100 text-blue-800' },
    { value: '進行中', label: '進行中', icon: PlayCircle, color: 'bg-yellow-100 text-yellow-800' },
    { value: '完了', label: '完了', icon: CheckCircle, color: 'bg-green-100 text-green-800' },
];

// スタイル定義
const STYLES = {
    container: 'max-w-4xl mx-auto p-4 space-y-6',
    card: 'bg-white rounded-lg shadow-sm',
    header: 'text-center py-8',
    title: 'text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 inline-block text-transparent bg-clip-text',
    content: 'p-6 space-y-6',
    taskList: 'mt-8 space-y-4',
    emptyState: 'text-center text-gray-500 py-8',
    taskCard: 'bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6',
    taskTitle: 'text-lg font-semibold text-gray-900 mb-2',
    taskDetails: 'text-gray-600 text-sm mb-4 whitespace-pre-wrap',
    select: 'px-3 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500',
    deleteButton: 'p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors',
};

/**
 * タスク管理コンポーネント
 * タスクの一覧表示、追加、削除、ステータス変更、検索機能を提供
 */
const TodoList = () => {
    // State管理
    const [tasks, setTasks] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');

    /**
     * 新規タスク追加ハンドラー
     */
    const addTodo = useCallback((newTodo) => {
        const newTask = { ...newTodo, id: Date.now() };
        setTasks((prevTasks) => [...prevTasks, newTask]);
    }, []);

    /**
     * タスク削除ハンドラー
     */
    const deleteTodo = useCallback((id) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    }, []);

    /**
     * タスクステータス更新ハンドラー
     */
    const updateTaskStatus = useCallback((id, newStatus) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === id ? { ...task, status: newStatus } : task))
        );
    }, []);

    /**
     * 検索キーワード更新ハンドラー
     */
    const handleSearch = useCallback((keyword) => {
        setSearchKeyword(keyword.toLowerCase());
    }, []);

    /**
     * 検索条件に基づいたタスクのフィルタリング
     */
    const filteredTasks = useMemo(() => {
        if (!searchKeyword) return tasks;
        return tasks.filter(
            (task) =>
                task.title.toLowerCase().includes(searchKeyword) ||
                task.details.toLowerCase().includes(searchKeyword)
        );
    }, [tasks, searchKeyword]);

    /**
     * タスクのステータス情報を取得
     */
    const getStatusInfo = useCallback((status) => {
        return STATUS_OPTIONS.find((option) => option.value === status) || STATUS_OPTIONS[0];
    }, []);

    /**
     * タスクカードのレンダリング
     */
    const TaskCard = useCallback(
        ({ task }) => {
            const statusInfo = getStatusInfo(task.status);
            const StatusIcon = statusInfo.icon;

            return (
                <div className={STYLES.taskCard}>
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                            <h3 className={STYLES.taskTitle}>{task.title}</h3>
                            <p className={STYLES.taskDetails}>{task.details}</p>
                            <div className="flex items-center gap-2">
                                <span
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${statusInfo.color}`}
                                >
                                    <StatusIcon className="w-4 h-4 mr-1" />
                                    {statusInfo.label}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <select
                                value={task.status}
                                onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                                className={STYLES.select}
                            >
                                {STATUS_OPTIONS.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={() => deleteTodo(task.id)}
                                className={STYLES.deleteButton}
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            );
        },
        [getStatusInfo, updateTaskStatus, deleteTodo]
    );

    /**
     * タスク一覧のレンダリング
     */
    const renderedTasks = useMemo(
        () => filteredTasks.map((task) => <TaskCard key={task.id} task={task} />),
        [filteredTasks, TaskCard]
    );

    const handleTaskClick = () => {
        console.log('タスククリック');
    };

    return (
        <div className={STYLES.container}>
            <div className={STYLES.card}>
                <div className={STYLES.header}>
                    <h1 className={STYLES.title}>タスク管理</h1>
                </div>
                <div className={STYLES.content}>
                    <TodoSearch onSearch={handleSearch} />
                    <TodoInput onAddTodo={addTodo} />
                    <div className={STYLES.taskList}>
                        {renderedTasks.length > 0 ? (
                            renderedTasks
                        ) : (
                            <div className={STYLES.emptyState}>タスクがありません</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoList;
