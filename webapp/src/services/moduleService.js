import api from './api';
import config from '../config';

// Dummy module data for offline development
const DUMMY_MODULES = [
  { 
    id: 'm-1', 
    title: '3-ball cascade', 
    level: 1, 
    description: 'The fundamental juggling pattern',
    videoUrl: 'cascade.mp4',
    steps: [
      'Start with two balls in your dominant hand, one ball in the other',
      'Throw one ball from your dominant hand in an arc to the other hand',
      'As the first ball reaches its peak, throw the ball from your other hand',
      'Continue the pattern, always throwing when a ball reaches its peak'
    ]
  },
  { 
    id: 'm-2', 
    title: 'Reverse cascade', 
    level: 2, 
    description: 'The cascade pattern with reverse throws',
    videoUrl: 'reverse.mp4',
    steps: [
      'Start with the basic cascade pattern',
      'Instead of throwing balls from inside to outside, throw from outside to inside',
      'Your hands will cross slightly as you throw',
      'Practice slowly until you get comfortable with the reverse motion'
    ]
  },
  { 
    id: 'm-3', 
    title: 'Mills mess', 
    level: 3, 
    description: 'A complex crossing pattern',
    videoUrl: 'mills.mp4',
    steps: [
      'Start with a basic cascade',
      'Cross your dominant arm over your other arm',
      'Throw from this crossed position',
      'Uncross your arms and cross the other arm over',
      'Continue alternating which arm crosses over'
    ]
  },
  { 
    id: 'm-4', 
    title: '4-ball fountain', 
    level: 4, 
    description: 'Basic 4 ball juggling pattern',
    videoUrl: 'fountain.mp4',
    steps: [
      'Hold two balls in each hand',
      'Throw balls from one hand in a consistent arc',
      'When the first ball reaches its peak, throw the second ball',
      'Repeat with the other hand',
      'Both hands work independently in this pattern'
    ]
  }
];

const moduleService = {
  /**
   * Get all modules
   * @returns {Promise<Array>} List of modules
   */
  async getAllModules() {
    try {
      return await api.get(config.api.endpoints.modules, DUMMY_MODULES);
    } catch (error) {
      console.error('Error fetching modules:', error);
      return DUMMY_MODULES; // Fallback to dummy data
    }
  },
  
  /**
   * Get a specific module by ID
   * @param {string} moduleId - Module ID
   * @returns {Promise<object>} Module data
   */
  async getModuleById(moduleId) {
    try {
      const modules = await this.getAllModules();
      return modules.find(module => module.id === moduleId) || null;
    } catch (error) {
      console.error(`Error fetching module ${moduleId}:`, error);
      // Try to find the module in dummy data
      const dummyModule = DUMMY_MODULES.find(module => module.id === moduleId);
      if (dummyModule) return dummyModule;
      throw error;
    }
  }
};

export default moduleService;
