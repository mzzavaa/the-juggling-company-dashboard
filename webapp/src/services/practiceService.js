import api from './api';
import config from '../config';

// Dummy practice session data for offline development
const DUMMY_PRACTICE_SESSIONS = [
  {
    id: 'p-1',
    moduleId: 'm-1',
    date: '2025-04-24',
    duration: 15,
    notes: 'Getting better at the basic cascade pattern. Managed 30 catches consistently.',
    rating: 4
  },
  {
    id: 'p-2',
    moduleId: 'm-2',
    date: '2025-04-23',
    duration: 20,
    notes: 'Started learning the reverse cascade. Still dropping after 10-15 catches.',
    rating: 3
  },
  {
    id: 'p-3',
    moduleId: 'm-1',
    date: '2025-04-22',
    duration: 10,
    notes: 'Quick practice session focusing on smooth throws.',
    rating: 4
  },
  {
    id: 'p-4',
    moduleId: 'm-3',
    date: '2025-04-20',
    duration: 30,
    notes: 'First attempt at Mills Mess. Very challenging but made some progress.',
    rating: 2
  }
];

const practiceService = {
  /**
   * Get all practice sessions
   * @returns {Promise<Array>} List of practice sessions
   */
  async getAllPracticeSessions() {
    try {
      return await api.get(config.api.endpoints.practiceSessions, DUMMY_PRACTICE_SESSIONS);
    } catch (error) {
      console.error('Error fetching practice sessions:', error);
      return DUMMY_PRACTICE_SESSIONS; // Fallback to dummy data
    }
  },
  
  /**
   * Get practice sessions for a specific module
   * @param {string} moduleId - Module ID
   * @returns {Promise<Array>} List of practice sessions for the module
   */
  async getPracticeSessionsByModule(moduleId) {
    try {
      const sessions = await this.getAllPracticeSessions();
      return sessions.filter(session => session.moduleId === moduleId);
    } catch (error) {
      console.error(`Error fetching practice sessions for module ${moduleId}:`, error);
      // Filter dummy data
      return DUMMY_PRACTICE_SESSIONS.filter(session => session.moduleId === moduleId);
    }
  },
  
  /**
   * Get a specific practice session by ID
   * @param {string} sessionId - Practice session ID
   * @returns {Promise<object>} Practice session data
   */
  async getPracticeSessionById(sessionId) {
    try {
      const sessions = await this.getAllPracticeSessions();
      return sessions.find(session => session.id === sessionId) || null;
    } catch (error) {
      console.error(`Error fetching practice session ${sessionId}:`, error);
      // Try to find the session in dummy data
      const dummySession = DUMMY_PRACTICE_SESSIONS.find(session => session.id === sessionId);
      if (dummySession) return dummySession;
      throw error;
    }
  }
};

export default practiceService;
