import config from '../config';

// Base API service for making HTTP requests
const api = {
  /**
   * Make a GET request to the API with fallback to dummy data
   * @param {string} endpoint - API endpoint
   * @param {object} dummyData - Fallback data if API request fails
   * @returns {Promise<any>} - Response data
   */
  async get(endpoint, dummyData = null) {
    try {
      const response = await fetch(`${config.api.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 5000
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return response.json();
    } catch (error) {
      console.warn(`API request failed for ${endpoint}:`, error);
      
      // Return dummy data if provided
      if (dummyData) {
        console.info('Using fallback dummy data');
        return dummyData;
      }
      
      throw error;
    }
  },
  
  /**
   * Make a POST request to the API
   * @param {string} endpoint - API endpoint
   * @param {object} data - Request data
   * @returns {Promise<any>} - Response data
   */
  async post(endpoint, data) {
    try {
      const response = await fetch(`${config.api.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return response.json();
    } catch (error) {
      console.error(`API POST request failed for ${endpoint}:`, error);
      throw error;
    }
  }
};

export default api;
