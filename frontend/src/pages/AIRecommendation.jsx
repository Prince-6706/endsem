import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, BrainCircuit, Play } from 'lucide-react';
import api from '../api';

const AIRecommendation = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await api.get('/employees');
        setEmployees(res.data);
      } catch (err) {
        console.error('Failed to fetch employees', err);
      }
    };
    fetchEmployees();
  }, []);

  const handleGenerate = async (all = false) => {
    if (!all && !selectedEmployee) {
      setError('Please select an employee');
      return;
    }
    
    setLoading(true);
    setError('');
    setRecommendation('');

    try {
      const payload = all ? { allEmployees: true } : { employeeId: selectedEmployee };
      const res = await api.post('/ai/recommend', payload);
      setRecommendation(res.data.recommendation);
    } catch (err) {
      setError('Failed to generate AI recommendation. Check if API key is valid.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>AI HR System</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Dashboard</Link>
          <Link to="/ai-recommendations" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BrainCircuit size={18} /> AI Analysis
          </Link>
        </nav>
        <button onClick={handleLogout} className="btn btn-danger" style={{ position: 'absolute', bottom: '24px', left: '24px', width: '202px' }}>
          <LogOut size={18} /> Logout
        </button>
      </div>

      <div className="main-content">
        <h1>AI-Powered Recommendations</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Generate intelligent insights for promotions, training, and employee ranking.</p>

        <div className="glass-panel" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
          <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
            <label className="form-label">Select Employee</label>
            <select 
              className="form-input" 
              value={selectedEmployee} 
              onChange={(e) => setSelectedEmployee(e.target.value)}
            >
              <option value="">-- Select an Employee --</option>
              {employees.map(emp => (
                <option key={emp._id} value={emp._id}>{emp.name} ({emp.department}) - Score: {emp.performanceScore}</option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary" onClick={() => handleGenerate(false)} disabled={loading}>
            <Play size={18} /> Analyze Employee
          </button>
          <button className="btn" style={{ background: 'var(--accent)', color: 'white' }} onClick={() => handleGenerate(true)} disabled={loading}>
            <BrainCircuit size={18} /> Analyze All (Rankings)
          </button>
        </div>

        {error && <p style={{ color: 'var(--danger)', marginBottom: '1rem' }}>{error}</p>}

        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 0' }}>
            <div className="spinner"></div>
            <p style={{ marginTop: '1rem', color: 'var(--primary)' }}>AI is analyzing data...</p>
          </div>
        )}

        {recommendation && !loading && (
          <div className="glass-panel ai-card">
            <h3><BrainCircuit size={20} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} /> AI Insight</h3>
            <div style={{ 
              whiteSpace: 'pre-wrap', 
              lineHeight: '1.6', 
              marginTop: '1rem',
              color: 'var(--text-light)',
              background: 'rgba(0,0,0,0.2)',
              padding: '1rem',
              borderRadius: '8px'
            }}>
              {recommendation}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIRecommendation;
