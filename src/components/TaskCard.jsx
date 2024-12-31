import React from 'react';
import PropTypes from 'prop-types';
import { Trash2 } from 'lucide-react';
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from './index';
import { todoCardStyles } from '../styles/todoCard';

/**
 * タスクカードコンポーネント
 * @description タスクの詳細表示、ステータス変更、優先度変更、削除機能を提供
 *
 * @param {Object} task - タスク情報（id, title, details, status, priority）
 * @param {Function} updateTaskStatus - タスクのステータス更新関数
 * @param {Function} updateTaskPriority - タスクの優先度更新関数
 * @param {Function} deleteTodo - タスク削除関数
 * @param {Function} getStatusInfo - ステータス情報取得関数
 * @param {Function} getPriorityInfo - 優先度情報取得関数
 * @param {Function} onTaskClick - タスククリック時のコールバック関数
 */
const TaskCard = ({
    task,
    updateTaskStatus,
    updateTaskPriority,
    deleteTodo,
    getStatusInfo,
    getPriorityInfo,
    onTaskClick,
}) => {
    // タスクの現在のステータス、優先度情報を取得（アイコンと色情報を含む）
    const statusInfo = getStatusInfo(task.status);
    const priorityInfo = getPriorityInfo(task.priority);
    const StatusIcon = statusInfo.icon;

    /**
     * アクション領域（セレクトボックスと削除ボタン）のクリックイベントハンドラー
     * イベントの伝播を停止し、親要素のクリックイベントが発火するのを防ぐ
     *
     * @param {Event} e - クリックイベントオブジェクト
     */
    const handleActionsClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div
            className={todoCardStyles.wrapper}
            onClick={() => onTaskClick(task)}
            role="button"
            tabIndex={0}
        >
            <div className={todoCardStyles.contentWrapper}>
                {/* タスクのメインコンテンツ領域 */}
                <div className={todoCardStyles.mainContent}>
                    <h3 className={todoCardStyles.title}>{task.title}</h3>
                    <p className={todoCardStyles.details}>{task.details}</p>
                    {/* ステータスと優先度のバッジ */}
                    <div className={todoCardStyles.statusWrapper}>
                        <span className={`${todoCardStyles.statusBadge} ${statusInfo.color}`}>
                            <StatusIcon className={todoCardStyles.statusIcon} />
                            {statusInfo.label}
                        </span>
                        <span className={`${todoCardStyles.statusBadge} ${priorityInfo.color}`}>
                            {priorityInfo.label}
                        </span>
                    </div>
                </div>

                {/* アクション領域 */}
                <div className="flex flex-col gap-4">
                    {/* 期日表示 */}
                    <div className="text-sm text-gray-600 text-right">
                        期日:{''}
                        {task.dueDate
                            ? new Date(task.dueDate).toLocaleDateString('ja-JP')
                            : '未設定'}
                    </div>
                    {/* 操作ボタン群 */}
                    <div className={todoCardStyles.actionsWrapper} onClick={handleActionsClick}>
                        <select
                            value={task.status}
                            onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                            className={todoCardStyles.select}
                        >
                            {STATUS_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <select
                            value={task.priority}
                            onChange={(e) => updateTaskPriority(task.id, e.target.value)}
                            className={todoCardStyles.select}
                        >
                            {PRIORITY_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={() => deleteTodo(task.id)}
                            className={todoCardStyles.deleteButton}
                        >
                            <Trash2 className={todoCardStyles.deleteIcon} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// コンポーネントのプロパティ型定義
TaskCard.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        details: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        priority: PropTypes.string.isRequired,
    }).isRequired,
    updateTaskStatus: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    getStatusInfo: PropTypes.func.isRequired,
    updateTaskPriority: PropTypes.func.isRequired,
    getPriorityInfo: PropTypes.func.isRequired,
    onTaskClick: PropTypes.func.isRequired,
};

export default TaskCard;
