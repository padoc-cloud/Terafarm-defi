// src/contexts/ThemeContext.tsx
import React, { createContext } from 'react';

// Define the structure of the ThemeContext
interface ThemeContextProps {
    theme: 'light' | 'dark';  // The current theme mode (light/dark)
    toggleTheme: () => void;      // Function to toggle between light and dark themes
}

// Create the ThemeContext with an undefined default value
export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export default ThemeContext;
