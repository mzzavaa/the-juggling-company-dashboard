import api from './api';
import config from '../config';

// Dummy user data for offline development
const DUMMY_USER = {
  id: 'u-1',
  username: 'juggler123',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  level: 'Intermediate',
  joinDate: '2024-12-15',
  progress: {
    'm-1': { completed: true, lastPracticed: '2025-04-24', rating: 4 },
    'm-2': { completed: false, lastPracticed: '2025-04-23', rating: 3 },
    'm-3': { completed: false, lastPracticed: '2025-04-20', rating: 2 },
    'm-4': { completed: false, lastPracticed: null, rating: null }
  },
  stats: {
    totalPracticeTime: 75,
    sessionsCompleted: 4,
    modulesCompleted: 1
  }
};

const userService = {
  /**
   * Get current user profile
   * @returns {Promise<object>} User profile data
   */
  async getCurrentUser() {
    try {
      return await api.get(config.api.endpoints.users + '/current', DUMMY_USER);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return DUMMY_USER; // Fallback to dummy data
    }
  },
  
  /**
   * Get user progress for all modules
   * @returns {Promise<object>} User progress data
   */
  async getUserProgress() {
    try {
      const user = await this.getCurrentUser();
      return user.progress || {};
    } catch (error) {
      console.error('Error fetching user progress:', error);
      return DUMMY_USER.progress; // Fallback to dummy data
    }
  },
  
  /**
   * Get user progress for a specific module
   * @param {string} moduleId - Module ID
   * @returns {Promise<object>} Module progress data
   */
  async getModuleProgress(moduleId) {
    try {
      const progress = await this.getUserProgress();
      return progress[moduleId] || { completed: false, lastPracticed: null, rating: null };
    } catch (error) {
      console.error(`Error fetching progress for module ${moduleId}:`, error);
      // Try to find the module progress in dummy data
      return DUMMY_USER.progress[moduleId] || { completed: false, lastPracticed: null, rating: null };
    }
  }
};

export default userService;
