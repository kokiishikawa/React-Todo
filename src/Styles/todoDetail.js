// styles/taskDetail.js
export const taskDetailStyles = {
    // レイアウト
    wrapper: 'max-w-4xl mx-auto p-4',
    container: 'bg-white rounded-lg shadow overflow-hidden',

    // ヘッダー
    header: {
        wrapper: 'bg-gray-50 px-6 py-4 border-b',
        content: 'flex justify-between items-center',
        title: 'text-2xl font-bold',
        buttons: 'space-x-2',
    },

    // ボタン
    button: {
        save: 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600',
        cancel: 'px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600',
        edit: 'px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600',
        back: 'px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors',
    },

    // メインコンテンツ
    content: {
        wrapper: 'p-6 space-y-6',
        label: 'block text-sm font-medium text-gray-700 mb-1',
        input: 'w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
        text: {
            title: 'text-lg',
            content: 'text-gray-700 whitespace-pre-wrap',
            status: 'text-gray-700',
        },
    },

    // グリッドレイアウト
    grid: {
        container: 'grid grid-cols-3 gap-4',
    },
};
