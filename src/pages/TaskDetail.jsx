import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { STATUS_OPTIONS } from '../components/index';
import { useTaskContext } from '../components/TodoContext';
import { todoDetail } from '../Styles/taskDetail';

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
        <div className="max-w-4xl mx-auto p-4">
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between mb-4">
                    <h1 className="text-2xl font-bold">タスク詳細</h1>
                    <div className="space-x-2">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    保存
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                >
                                    キャンセル
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={handleEditStart}
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                編集
                            </button>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className={todoDetail.label}>タイトル</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={editedTask.title}
                                onChange={handleInputChange('title')}
                                className="w-full mt-1 p-2 border rounded"
                            />
                        ) : (
                            <p className="mt-1">{taskData?.title}</p>
                        )}
                    </div>

                    <div>
                        <label className={todoDetail.label}>詳細</label>
                        {isEditing ? (
                            <textarea
                                value={editedTask.details}
                                onChange={handleInputChange('details')}
                                className="w-full mt-1 p-2 border rounded"
                                rows={4}
                            />
                        ) : (
                            <p className="mt-1">{taskData?.details}</p>
                        )}
                    </div>

                    <div>
                        <label className="font-medium text-gray-600">ステータス</label>
                        {isEditing ? (
                            <select
                                value={editedTask.status}
                                onChange={handleInputChange('status')}
                                className="w-full mt-1 p-2 border rounded"
                            >
                                {STATUS_OPTIONS.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <p className="mt-1">{taskData?.status}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskDetail;
