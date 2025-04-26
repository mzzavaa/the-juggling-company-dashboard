import { useEffect, useState } from 'react';
import practiceService from '../services/practiceService';
import moduleService from '../services/moduleService';

/**
 * Component to display a list of practice sessions
 */
export default function PracticeSessionList() {
  const [sessions, setSessions] = useState([]);
  const [modules, setModules] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch practice sessions
        const sessionsData = await practiceService.getAllPracticeSessions();
        setSessions(sessionsData);
        
        // Fetch modules to get their titles
        const modulesData = await moduleService.getAllModules();
        const modulesMap = {};
        modulesData.forEach(module => {
          modulesMap[module.id] = module;
        });
        setModules(modulesMap);
        
        setError(null);
      } catch (err) {
        console.error('Failed to fetch practice sessions:', err);
        setError('Failed to load practice sessions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading practice sessions...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="practice-sessions">
      <h2>Recent Practice Sessions</h2>
      {sessions.length === 0 ? (
        <p>No practice sessions recorded yet.</p>
      ) : (
        <div className="sessions-list">
          {sessions.map(session => (
            <div key={session.id} className="session-card">
              <div className="session-header">
                <h3>{modules[session.moduleId]?.title || 'Unknown Module'}</h3>
                <div className="session-date">{new Date(session.date).toLocaleDateString()}</div>
              </div>
              <div className="session-details">
                <div className="session-duration">
                  <strong>Duration:</strong> {session.duration} minutes
                </div>
                <div className="session-rating">
                  <strong>Rating:</strong> {Array(session.rating).fill('★').join('')}
                  {Array(5 - session.rating).fill('☆').join('')}
                </div>
              </div>
              <div className="session-notes">
                <strong>Notes:</strong>
                <p>{session.notes}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
