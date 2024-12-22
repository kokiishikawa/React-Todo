import React from 'react';
import { useParams } from 'react-router-dom';

const TaskDetail = () => {
    const { taskId } = useParams();

    return (
        <div>
            <h1>タスク詳細</h1>
            <p>Task ID: {taskId}</p>
        </div>
    );
};

export default TaskDetail;
