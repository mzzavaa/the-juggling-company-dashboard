// Mock data for the dashboard when backend is unavailable
export const mockModules = [
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
  }
];

export const mockPerformanceData = {
  views: [1245, 1890, 2050, 1780, 2340, 2670, 2120],
  completions: [780, 950, 1020, 890, 1150, 1340, 1060],
  ratings: [4.2, 4.5, 4.3, 4.7, 4.6, 4.8, 4.5],
  dates: ['2025-04-20', '2025-04-21', '2025-04-22', '2025-04-23', '2025-04-24', '2025-04-25', '2025-04-26']
};

// Mock data for achievements
export const mockAchievements = [
  {
    id: 'achievement-1',
    title: '3-Ball Master',
    description: 'Successfully juggle 3 balls for 30 seconds',
    category: 'juggling',
    dateEarned: '2025-04-15',
    unlocked: true
  },
  {
    id: 'achievement-2',
    title: 'AI Apprentice',
    description: 'Complete your first AI project with Amazon Bedrock',
    category: 'technical',
    dateEarned: '2025-04-16',
    unlocked: true
  },
  {
    id: 'achievement-3',
    title: 'Ring Rookie',
    description: 'Successfully juggle 3 rings for 10 seconds',
    category: 'juggling',
    dateEarned: '2025-04-20',
    unlocked: true
  }
];

// Mock data for practice sessions
export const mockPracticeSessions = [
  {
    id: 'session-1',
    date: '2025-04-15',
    propType: 'balls',
    duration: 15, // minutes
    metrics: {
      longestStreak: 25, // seconds
      drops: 12
    }
  },
  {
    id: 'session-2',
    date: '2025-04-16',
    propType: 'balls',
    duration: 20,
    metrics: {
      longestStreak: 35,
      drops: 8
    }
  },
  {
    id: 'session-3',
    date: '2025-04-20',
    propType: 'rings',
    duration: 15,
    metrics: {
      longestStreak: 12,
      drops: 18
    }
  }
];
