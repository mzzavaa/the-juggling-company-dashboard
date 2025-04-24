import { createTheme } from '@mui/material/styles';

// Define custom colors
const colors = {
  tjBlue: '#2f6398',   // PRIMARY - Technology-related UI (light mode)
  tjBlueDark: '#29b6f6', // PRIMARY - Technology-related UI (dark mode with opacity)
  tjGreen: '#3ea075',  // SECONDARY - Change-related UI
  tjRed: '#b74047',    // BRAIN - Brain / juggling-skill UI
  tjSand: '#e2c293',   // SAND - neutral highlight fallback
  tjDark: '#011627',
  darkBackground: '#121212', // Darker background (more black)
  darkPaper: '#1e1e1e',      // Darker paper background
};

// Create theme creator function to support light/dark modes
export const createAppTheme = (mode) => {
  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? 'rgba(41, 182, 246, 0.9)' : colors.tjBlue, // Lighter blue with opacity in dark mode
        dark: mode === 'dark' ? 'rgba(2, 136, 209, 0.9)' : '#254d7a', // Darker shade with opacity
        light: mode === 'dark' ? 'rgba(79, 195, 247, 0.9)' : '#4a7ab0', // Lighter shade with opacity
      },
      secondary: {
        main: colors.tjGreen,
        dark: mode === 'dark' ? '#2d7a59' : '#32805f', // Darker shade of secondary
      },
      error: {
        main: colors.tjRed,
      },
      warning: {
        main: colors.tjSand,
      },
      background: {
        default: mode === 'dark' ? colors.darkBackground : '#f5f5f7',
        paper: mode === 'dark' ? colors.darkPaper : '#ffffff',
      },
      text: {
        primary: mode === 'dark' ? '#ffffff' : 'rgba(0, 0, 0, 0.87)',
        secondary: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
      },
    },
    typography: {
      fontFamily: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 700,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 500,
      },
      h6: {
        fontWeight: 500,
      },
      button: {
        textTransform: 'none',
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            backgroundColor: mode === 'dark' ? '#000000' : colors.tjBlue,
            '& .MuiIconButton-root': {
              color: mode === 'dark' ? 'rgba(41, 182, 246, 0.9)' : 'inherit', // Highlight icons in dark mode with opacity
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            },
          },
          containedPrimary: {
            '&:hover': {
              backgroundColor: mode === 'dark' ? 'rgba(41, 182, 246, 0.85)' : 'rgba(47, 99, 152, 0.85)', // Adjusted for dark mode
            },
          },
          containedSecondary: {
            '&:hover': {
              backgroundColor: 'rgba(62, 160, 117, 0.85)', // tjGreen with opacity
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: mode === 'dark' ? '0px 4px 12px rgba(0, 0, 0, 0.3)' : '0px 4px 12px rgba(0, 0, 0, 0.05)',
            backgroundColor: mode === 'dark' ? colors.darkPaper : '#ffffff',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: mode === 'dark' ? '0px 4px 12px rgba(0, 0, 0, 0.3)' : '0px 4px 12px rgba(0, 0, 0, 0.05)',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: 4,
            backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : '#E0E0E0',
          },
          barColorPrimary: {
            backgroundColor: mode === 'dark' ? 'rgba(41, 182, 246, 0.9)' : undefined,
          }
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: mode === 'dark' ? '#000000' : '#ffffff',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              backgroundColor: mode === 'dark' ? 'rgba(41, 182, 246, 0.15)' : 'rgba(47, 99, 152, 0.1)',
              '&:hover': {
                backgroundColor: mode === 'dark' ? 'rgba(41, 182, 246, 0.25)' : 'rgba(47, 99, 152, 0.2)',
              },
              '& .MuiListItemIcon-root': {
                color: mode === 'dark' ? 'rgba(41, 182, 246, 0.9)' : colors.tjBlue,
              },
            },
          },
        },
      },
    },
  });

  // Add CSS variables for custom colors
  if (typeof document !== 'undefined') {
    document.documentElement.style.setProperty('--tj-blue', mode === 'dark' ? 'rgba(41, 182, 246, 0.9)' : colors.tjBlue);
    document.documentElement.style.setProperty('--tj-green', colors.tjGreen);
    document.documentElement.style.setProperty('--tj-red', colors.tjRed);
    document.documentElement.style.setProperty('--tj-sand', colors.tjSand);
    document.documentElement.style.setProperty('--tj-dark', colors.tjDark);
  }

  return theme;
};

// Default theme is light mode
const theme = createAppTheme('light');

export default theme;
