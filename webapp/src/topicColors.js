import { useTheme } from '@mui/material/styles';

// Hook to get topic colors based on current theme
export const useTopicColors = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  
  return {
    "Juggling and Technology": isDarkMode ? "rgba(41, 182, 246, 0.9)" : "#2f6398", // PRIMARY
    "Juggling and Change": "#3ea075",     // SECONDARY
    "Juggling and Your Brain": "#b74047", // BRAIN
    default: "#e2c293",                   // SAND
  };
};

// Static version for non-hook contexts
export const topicColors = {
  "Juggling and Technology": "#2f6398", // PRIMARY (fallback for static contexts)
  "Juggling and Change": "#3ea075",     // SECONDARY
  "Juggling and Your Brain": "#b74047", // BRAIN
  default: "#e2c293",                   // SAND
};
