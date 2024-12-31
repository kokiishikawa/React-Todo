import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from '../components/index';
import { useTaskContext } from '../components/TodoContext';
import { taskDetailStyles } from '../styles/todoDetail';

const TaskDetail = () => {
    const navigate = useNavigate();
    const { updateTask } = useTaskContext();
    const { state } = useLocation();
    const taskData = state?.taskData;

    const handleSave = () => {
        updateTask(editedTask);
        setIsEditing(false);
        navigate('/');
    };

    // 編集モードの状態管理
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(null);

    // taskDataが変更されたら editedTask を初期化
    useEffect(() => {
        if (taskData) {
            setEditedTask(taskData);
        }
    }, [taskData]);

    // フォーム入力ハンドラー
    const handleInputChange = (field) => (event) => {
        console.log('入力変更:', {
            field,
            value: event.target.value,
            previousEditedTask: editedTask,
        });

        setEditedTask((prev) => ({
            ...prev,
            [field]: event.target.value,
        }));
    };

    // 編集開始
    const handleEditStart = () => {
        setIsEditing(true);
    };

    // キャンセル処理
    const handleCancel = () => {
        setEditedTask(taskData);
        setIsEditing(false);
    };

    // データが存在しない場合
    if (!taskData || !editedTask) {
        return <div>タスクが見つかりません</div>;
    }
    return (
        <div className={taskDetailStyles.wrapper}>
            <div className={taskDetailStyles.container}>
                {/* ヘッダー部分 */}
                <div className={taskDetailStyles.header.wrapper}>
                    <div className={taskDetailStyles.header.content}>
                        {/* ホームに戻るボタン実装（スタイル変更予定） */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/')}
                                className={taskDetailStyles.button.back}
                            >
                                戻る
                            </button>
                        </div>
                        <h1 className={taskDetailStyles.header.title}>タスク詳細</h1>
                        <div className={taskDetailStyles.header.buttons}>
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={handleSave}
                                        className={taskDetailStyles.button.save}
                                    >
                                        保存
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className={taskDetailStyles.button.cancel}
                                    >
                                        キャンセル
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={handleEditStart}
                                    className={taskDetailStyles.button.edit}
                                >
                                    編集
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* メインコンテンツ */}
                <div className={taskDetailStyles.content.wrapper}>
                    {/* タイトルセクション */}
                    <div>
                        <label className={taskDetailStyles.content.label}>タイトル</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={editedTask.title}
                                onChange={handleInputChange('title')}
                                className={taskDetailStyles.content.input}
                            />
                        ) : (
                            <p className={taskDetailStyles.content.text.title}>{taskData?.title}</p>
                        )}
                    </div>

                    {/* 詳細セクション */}
                    <div>
                        <label className={taskDetailStyles.content.label}>詳細</label>
                        {isEditing ? (
                            <textarea
                                value={editedTask.details}
                                onChange={handleInputChange('details')}
                                className={taskDetailStyles.content.input}
                                rows={4}
                            />
                        ) : (
                            <p className={taskDetailStyles.content.text.content}>
                                {taskData?.details}
                            </p>
                        )}
                    </div>

                    {/* ステータス、優先度、期日を横並びに */}
                    <div className={taskDetailStyles.grid.container}>
                        <div>
                            <label className={taskDetailStyles.content.label}>ステータス</label>
                            {isEditing ? (
                                <select
                                    value={editedTask.status}
                                    onChange={handleInputChange('status')}
                                    className={taskDetailStyles.content.input}
                                >
                                    {STATUS_OPTIONS.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <p className={taskDetailStyles.content.text.status}>
                                    {taskData?.status}
                                </p>
                            )}
                        </div>

                        {/* 優先度セクション */}
                        <div>
                            <label className={taskDetailStyles.content.label}>優先度</label>
                            {isEditing ? (
                                <select
                                    value={editedTask.priority}
                                    onChange={handleInputChange('priority')}
                                    className={taskDetailStyles.content.input}
                                >
                                    {PRIORITY_OPTIONS.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <p className={taskDetailStyles.content.text.status}>
                                    {taskData?.priority}
                                </p>
                            )}
                        </div>

                        {/* 期日セクション */}
                        <div>
                            <label className={taskDetailStyles.content.label}>期日</label>
                            {isEditing ? (
                                <input
                                    type="date"
                                    value={editedTask.dueDate || ''}
                                    onChange={handleInputChange('dueDate')}
                                    className={taskDetailStyles.content.input}
                                />
                            ) : (
                                <p className={taskDetailStyles.content.text.status}>
                                    {taskData?.dueDate
                                        ? new Date(taskData.dueDate).toLocaleDateString('ja-JP')
                                        : '未設定'}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskDetail;
