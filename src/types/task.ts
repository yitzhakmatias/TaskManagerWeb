// src/types/task.ts

export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'todo' | 'in_progress' | 'completed';
    name: string;
}
