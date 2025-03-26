// src/components/TaskStatusGraph.tsx

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Task } from "@/types/task";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define the possible status values
type TaskStatusType = 'todo' | 'in progress' | 'completed';

// Explicitly define the accumulator type


const TaskStatusGraph: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
    // Initialize the accumulator with default values for each status
    const taskStatus: Record<TaskStatusType, number> = {
        'todo': 0,
        'in progress': 0,
        'completed': 0,
    };

    tasks.forEach((task) => {
        // Ensure the task status is one of the defined statuses
        if (taskStatus[task.status as TaskStatusType] !== undefined) {
            taskStatus[task.status as TaskStatusType]++;
        }
    });

    const data = {
        labels: ['To Do', 'In Progress', 'Completed'],
        datasets: [
            {
                label: 'Task Statuses',
                data: [
                    taskStatus['todo'],
                    taskStatus['in progress'],
                    taskStatus['completed'],
                ],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                borderColor: '#fff',
                borderWidth: 1,
            },
        ],
    };

    return <Bar data={data} />;
};

export default TaskStatusGraph;
