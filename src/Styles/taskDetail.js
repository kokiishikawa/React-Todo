// export const todoDetail = {
//     title: 'text-lg font-semibold text-gray-900 mb-2',
//     label: 'font-medium text-gray-600',
// };

// src/Styles/taskDetail.js
export const todoDetail = {
    // コンテナ
    container: 'max-w-4xl mx-auto p-4',
    card: 'bg-white rounded-lg shadow p-6',

    // ヘッダー部分
    header: {
        wrapper: 'flex justify-between mb-4',
        title: 'text-2xl font-bold',
    },

    // ボタン
    button: {
        wrapper: 'space-x-2',
        save: 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600',
        cancel: 'px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600',
        edit: 'px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600',
    },

    // フォーム要素
    form: {
        wrapper: 'space-y-4',
        group: 'space-y-1',
        label: 'font-medium text-gray-600',
        input: 'w-full mt-1 p-2 border rounded',
        textarea: 'w-full mt-1 p-2 border rounded',
        select: 'w-full mt-1 p-2 border rounded',
    },

    // テキスト表示
    text: 'mt-1',
};
