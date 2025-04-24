import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

// Context
import { AuthProvider } from './context/AuthContext';
import { UserProgressProvider } from './context/UserProgressContext';

// Pages
import Dashboard from './pages/Dashboard';
import LearningLab from './pages/LearningLab';
import ModuleView from './pages/ModuleView';
import JugglingTrainer from './pages/JugglingTrainer';
import TechProject from './pages/TechProject';
import Reflection from './pages/Reflection';
import Profile from './pages/Profile';
import Team from './pages/Team';
import Achievements from './pages/Achievements';
import Help from './pages/Help';
import NotFound from './pages/NotFound';

// Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Mock authentication for development
const mockAuth = {
  isAuthenticated: true,
  user: {
    id: 'user-123',
    name: 'Test User',
    email: 'test@example.com',
    avatar: 'https://i.pravatar.cc/300',
    learningStyle: 'Reflector',
    level: 7
  }
};

function App() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate authentication check
    setTimeout(() => {
      setAuthenticated(mockAuth.isAuthenticated);
      setUser(mockAuth.user);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          bgcolor: 'background.default'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <AuthProvider initialState={{ authenticated, user }}>
      <UserProgressProvider>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="juggling-trainer" element={<JugglingTrainer />} />
            <Route path="profile" element={<Profile />} />
            <Route path="learning-lab" element={<LearningLab />} />
            <Route path="modules/:moduleId" element={<ModuleView />} />
            <Route path="tech-project/:projectId" element={<TechProject />} />
            <Route path="reflection/:moduleId" element={<Reflection />} />
            <Route path="team" element={<Team />} />
            <Route path="achievements" element={<Achievements />} />
            <Route path="help" element={<Help />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserProgressProvider>
    </AuthProvider>
  );
}

export default App;
