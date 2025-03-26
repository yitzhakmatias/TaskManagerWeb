import {Task} from "@/types/task";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTasks = async (): Promise<Task[]> => {
    const res = await fetch(`${API_URL}/tasks`);
    return res.json();
};

export const createTask = async (task: { title: string; description: string }) => {
    await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });
};

export const updateTaskStatus = async (id: string, status: string) => {
    await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
    });
};

export const deleteTask = async (id: string) => {
    await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
    });
};
