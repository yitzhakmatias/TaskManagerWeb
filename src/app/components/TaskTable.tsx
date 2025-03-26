// src/components/TaskTable.tsx

'use client';

import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Box,
    Typography,
    TextField,
    Select,
    MenuItem
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Task } from '@/types/task';
import { deleteTask, updateTaskStatus } from '@/app/services/api';

interface TaskTableProps {
    tasks: Task[];
    onTaskUpdated: (updatedTasks: Task[]) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onTaskUpdated }) => {
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
    const [editTitle, setEditTitle] = useState<string>('');
    const [editDescription, setEditDescription] = useState<string>('');
    const [editStatus, setEditStatus] = useState<string>('');

    const handleDelete = async () => {
        if (taskToDelete) {
            await deleteTask(taskToDelete.id);
            const updatedTasks = tasks.filter((task) => task.id !== taskToDelete.id);
            onTaskUpdated(updatedTasks);
        }
        setOpenDialog(false);
    };

    const handleCancelDelete = () => {
        setOpenDialog(false);
        setTaskToDelete(null);
    };

    const handleEdit = (task: Task) => {
        setSelectedTask(task);
        setEditTitle(task.title);
        setEditDescription(task.description);
        setEditStatus(task.status);
    };

    const handleSaveEdit = async () => {
        if (selectedTask) {
            const updatedTask = {
                ...selectedTask,
                title: editTitle,
                description: editDescription,
                status: editStatus as 'todo' | 'in_progress' | 'done',
            };
            await updateTaskStatus(updatedTask.id ,updatedTask.status); // Send the updated task to the backend
            const updatedTasks = tasks.map((task) =>
                task.id === selectedTask.id ? updatedTask : task
            );
            onTaskUpdated(updatedTasks); // Update tasks in state
        }
        setSelectedTask(null); // Reset editing state
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <TableContainer component={Paper} sx={{ flexGrow: 1 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow key={task.id}>
                                <TableCell>
                                    {selectedTask && selectedTask.id === task.id ? (
                                        <TextField
                                            value={editTitle}
                                            onChange={(e) => setEditTitle(e.target.value)}
                                            fullWidth
                                        />
                                    ) : (
                                        task.title
                                    )}
                                </TableCell>
                                <TableCell>
                                    {selectedTask && selectedTask.id === task.id ? (
                                        <TextField
                                            value={editDescription}
                                            onChange={(e) => setEditDescription(e.target.value)}
                                            fullWidth
                                        />
                                    ) : (
                                        task.description
                                    )}
                                </TableCell>
                                <TableCell>
                                    {selectedTask && selectedTask.id === task.id ? (
                                        <Select
                                            value={editStatus}
                                            onChange={(e) => setEditStatus(e.target.value)}
                                            fullWidth
                                        >
                                            <MenuItem value="to do">To Do</MenuItem>
                                            <MenuItem value="in progress">In Progress</MenuItem>
                                            <MenuItem value="completed">Completed</MenuItem>
                                        </Select>
                                    ) : (
                                        task.status
                                    )}
                                </TableCell>
                                <TableCell>
                                    {selectedTask && selectedTask.id === task.id ? (
                                        <>
                                            <Button color="primary" onClick={handleSaveEdit}>
                                                Save
                                            </Button>
                                            <Button color="secondary" onClick={() => setSelectedTask(null)}>
                                                Cancel
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <IconButton color="primary" onClick={() => handleEdit(task)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                color="error"
                                                sx={{ ml: 1 }}
                                                onClick={() => { setOpenDialog(true); setTaskToDelete(task); }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Confirmation Dialog for Deleting Task */}
            <Dialog open={openDialog} onClose={handleCancelDelete}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this task?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default TaskTable;
