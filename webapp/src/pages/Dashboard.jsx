import { useState, useEffect } from 'react';
import UserProfile from '../components/UserProfile';
import ModuleList from '../components/ModuleList';
import PracticeSessionList from '../components/PracticeSessionList';
import NewsList from '../components/NewsList';

/**
 * Main dashboard page component
 */
export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for demonstration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h1>Juggling Dashboard</h1>
      
      <div className="dashboard-grid">
        <div className="dashboard-section user-section">
          <UserProfile />
        </div>
        
        <div className="dashboard-section modules-section">
          <ModuleList />
        </div>
        
        <div className="dashboard-section practice-section">
          <PracticeSessionList />
        </div>
        
        <div className="dashboard-section news-section">
          <NewsList />
        </div>
      </div>
    </div>
  );
}
