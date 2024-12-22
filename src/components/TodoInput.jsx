import React, { useState, useCallback } from 'react';
import { PlusCircle, X } from 'lucide-react';

// スタイル定義
const STYLES = {
    modalOverlay: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50',
    modalContainer: 'relative bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4',
    modalHeader: 'flex items-center justify-between px-6 py-4 border-b',
    modalTitle: 'text-xl font-semibold text-gray-900',
    closeButton: 'text-gray-500 hover:text-gray-700 transition-colors',
    modalContent: 'p-6 space-y-4',
    input: 'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
    textarea:
        'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-32 resize-none',
    select: 'px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
    addButton:
        'flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors',
    error: 'p-4 bg-red-50 border border-red-200 rounded-lg text-red-600',
    floatingButton:
        'fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all hover:shadow-xl',
};

// ステータスオプション
const STATUS_OPTIONS = [
    { value: '新規', label: '新規' },
    { value: '進行中', label: '進行中' },
    { value: '完了', label: '完了' },
];

/**
 * Todo入力フォームコンポーネント
 */
const TodoInput = ({ onAddTodo }) => {
    // 状態管理
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formState, setFormState] = useState({
        title: '',
        details: '',
        status: '新規',
        errorMsg: '',
    });

    /**
     * フォームフィールドの更新ハンドラー
     */
    const handleFieldChange = (fieldName) => (event) => {
        setFormState((prev) => ({
            ...prev,
            [fieldName]: event.target.value,
            errorMsg: '',
        }));
    };

    /**
     * タスク追加ハンドラー
     */
    const handleAddTask = () => {
        const { title, details, status } = formState;

        if (title.trim() && details.trim()) {
            onAddTodo({ title, details, status });
            setFormState({
                title: '',
                details: '',
                status: '新規',
                errorMsg: '',
            });
            setIsModalOpen(false);
        } else {
            setFormState((prev) => ({
                ...prev,
                errorMsg: 'タイトルまたは詳細が空欄です。',
            }));
        }
    };

    /**
     * モーダルを閉じる際のハンドラー
     */
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormState({
            title: '',
            details: '',
            status: '新規',
            errorMsg: '',
        });
    };

    return (
        <>
            {/* フローティングアクションボタン */}
            <button
                onClick={() => setIsModalOpen(true)}
                className={STYLES.floatingButton}
                aria-label="新規タスクを追加"
            >
                <PlusCircle className="w-6 h-6" />
            </button>

            {/* モーダル */}
            {isModalOpen && (
                <div className={STYLES.modalOverlay}>
                    <div className={STYLES.modalContainer} onClick={(e) => e.stopPropagation()}>
                        <div className={STYLES.modalHeader}>
                            <h2 className={STYLES.modalTitle}>新規タスクの追加</h2>
                            <button
                                onClick={handleCloseModal}
                                className={STYLES.closeButton}
                                aria-label="閉じる"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className={STYLES.modalContent}>
                            <input
                                type="text"
                                value={formState.title}
                                onChange={handleFieldChange('title')}
                                placeholder="タスクのタイトル"
                                className={STYLES.input}
                            />

                            <textarea
                                value={formState.details}
                                onChange={handleFieldChange('details')}
                                placeholder="タスクの詳細"
                                className={STYLES.textarea}
                            />

                            <div className="flex items-center justify-between">
                                <select
                                    value={formState.status}
                                    onChange={handleFieldChange('status')}
                                    className={STYLES.select}
                                >
                                    {STATUS_OPTIONS.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>

                                <button onClick={handleAddTask} className={STYLES.addButton}>
                                    <PlusCircle className="w-4 h-4" />
                                    タスク追加
                                </button>
                            </div>

                            {formState.errorMsg && (
                                <div className={STYLES.error}>{formState.errorMsg}</div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TodoInput;
