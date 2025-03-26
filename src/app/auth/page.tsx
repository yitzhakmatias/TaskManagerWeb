'use client';

import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useRouter } from 'next/navigation';

const Page: React.FC = () => {
    const [email, setEmail] = useState('user@taskmanager.com');
    const [password, setPassword] = useState('password');
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // Hardcoded login credentials for demo purposes
        if (email === 'user@taskmanager.com' && password === 'password') {
            localStorage.setItem('authenticated', 'true');
            router.push('/dashboard');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <Container>
            <Box sx={{ mt: 5, textAlign: 'center' }}>
                <Typography variant="h4">Login</Typography>
                <form onSubmit={handleLogin}>
                    <TextField
                        label="Email"
                        fullWidth
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ mb: 3 }}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Log In
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default Page;
