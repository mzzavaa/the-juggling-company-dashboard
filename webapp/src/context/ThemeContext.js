import React, { createContext, useContext, useState, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { createAppTheme } from '../theme';

// Create context
const ThemeContext = createContext({
  mode: 'light',
  toggleColorMode: () => {},
});

// Custom hook to use the theme context
export const useThemeMode = () => useContext(ThemeContext);

// Theme provider component
export function ThemeProvider({ children }) {
  const [mode, setMode] = useState('light');

  // Toggle between light and dark mode
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    // Save preference to localStorage
    localStorage.setItem('themeMode', mode === 'light' ? 'dark' : 'light');
  };

  // Create the theme based on the current mode
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  // Load saved theme preference on initial render
  React.useEffect(() => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  const value = {
    mode,
    toggleColorMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
