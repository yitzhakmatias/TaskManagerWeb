import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

import {Task} from "@/types/task";

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];
type TaskStatusType = 'todo' | 'in progress' | 'completed';

const TaskChart: React.FC <{ tasks: Task[] }> = ({ tasks }) => {
    const [data, setData] = useState<unknown[]>([]);

    useEffect(() => {
        const load = async () => {

            const taskStatus: Record<TaskStatusType, number> = {
                'todo': 0,
                'in progress': 0,
                'completed': 0,
            };

            tasks.forEach((task) => taskStatus[task.status as TaskStatusType]++);
            setData([
                { name: 'Todo', value: taskStatus['todo'] },
                { name: 'In progress', value: taskStatus['in progress'] },
                { name: 'Completed', value: taskStatus['completed'] },
            ]);
        };
        load();
    }, [tasks]);

    return (
        <PieChart width={400} height={300}>
            <Pie dataKey="value" data={data} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    );
};

export default TaskChart;
