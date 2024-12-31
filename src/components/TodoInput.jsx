import React, { useState } from 'react';
import { PlusCircle, X } from 'lucide-react';
import { todoInputStyles } from '../Styles/todoInput';
import { STATUS_OPTIONS } from './index';
import { type } from '@testing-library/user-event/dist/type';

/**
 * Todo入力フォームコンポーネント
 * タスクの新規作成、モーダル表示、フォーム入力管理を担当
 */
const TodoInput = ({ onAddTodo }) => {
    // 初期フォーム状態
    const initialFormState = {
        title: '',
        details: '',
        status: '新規',
        errorMsg: '',
        dueDate: '',
    };

    // State管理
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formState, setFormState] = useState(initialFormState);

    /**
     * フォーム操作関連のハンドラー
     */
    const formHandlers = {
        // フィールド更新
        handleFieldChange: (fieldName) => (event) => {
            setFormState((prev) => ({
                ...prev,
                [fieldName]: event.target.value,
                errorMsg: '',
            }));
        },

        // タスク追加
        handleAddTask: () => {
            const { title, details, status, dueDate } = formState;

            if (title.trim() && details.trim()) {
                onAddTodo({ title, details, status, dueDate });
                formHandlers.resetAndCloseModal();
            } else {
                setFormState((prev) => ({
                    ...prev,
                    errorMsg: 'タイトルまたは詳細が空欄です。',
                }));
            }
        },

        // モーダルを閉じてフォームをリセット
        resetAndCloseModal: () => {
            setIsModalOpen(false);
            setFormState(initialFormState);
        },
    };

    /**
     * フォーム入力フィールドの設定
     * labelの表示実装はなし
     */
    const formFields = [
        {
            type: 'input',
            label: 'タイトル',
            value: formState.title,
            onChange: formHandlers.handleFieldChange('title'),
            placeholder: 'タスクのタイトル',
            className: todoInputStyles.input,
        },
        {
            type: 'textarea',
            label: '詳細',
            value: formState.details,
            onChange: formHandlers.handleFieldChange('details'),
            placeholder: 'タスクの詳細',
            className: todoInputStyles.textarea,
        },
        {
            type: 'date',
            label: '期日',
            value: formState.dueDate,
            onChange: formHandlers.handleFieldChange('dueDate'),
            className: todoInputStyles.dueDate,
        },
    ];

    return (
        <>
            {/* フローティングアクションボタン */}
            <button
                onClick={() => setIsModalOpen(true)}
                className={todoInputStyles.floatingButton}
                aria-label="新規タスクを追加"
            >
                <PlusCircle className="w-6 h-6" />
            </button>

            {/* モーダル */}
            {isModalOpen && (
                <div className={todoInputStyles.modalOverlay}>
                    <div
                        className={todoInputStyles.modalContainer}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* モーダルヘッダー */}
                        <div className={todoInputStyles.modalHeader}>
                            <h2 className={todoInputStyles.modalTitle}>新規タスクの追加</h2>
                            <button
                                onClick={formHandlers.resetAndCloseModal}
                                className={todoInputStyles.closeButton}
                                aria-label="閉じる"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* モーダルコンテンツ */}
                        <div className={todoInputStyles.modalContent}>
                            {/* 入力フィールド */}
                            {formFields.map((field, index) => {
                                if (field.type === 'input') {
                                    return <input key={index} {...field} />;
                                } else if (field.type === 'textarea') {
                                    return <textarea key={index} {...field} />;
                                } else {
                                    return <input key={index} {...field} />;
                                }
                            })}

                            {/* ステータス選択とボタン */}
                            <div className="flex items-center justify-between">
                                <select
                                    value={formState.status}
                                    onChange={formHandlers.handleFieldChange('status')}
                                    className={todoInputStyles.select}
                                >
                                    {STATUS_OPTIONS.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>

                                <button
                                    onClick={formHandlers.handleAddTask}
                                    className={todoInputStyles.addButton}
                                >
                                    <PlusCircle className="w-4 h-4" />
                                    タスク追加
                                </button>
                            </div>

                            {/* エラーメッセージ */}
                            {formState.errorMsg && (
                                <div className={todoInputStyles.error}>{formState.errorMsg}</div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TodoInput;
