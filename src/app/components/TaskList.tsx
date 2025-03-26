import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask, updateTaskStatus } from '../services/api';
import { Card, CardContent, Typography, IconButton, Select, MenuItem } from '@mui/material';
import {Task} from "@/types/task";

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        const data = await getTasks();
        setTasks(data);
    };

    const handleDelete = async (id: string) => {
        await deleteTask(id);
        loadTasks();
    };

    const handleStatusChange = async (id: string, status: string) => {
        await updateTaskStatus(id, status);
        loadTasks();
    };

    return (
        <>
            {tasks.map((task) => (
                <Card key={task.id} style={{ margin: '10px' }}>
                    <CardContent>
                        <Typography variant="h6">{task.title}</Typography>
                        <Typography>{task.description}</Typography>
                        <Select
                            value={task.status}
                            onChange={(e) => handleStatusChange(task.id, e.target.value)}
                        >
                            <MenuItem value="todo">Por hacer</MenuItem>
                            <MenuItem value="in_progress">En progreso</MenuItem>
                            <MenuItem value="done">Completada</MenuItem>
                        </Select>
                        <IconButton onClick={() => handleDelete(task.id)}>
                           {/* <DeleteIcon />*/}
                        </IconButton>
                    </CardContent>
                </Card>
            ))}
        </>
    );
};

export default TaskList;
