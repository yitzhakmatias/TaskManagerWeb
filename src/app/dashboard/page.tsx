'use client';

import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useRouter } from 'next/navigation';
import { Task } from '@/types/task';
import TaskTable from "@/app/components/TaskTable";
import TaskStatusGraph from "@/app/components/TaskStatusGraph";
import { createTask, getTasks } from "@/app/services/api";
import TaskChart from "@/app/components/TaskChart";
import TaskForm from "@/app/components/TaskForm";

const Dashboard: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const router = useRouter();

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('authenticated');
        if (!isAuthenticated) {
            router.push('/auth'); // Redirect to login page if not authenticated
        }

        const fetchTasks = async () => {
            const tasksData = await getTasks();
            setTasks(tasksData);
        };

        fetchTasks();
    }, [router]);

    const handleCreateTask = async () => {

        const updatedTasks = await getTasks();
        setTasks(updatedTasks);
    };

    return (
        <Container>
            <Box sx={{ my: 2}}>
                <Typography variant="h4" gutterBottom>Todo Dashboard</Typography>

                <Grid container spacing={2}>
                    {/* Task Table */}
                    <Grid size={{ xs: 12, md: 12 }}>
                         <TaskForm onTaskCreated={handleCreateTask}/>
                         <TaskTable tasks={tasks} onTaskUpdated={handleCreateTask}/>
                    </Grid>
                    <Grid size={{ xs: 12, md: 8}}>
                        <TaskStatusGraph tasks={tasks} />
                    </Grid>

                    {/* Task Status Graph */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TaskChart tasks={tasks}  />

                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Dashboard;
