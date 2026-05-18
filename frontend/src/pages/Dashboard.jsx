import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Plus, Search, BrainCircuit } from 'lucide-react';
import EmployeeList from '../components/EmployeeList';
import EmployeeForm from '../components/EmployeeForm';
import api from '../api';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const fetchEmployees = async (query = '') => {
    try {
      const url = query ? `/employees/search?department=${query}` : '/employees';
      const res = await api.get(url);
      setEmployees(res.data);
    } catch (err) {
      console.error('Failed to fetch employees', err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEmployees(searchQuery);
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
          <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>Dashboard</Link>
          <Link to="/ai-recommendations" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BrainCircuit size={18} /> AI Analysis
          </Link>
        </nav>
        <button onClick={handleLogout} className="btn btn-danger" style={{ position: 'absolute', bottom: '24px', left: '24px', width: '202px' }}>
          <LogOut size={18} /> Logout
        </button>
      </div>

      <div className="main-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1>Employee Management</h1>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            <Plus size={18} /> Add Employee
          </button>
        </div>

        <div className="glass-panel" style={{ marginBottom: '2rem' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem' }}>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search by Department (e.g., Development)" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="btn btn-primary"><Search size={18} /> Search</button>
            {searchQuery && (
              <button type="button" className="btn" onClick={() => { setSearchQuery(''); fetchEmployees(''); }}>Clear</button>
            )}
          </form>
        </div>

        <div className="glass-panel">
          <EmployeeList employees={employees} />
        </div>

        {showForm && (
          <EmployeeForm 
            onClose={() => setShowForm(false)} 
            onSuccess={() => { setShowForm(false); fetchEmployees(); }} 
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
