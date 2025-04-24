import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Mock data for modules
const mockModules = [
  {
    id: 'module-1',
    name: 'Balls - AI Foundations',
    description: 'Learn the 3-ball cascade and AI basics with Amazon Bedrock',
    jugglingProp: 'balls',
    techTheme: 'AI Foundations',
    awsServices: ['Amazon Bedrock', 'SageMaker Canvas'],
    ottoTieIn: 'Q&A Agent basics',
    reflection: 'Reflect on "one-ball" quick wins',
    timeEstimate: {
      tech: '1-2 hours',
      juggling: '1 week'
    },
    status: 'completed',
    progress: 100,
    unlocked: true
  },
  {
    id: 'module-2',
    name: 'Rings - MLOps Feedback Loops',
    description: 'Master the 3-ring cascade and MLOps with SageMaker Pipelines',
    jugglingProp: 'rings',
    techTheme: 'MLOps / Feedback Loops',
    awsServices: ['SageMaker Pipelines', 'Model Monitor'],
    ottoTieIn: 'Update OTTO knowledge base',
    reflection: 'Six Thinking Hats on feedback',
    timeEstimate: {
      tech: '3 hours',
      juggling: '1-2 weeks'
    },
    status: 'in-progress',
    progress: 45,
    unlocked: true
  },
  {
    id: 'module-3',
    name: 'Flower Stick - Managed Services',
    description: 'Learn flower stick basics and serverless architecture',
    jugglingProp: 'flower-stick',
    techTheme: 'Managed Services',
    awsServices: ['AWS Lambda', 'Amazon Rekognition', 'Bedrock'],
    ottoTieIn: 'Agenda Producer uses managed GenAI',
    reflection: 'ROI chart on "build vs buy"',
    timeEstimate: {
      tech: '2 hours',
      juggling: '1 week'
    },
    status: 'locked',
    progress: 0,
    unlocked: false
  },
  {
    id: 'module-4',
    name: 'Clubs - Distributed Systems',
    description: 'Master club juggling and event-driven architectures',
    jugglingProp: 'clubs',
    techTheme: 'Distributed / Event-Driven Systems',
    awsServices: ['SQS', 'SNS', 'Step Functions', 'DynamoDB'],
    ottoTieIn: 'Speaker Finder ↔ Agenda flow',
    reflection: 'Chaos-test "dropped club"',
    timeEstimate: {
      tech: '3 hours',
      juggling: '2-3 weeks'
    },
    status: 'locked',
    progress: 0,
    unlocked: false
  },
  {
    id: 'module-5',
    name: 'Devil Stick - Autonomous Agents',
    description: 'Learn devil stick control and build autonomous AI agents',
    jugglingProp: 'devil-stick',
    techTheme: 'Autonomous Agents',
    awsServices: ['Bedrock', 'LangChain', 'Step Functions'],
    ottoTieIn: 'Build mini Speaker Finder',
    reflection: 'Risk matrix for agent autonomy',
    timeEstimate: {
      tech: '3 hours',
      juggling: '2 weeks'
    },
    status: 'locked',
    progress: 0,
    unlocked: false
  },
  {
    id: 'module-6',
    name: 'Cigar Boxes - Orchestration',
    description: 'Master cigar box manipulation and system orchestration',
    jugglingProp: 'cigar-boxes',
    techTheme: 'Orchestration / Big-Picture Arch',
    awsServices: ['Step Functions', 'CodePipeline', 'EventBridge'],
    ottoTieIn: 'Design OTTO "Orchestrator"',
    reflection: 'Business Model Canvas on full flow',
    timeEstimate: {
      tech: '3 hours',
      juggling: '2 weeks'
    },
    status: 'locked',
    progress: 0,
    unlocked: false
  }
];

// Mock data for achievements
const mockAchievements = [
  {
    id: 'achievement-1',
    name: '3-Ball Master',
    description: 'Successfully juggle 3 balls for 30 seconds',
    icon: '🎯',
    category: 'juggling',
    moduleId: 'module-1',
    unlocked: true,
    unlockedAt: '2023-04-15T10:30:00Z'
  },
  {
    id: 'achievement-2',
    name: 'AI Apprentice',
    description: 'Complete your first AI project with Amazon Bedrock',
    icon: '🤖',
    category: 'tech',
    moduleId: 'module-1',
    unlocked: true,
    unlockedAt: '2023-04-16T14:45:00Z'
  },
  {
    id: 'achievement-3',
    name: 'Ring Rookie',
    description: 'Successfully juggle 3 rings for 10 seconds',
    icon: '⭕',
    category: 'juggling',
    moduleId: 'module-2',
    unlocked: true,
    unlockedAt: '2023-04-20T09:15:00Z'
  },
  {
    id: 'achievement-4',
    name: 'Pipeline Pioneer',
    description: 'Deploy your first MLOps pipeline',
    icon: '🔄',
    category: 'tech',
    moduleId: 'module-2',
    unlocked: false
  }
];

// Mock data for practice sessions
const mockPracticeSessions = [
  {
    id: 'session-1',
    date: '2023-04-15T10:00:00Z',
    duration: 15, // minutes
    propType: 'balls',
    moduleId: 'module-1',
    metrics: {
      drops: 12,
      longestStreak: 25, // seconds
      consistency: 0.7
    }
  },
  {
    id: 'session-2',
    date: '2023-04-16T11:30:00Z',
    duration: 20,
    propType: 'balls',
    moduleId: 'module-1',
    metrics: {
      drops: 8,
      longestStreak: 35,
      consistency: 0.8
    }
  },
  {
    id: 'session-3',
    date: '2023-04-20T09:00:00Z',
    duration: 15,
    propType: 'rings',
    moduleId: 'module-2',
    metrics: {
      drops: 18,
      longestStreak: 12,
      consistency: 0.5
    }
  }
];

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

  // Load user progress data
  useEffect(() => {
    const loadUserProgress = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // In a real app, this would fetch data from an API
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setModules(mockModules);
        setAchievements(mockAchievements);
        setPracticeSessions(mockPracticeSessions);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load user progress data.');
        setLoading(false);
      }
    };

    loadUserProgress();
  }, [user]);

  // Update module progress
  const updateModuleProgress = async (moduleId, progress) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would call an API
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

  // Add practice session
  const addPracticeSession = async (sessionData) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would call an API
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

  // Unlock achievement
  const unlockAchievement = async (achievementId) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setAchievements(prevAchievements => 
        prevAchievements.map(achievement => 
          achievement.id === achievementId 
            ? { 
                ...achievement, 
                unlocked: true, 
                unlockedAt: new Date().toISOString() 
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

  // Get module by ID
  const getModule = (moduleId) => {
    return modules.find(module => module.id === moduleId) || null;
  };

  // Get achievements for a module
  const getModuleAchievements = (moduleId) => {
    return achievements.filter(achievement => achievement.moduleId === moduleId);
  };

  // Get practice sessions for a module
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
