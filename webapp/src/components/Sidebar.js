import React from 'react';
import { 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  Box, 
  Typography,
  Avatar
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  SportsGymnastics as JugglingIcon,
  Code as CodeIcon,
  Psychology as ReflectionIcon,
  EmojiEvents as AchievementsIcon,
  Groups as TeamIcon,
  Help as HelpIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUserProgress } from '../context/UserProgressContext';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { modules } = useUserProgress();

  const menuItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/dashboard'
    },
    {
      text: 'Learning Lab',
      icon: <SchoolIcon />,
      path: '/learning-lab'
    },
    {
      text: 'Juggling Trainer',
      icon: <JugglingIcon />,
      path: '/juggling-trainer'
    },
    {
      text: 'Tech Projects',
      icon: <CodeIcon />,
      path: '/tech-project/latest'
    },
    {
      text: 'Reflections',
      icon: <ReflectionIcon />,
      path: '/reflection/latest'
    },
    {
      text: 'Achievements',
      icon: <AchievementsIcon />,
      path: '/achievements'
    },
    {
      text: 'Team',
      icon: <TeamIcon />,
      path: '/team'
    },
    {
      text: 'Help',
      icon: <HelpIcon />,
      path: '/help'
    }
  ];

  // Get active module
  const activeModule = modules.find(module => module.status === 'in-progress');

  return (
    <>
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar 
          alt={user?.name || "User"} 
          src={user?.avatar} 
          sx={{ width: 64, height: 64, mb: 1 }}
        />
        <Typography variant="subtitle1" align="center" sx={{ fontWeight: 'bold' }}>
          {user?.name || "User"}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Level {user?.level || 1} {user?.learningStyle || "Learner"}
        </Typography>
      </Box>
      
      <Divider />
      
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Divider />
      
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Current Module
        </Typography>
        {activeModule ? (
          <Box 
            sx={{ 
              p: 1.5, 
              borderRadius: 2, 
              bgcolor: 'background.paper',
              boxShadow: 1,
              cursor: 'pointer'
            }}
            onClick={() => navigate(`/modules/${activeModule.id}`)}
          >
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {activeModule.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Progress: {activeModule.progress}%
            </Typography>
            <Box sx={{ mt: 1, width: '100%', bgcolor: 'background.default', borderRadius: 5, height: 8 }}>
              <Box 
                sx={{ 
                  width: `${activeModule.progress}%`, 
                  bgcolor: 'primary.main', 
                  height: '100%',
                  borderRadius: 5
                }} 
              />
            </Box>
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No active module
          </Typography>
        )}
      </Box>
    </>
  );
}
