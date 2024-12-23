import React from 'react';
import PropTypes from 'prop-types';
import { Trash2 } from 'lucide-react';
import { STATUS_OPTIONS } from './index';
import { todoCardStyles } from '../Styles/todoCard';

/**
 * タスクカードコンポーネント
 * タスクの詳細表示、ステータス変更、削除機能を提供
 *
 * @param {Object} task - タスク情報（id, title, details, status）
 * @param {Function} updateTaskStatus - タスクのステータス更新関数
 * @param {Function} deleteTodo - タスク削除関数
 * @param {Function} getStatusInfo - ステータス情報取得関数
 * @param {Function} onTaskClick - タスククリック時のコールバック関数
 */
const TaskCard = ({ task, updateTaskStatus, deleteTodo, getStatusInfo, onTaskClick }) => {
    // タスクの現在のステータス情報を取得（アイコンと色情報を含む）
    const statusInfo = getStatusInfo(task.status);
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
            onClick={() => onTaskClick(task)} // カード全体のクリックイベント
            role="button"
            tabIndex={0} // キーボード操作のためのタブインデックス
        >
            <div className={todoCardStyles.contentWrapper}>
                {/* タスクのメインコンテンツ領域 */}
                <div className={todoCardStyles.mainContent}>
                    <h3 className={todoCardStyles.title}>{task.title}</h3>
                    <p className={todoCardStyles.details}>{task.details}</p>
                    {/* ステータスバッジ表示領域 */}
                    <div className={todoCardStyles.statusWrapper}>
                        <span className={`${todoCardStyles.statusBadge} ${statusInfo.color}`}>
                            <StatusIcon className={todoCardStyles.statusIcon} />
                            {statusInfo.label}
                        </span>
                    </div>
                </div>
                {/* アクション領域（ステータス変更、削除ボタン） */}
                <div className={todoCardStyles.actionsWrapper} onClick={handleActionsClick}>
                    {/* ステータス変更セレクトボックス */}
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
                    {/* 削除ボタン */}
                    <button
                        onClick={() => deleteTodo(task.id)}
                        className={todoCardStyles.deleteButton}
                    >
                        <Trash2 className={todoCardStyles.deleteIcon} />
                    </button>
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
    }).isRequired,
    updateTaskStatus: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    getStatusInfo: PropTypes.func.isRequired,
    onTaskClick: PropTypes.func.isRequired, // onTaskClickのPropType定義を追加
};

export default TaskCard;
