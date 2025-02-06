"use client"; // To ensure client-side rendering

import { useEffect, useState, ReactNode } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider, Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; // Resets default styles
import ThemeContext from './ThemeContext';
import themesConfig from '@/config/themeConfig';

// Default palette to fall back on if themesConfig doesn't provide one
const defaultPalette = {
    mode: 'light',
    primary: {
        main: '#1976d2',
    },
    secondary: {
        main: '#dc004e',
    },
    background: {
        default: '#ffffff',
    },
};

// ThemeProvider component that wraps around children and manages the theme
interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [currentTheme, setCurrentTheme] = useState<Theme>(createTheme({
        ...themesConfig[theme],
        palette: {
            ...defaultPalette,
            ...themesConfig[theme]?.palette,
            mode: theme,
        },
    }));

    // Toggle function to switch between light and dark mode
    const toggleTheme = () => {
        setTheme((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        // Set the theme attribute on the HTML element
        const newTheme = createTheme({
            ...themesConfig[theme],
            palette: {
                ...defaultPalette,
                ...themesConfig[theme]?.palette,
                mode: theme,
            },
        });
        setCurrentTheme(newTheme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {/* MUI ThemeProvider to apply the selected theme */}
            <MuiThemeProvider theme={currentTheme}>
                {/* CssBaseline to reset default browser styles */}
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};
