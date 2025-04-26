// Configuration for the Juggling Company Dashboard
// Values will be populated from environment variables set by Terraform

const config = {
  // API Configuration
  api: {
    baseUrl: import.meta.env?.VITE_API_URL || process.env.REACT_APP_API_URL || '',
    endpoints: {
      users: '/users',
      modules: '/modules',
      userProgress: '/user-progress',
      practiceSessions: '/practice-sessions',
      news: '/news',
      health: '/health'
    }
  },
  
  // AWS Configuration
  aws: {
    region: import.meta.env?.VITE_AWS_REGION || process.env.REACT_APP_AWS_REGION || 'us-west-2',
    userPoolId: import.meta.env?.VITE_USER_POOL_ID || process.env.REACT_APP_USER_POOL_ID || 'mock-user-pool-id',
    userPoolWebClientId: import.meta.env?.VITE_USER_POOL_CLIENT_ID || process.env.REACT_APP_USER_POOL_CLIENT_ID || 'mock-client-id',
    
    // S3
    s3: {
      mediaBucket: import.meta.env?.VITE_S3_MEDIA_BUCKET || process.env.REACT_APP_S3_MEDIA_BUCKET || 'mock-media-bucket'
    }
  },
  
  // App Configuration
  app: {
    name: 'Juggling Dashboard',
    version: '1.0.0',
    environment: import.meta.env?.MODE || process.env.NODE_ENV || 'development',
    useMockData: true // Flag to indicate we're using mock data
  }
};

export default config;
