export const todoInputStyles = {
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
    dueDate: 'w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500',
};
