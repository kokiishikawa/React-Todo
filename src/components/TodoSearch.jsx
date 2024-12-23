import React, { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { todoSearchStyles } from '../Styles/todoSearch';

/**
 * タスク検索コンポーネント
 * 検索機能とクリア機能を提供します
 *
 * @param {Object} props
 * @param {Function} props.onSearch - 検索キーワード変更時のコールバック関数
 */
const TodoSearch = ({ onSearch }) => {
    // 検索キーワードの状態管理
    const [searchKeyword, setSearchKeyword] = useState('');

    /**
     * 検索キーワード変更ハンドラー
     * 入力値を親コンポーネントに通知します
     *
     * @param {React.ChangeEvent<HTMLInputElement>} event
     */
    const handleSearchChange = useCallback(
        (event) => {
            const newValue = event.target.value;
            setSearchKeyword(newValue);
            onSearch(newValue);
        },
        [onSearch]
    );

    /**
     * 検索クリアハンドラー
     * 検索フィールドをクリアし、親コンポーネントに通知します
     */
    const handleClear = useCallback(() => {
        setSearchKeyword('');
        onSearch('');
    }, [onSearch]);

    return (
        <div className={todoSearchStyles.container}>
            <div className={todoSearchStyles.searchContainer}>
                {/* 検索アイコン */}
                <Search className={todoSearchStyles.searchIcon} />

                {/* 検索入力フィールド */}
                <input
                    type="text"
                    placeholder="タスクを検索..."
                    value={searchKeyword}
                    onChange={handleSearchChange}
                    className={todoSearchStyles.input}
                    aria-label="タスク検索"
                />

                {/* クリアボタン - 検索キーワードが存在する場合のみ表示 */}
                {searchKeyword && (
                    <button
                        onClick={handleClear}
                        className={todoSearchStyles.clearButton}
                        aria-label="検索をクリア"
                    >
                        <X className={todoSearchStyles.clearIcon} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default TodoSearch;
