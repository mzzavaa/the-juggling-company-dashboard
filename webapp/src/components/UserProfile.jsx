import { useEffect, useState } from 'react';
import userService from '../services/userService';

/**
 * Component to display user profile information
 */
export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const userData = await userService.getCurrentUser();
        setUser(userData);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
        setError('Failed to load user profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!user) return <div>No user profile found.</div>;

  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="profile-avatar">
          {/* Placeholder for user avatar */}
          <div className="avatar-placeholder">{user.name.charAt(0)}</div>
        </div>
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p className="username">@{user.username}</p>
          <p className="level-badge">{user.level} Juggler</p>
          <p className="join-date">Member since {new Date(user.joinDate).toLocaleDateString()}</p>
        </div>
      </div>
      
      <div className="profile-stats">
        <div className="stat-card">
          <div className="stat-value">{user.stats.totalPracticeTime}</div>
          <div className="stat-label">Minutes Practiced</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{user.stats.sessionsCompleted}</div>
          <div className="stat-label">Practice Sessions</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{user.stats.modulesCompleted}</div>
          <div className="stat-label">Modules Completed</div>
        </div>
      </div>
      
      <div className="profile-progress">
        <h3>Module Progress</h3>
        <div className="progress-list">
          {Object.entries(user.progress).map(([moduleId, progress]) => (
            <div key={moduleId} className="progress-item">
              <div className="progress-module">Module {moduleId.split('-')[1]}</div>
              <div className="progress-status">
                {progress.completed ? 
                  <span className="completed-badge">Completed</span> : 
                  <span className="in-progress-badge">In Progress</span>
                }
              </div>
              {progress.lastPracticed && (
                <div className="last-practiced">
                  Last practiced: {new Date(progress.lastPracticed).toLocaleDateString()}
                </div>
              )}
              {progress.rating && (
                <div className="module-rating">
                  Rating: {Array(progress.rating).fill('★').join('')}
                  {Array(5 - progress.rating).fill('☆').join('')}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
