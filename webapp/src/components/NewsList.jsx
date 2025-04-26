import { useEffect, useState } from 'react';
import newsService from '../services/newsService';

/**
 * Component to display a list of news items
 */
export default function NewsList() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const data = await newsService.getAllNews();
        setNews(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch news:', err);
        setError('Failed to load news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div>Loading news...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="news-list">
      <h2>Latest News</h2>
      {news.length === 0 ? (
        <p>No news available.</p>
      ) : (
        <div className="news-grid">
          {news.map(item => (
            <div key={item.id} className="news-card">
              <div className="news-image-placeholder">
                {/* In a real app, this would be an actual image */}
                <div className="placeholder-text">{item.title.charAt(0)}</div>
              </div>
              <div className="news-content">
                <h3>{item.title}</h3>
                <div className="news-date">{new Date(item.date).toLocaleDateString()}</div>
                <p>{item.content}</p>
                <button className="read-more-button">Read More</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
