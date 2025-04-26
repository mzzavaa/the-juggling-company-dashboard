import { useEffect, useState } from 'react';
import moduleService from '../services/moduleService';

/**
 * Component to display a list of juggling modules
 */
export default function ModuleList() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        setLoading(true);
        const data = await moduleService.getAllModules();
        setModules(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch modules:', err);
        setError('Failed to load modules. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  if (loading) return <div>Loading modules...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="module-list">
      <h2>Juggling Modules</h2>
      {modules.length === 0 ? (
        <p>No modules available.</p>
      ) : (
        <ul className="modules-grid">
          {modules.map(module => (
            <li key={module.id} className="module-card">
              <h3>{module.title}</h3>
              <div className="level-badge">Level {module.level}</div>
              <p>{module.description}</p>
              <button className="view-button">View Details</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
