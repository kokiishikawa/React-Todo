import React, { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';

// スタイル定義
const STYLES = {
    container: 'relative',
    searchContainer: 'relative',
    searchIcon: 'absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4',
    input: 'w-full pl-10 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
    clearButton: 'absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full',
    clearIcon: 'w-4 h-4 text-gray-400'
};

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
    const handleSearchChange = useCallback((event) => {
        const newValue = event.target.value;
        setSearchKeyword(newValue);
        onSearch(newValue);
    }, [onSearch]);

    /**
     * 検索クリアハンドラー
     * 検索フィールドをクリアし、親コンポーネントに通知します
     */
    const handleClear = useCallback(() => {
        setSearchKeyword('');
        onSearch('');
    }, [onSearch]);

    return (
        <div className={STYLES.container}>
            <div className={STYLES.searchContainer}>
                {/* 検索アイコン */}
                <Search className={STYLES.searchIcon} />

                {/* 検索入力フィールド */}
                <input
                    type="text"
                    placeholder="タスクを検索..."
                    value={searchKeyword}
                    onChange={handleSearchChange}
                    className={STYLES.input}
                    aria-label="タスク検索"
                />

                {/* クリアボタン - 検索キーワードが存在する場合のみ表示 */}
                {searchKeyword && (
                    <button
                        onClick={handleClear}
                        className={STYLES.clearButton}
                        aria-label="検索をクリア"
                    >
                        <X className={STYLES.clearIcon} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default TodoSearch;