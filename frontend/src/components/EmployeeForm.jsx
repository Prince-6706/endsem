import React, { useState } from 'react';
import { X } from 'lucide-react';
import api from '../api';

const EmployeeForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    skills: '',
    performanceScore: '',
    experience: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()),
        performanceScore: Number(formData.performanceScore),
        experience: Number(formData.experience)
      };
      await api.post('/employees', payload);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add employee');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="glass-panel modal-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2>Add New Employee</h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-light)', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>
        
        {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" className="form-input" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-input" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Department</label>
            <input type="text" name="department" className="form-input" value={formData.department} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Skills (comma separated)</label>
            <input type="text" name="skills" className="form-input" placeholder="e.g., React, Node.js" value={formData.skills} onChange={handleChange} required />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Performance Score (0-100)</label>
              <input type="number" name="performanceScore" min="0" max="100" className="form-input" value={formData.performanceScore} onChange={handleChange} required />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Experience (Years)</label>
              <input type="number" name="experience" min="0" className="form-input" value={formData.experience} onChange={handleChange} required />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
            <button type="button" className="btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Employee</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
