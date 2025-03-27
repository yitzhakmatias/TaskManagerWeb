import '@testing-library/jest-dom';
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import TaskTable from '@/app/components/TaskTable'; // Adjust the path according to your project structure
import { Task } from '@/types/task';
import {afterAll, beforeAll, beforeEach, describe, expect, it} from "@jest/globals";
import fetchMock from 'jest-fetch-mock';

beforeAll(() => {
    fetchMock.enableMocks();
});

afterAll(() => {
    fetchMock.disableMocks();
});

beforeEach(() => {
    fetchMock.resetMocks();
});

// Mock data for testing
const tasks: Task[] = [
    { id: '1', title: 'Test Task 1', description: 'Description 1', status: 'todo', name: 'User1' },
    { id: '2', title: 'Test Task 2', description: 'Description 2', status: 'in_progress', name: 'User2' }
];

describe('TaskTable Component', () => {
    it('renders tasks correctly', () => {
        render(<TaskTable tasks={tasks} onTaskUpdated={() => {}} />);

        // Check if tasks are rendered in the table
        expect(screen.getByText('Test Task 1')).toBeDefined();
        expect(screen.getByText('Test Task 2')).toBeDefined();
    });

    it('edits a task', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ id: '1', title: 'test', description: 'test' }));

        render(<TaskTable tasks={tasks} onTaskUpdated={() => {}} />);

        // Click on the edit button for the first task using the unique aria-label
        fireEvent.click(screen.getByLabelText('Edit-task-1'));

        // Change the task's title and description
        fireEvent.change(screen.getByDisplayValue('Test Task 1'), { target: { value: 'Updated Task 1' } });
        fireEvent.change(screen.getByDisplayValue('Description 1'), { target: { value: 'Updated Description 1' } });

        // Save the changes
        fireEvent.click(screen.getByText('Save'));

        // Wait for the task to be updated
        await waitFor(() => {
            expect(screen.getByDisplayValue('Updated Description 1')).toBeDefined();
        });

    });
});
