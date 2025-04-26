import api from './api';
import config from '../config';

// Dummy news data for offline development
const DUMMY_NEWS = [
  {
    id: 'n-1',
    title: 'New Juggling Workshop Announced',
    date: '2025-04-15',
    content: 'Join us for a special workshop on advanced ball juggling techniques. This workshop will cover 4-ball and 5-ball patterns for intermediate jugglers.',
    imageUrl: 'workshop.jpg'
  },
  {
    id: 'n-2',
    title: 'Juggling Competition Results',
    date: '2025-03-28',
    content: 'Congratulations to all participants in our spring juggling competition! Check out the full results and highlights video.',
    imageUrl: 'competition.jpg'
  },
  {
    id: 'n-3',
    title: 'New Club Juggling Tutorial Series',
    date: '2025-03-10',
    content: 'We\'ve just released a new 10-part tutorial series on club juggling for beginners. Start your club juggling journey today!',
    imageUrl: 'clubs.jpg'
  },
  {
    id: 'n-4',
    title: 'Juggling App Update',
    date: '2025-02-20',
    content: 'Version 2.0 of our juggling practice app is now available with new tracking features and improved video playback.',
    imageUrl: 'app-update.jpg'
  }
];

const newsService = {
  /**
   * Get all news items
   * @returns {Promise<Array>} List of news items
   */
  async getAllNews() {
    try {
      return await api.get(config.api.endpoints.news, DUMMY_NEWS);
    } catch (error) {
      console.error('Error fetching news:', error);
      return DUMMY_NEWS; // Fallback to dummy data
    }
  },
  
  /**
   * Get a specific news item by ID
   * @param {string} newsId - News item ID
   * @returns {Promise<object>} News item data
   */
  async getNewsById(newsId) {
    try {
      const news = await this.getAllNews();
      return news.find(item => item.id === newsId) || null;
    } catch (error) {
      console.error(`Error fetching news item ${newsId}:`, error);
      // Try to find the news item in dummy data
      const dummyNews = DUMMY_NEWS.find(item => item.id === newsId);
      if (dummyNews) return dummyNews;
      throw error;
    }
  }
};

export default newsService;
