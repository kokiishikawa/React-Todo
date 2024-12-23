// TaskDetail.jsx
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { taskDetailStyles } from '../Styles/todoDetail';

/**
 * タスク詳細表示コンポーネント
 * URLパラメータとロケーションステートからタスク情報を取得し表示
 */
const TaskDetail = () => {
    // URLパラメータからIDを取得
    const { id } = useParams();

    // ロケーションステートからタスクデータを取得
    const { state } = useLocation();
    const taskData = state?.taskData;

    // タスク情報の定義
    const taskInfo = [
        { label: 'URL ID', value: id },
        { label: 'TaskData ID', value: taskData?.id },
        { label: 'タイトル', value: taskData?.title },
        { label: '詳細', value: taskData?.details },
        { label: 'ステータス', value: taskData?.status },
    ];

    return (
        <div className={taskDetailStyles.container}>
            <h1 className={taskDetailStyles.header}>タスク詳細</h1>
            <div className={taskDetailStyles.card}>
                {taskInfo.map(({ label, value }) => (
                    <div key={label} className={taskDetailStyles.row}>
                        <span className={taskDetailStyles.label}>{label}:</span>
                        <span className={taskDetailStyles.value}>{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskDetail;
