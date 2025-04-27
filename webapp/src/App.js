import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ModulesPage from './pages/ModulesPage';
import ModuleDetailPage from './pages/ModuleDetailPage';
import PracticePage from './pages/PracticePage';
import NewsPage from './pages/NewsPage';
import NewsDetailPage from './pages/NewsDetailPage';
import { Alert, Box, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { AuthProvider } from './context/AuthContext';
import { UserProgressProvider } from './context/UserProgressContext';
import { useThemeMode } from './context/ThemeContext';
import config from './config';
import userData from './data/user.json';

/**
 * Header component with theme toggle
 */
function Header() {
  const { mode, toggleColorMode } = useThemeMode();
  
  return (
    <header className="app-header">
      <div className="logo">
        <h1>{config.app.name}</h1>
      </div>
      <nav className="main-nav">
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/modules">Modules</Link></li>
          <li><Link to="/practice">Practice</Link></li>
          <li><Link to="/news">News</Link></li>
        </ul>
      </nav>
      <div className="user-menu">
        <IconButton 
          onClick={toggleColorMode} 
          color="inherit" 
          aria-label="toggle theme"
          sx={{ mr: 2 }}
        >
          {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        <span className="user-greeting">Welcome, {userData.name}!</span>
      </div>
    </header>
  );
}

/**
 * Main App component
 */
function App() {
  console.log('App environment:', config.app.environment);
  
  return (
    <AuthProvider>
      <UserProgressProvider>
        <div className="app-container">
          <Header />
          
          <main className="app-content">
            {/* Demo mode alert */}
            <Box sx={{ mb: 3, mx: 3 }}>
              <Alert severity="warning">
                <strong>Demo Mode - No Backend Connection</strong> - This is a read-only dashboard displaying data from JSON files. No data can be entered or saved.
              </Alert>
            </Box>
            
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/modules" element={<ModulesPage />} />
              <Route path="/module/:moduleId" element={<ModuleDetailPage />} />
              <Route path="/practice" element={<PracticePage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/news/:newsId" element={<NewsDetailPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          
          <footer className="app-footer">
            <p>&copy; 2025 The Juggling Company. All rights reserved.</p>
            <p>Version: {config.app.version} | Environment: Demo</p>
          </footer>
        </div>
      </UserProgressProvider>
    </AuthProvider>
  );
}

export default App;
