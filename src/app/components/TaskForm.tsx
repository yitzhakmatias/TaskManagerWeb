import React, { useState } from 'react';
import { createTask } from '../services/api';
import { TextField, Button, Box } from '@mui/material';

interface TaskFormProps {
    onTaskCreated: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated }) => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createTask({ title, description });
        setTitle('');
        setDescription('');
        onTaskCreated();
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                width: '100%',

                margin: 'auto',
                padding: 2
            }}
        >
            <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                fullWidth
                sx={{ marginBottom: 2 }}
            />

            <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                fullWidth
                sx={{ marginBottom: 2 }}
            />

            <Button
                type="submit"
                variant="contained"
                sx={{ alignSelf: 'flex-start' }}
            >
                Add
            </Button>
        </Box>
    );
};

export default TaskForm;
