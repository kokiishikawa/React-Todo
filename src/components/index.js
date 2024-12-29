// タスクステータス
import { Clock, PlayCircle, CheckCircle } from 'lucide-react';

export const STATUS_OPTIONS = [
    { value: '新規', label: '新規', icon: Clock, color: 'bg-blue-100 text-blue-800' },
    { value: '進行中', label: '進行中', icon: PlayCircle, color: 'bg-yellow-100 text-yellow-800' },
    { value: '完了', label: '完了', icon: CheckCircle, color: 'bg-green-100 text-green-800' },
];

export const PRIORITY_OPTIONS = [
    { value: '高', label: '高', color: 'bg-rose-100 text-rose-800' },
    { value: '中', label: '中', color: 'bg-orange-100 text-orange-800' },
    { value: '低', label: '低', color: 'bg-teal-100 text-teal-800' },
];
