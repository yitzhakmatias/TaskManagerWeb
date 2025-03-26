// src/components/Layout.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  CssBaseline,
  ThemeProvider,
  createTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';
import './globals.css';

// Load fonts
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Material UI theme for light and dark mode
const theme = createTheme({
  palette: {
    mode: 'dark',  // Set the default theme to dark
    primary: {
      main: '#1976d2', // Blue
    },
    secondary: {
      main: '#d32f2f', // Red
    },
  },
});

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const authStatus = localStorage.getItem('authenticated');
    const username = localStorage.getItem('userName');

    if (authStatus) {

      setUserName(username || 'User');
    } else {
      router.push('/auth'); // Redirect to login if not authenticated
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('authenticated');
    localStorage.removeItem('userName');

    router.push('/auth'); // Redirect to login after logout
  };


  return (
      <html lang="en">
      <ThemeProvider theme={theme}>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
          {/* Conditionally Render Sidebar if authenticated */}


          {/* Main Content */}
          <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
            {/* Top Menu */}

                <AppBar position="sticky">
                  <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                      <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                      Welcome, {userName || 'User'}
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>
                      Logout
                    </Button>
                  </Toolbar>
                </AppBar>


            {/* Content Area (children passed to the Layout component) */}
            <Box sx={{ mt: 3 }}>{children}</Box>
          </Box>
        </Box>
        </body>
      </ThemeProvider>
      </html>
  );
};

export default Layout;