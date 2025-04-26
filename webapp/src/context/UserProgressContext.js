import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
// Import JSON data directly
import modulesData from '../data/modules.json';
import achievementsData from '../data/achievements.json';
import practiceSessionsData from '../data/practiceSessions.json';

// Create the context
const UserProgressContext = createContext();

export function useUserProgress() {
  return useContext(UserProgressContext);
}

export function UserProgressProvider({ children }) {
  const { user } = useAuth();
  const [modules, setModules] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [practiceSessions, setPracticeSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user progress data from JSON files
  useEffect(() => {
    const loadUserProgress = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Simulate loading delay for a more realistic experience
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Use the imported JSON data
        setModules(modulesData);
        setAchievements(achievementsData);
        setPracticeSessions(practiceSessionsData);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load user progress data.');
        setLoading(false);
      }
    };

    loadUserProgress();
  }, [user]);

  // Update module progress (demo only - doesn't persist)
  const updateModuleProgress = async (moduleId, progress) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setModules(prevModules => 
        prevModules.map(module => 
          module.id === moduleId 
            ? { ...module, progress: progress } 
            : module
        )
      );
      
      setLoading(false);
      return true;
    } catch (err) {
      setError('Failed to update module progress.');
      setLoading(false);
      return false;
    }
  };

  // Add practice session (demo only - doesn't persist)
  const addPracticeSession = async (sessionData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newSession = {
        id: `session-${Date.now()}`,
        date: new Date().toISOString(),
        ...sessionData
      };
      
      setPracticeSessions(prevSessions => [...prevSessions, newSession]);
      
      setLoading(false);
      return true;
    } catch (err) {
      setError('Failed to add practice session.');
      setLoading(false);
      return false;
    }
  };

  // Unlock achievement (demo only - doesn't persist)
  const unlockAchievement = async (achievementId) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setAchievements(prevAchievements => 
        prevAchievements.map(achievement => 
          achievement.id === achievementId 
            ? { 
                ...achievement, 
                unlocked: true, 
                dateEarned: new Date().toISOString().split('T')[0]
              } 
            : achievement
        )
      );
      
      setLoading(false);
      return true;
    } catch (err) {
      setError('Failed to unlock achievement.');
      setLoading(false);
      return false;
    }
  };

  // Helper functions
  const getModule = (moduleId) => {
    return modules.find(module => module.id === moduleId) || null;
  };

  const getModuleAchievements = (moduleId) => {
    return achievements.filter(achievement => achievement.moduleId === moduleId);
  };

  const getModulePracticeSessions = (moduleId) => {
    return practiceSessions.filter(session => session.moduleId === moduleId);
  };

  const value = {
    modules,
    achievements,
    practiceSessions,
    loading,
    error,
    updateModuleProgress,
    addPracticeSession,
    unlockAchievement,
    getModule,
    getModuleAchievements,
    getModulePracticeSessions
  };

  return (
    <UserProgressContext.Provider value={value}>
      {children}
    </UserProgressContext.Provider>
  );
}
