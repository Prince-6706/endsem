import React from 'react';

const EmployeeList = ({ employees }) => {
  if (employees.length === 0) {
    return <p style={{ color: 'var(--text-muted)' }}>No employees found.</p>;
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Skills</th>
            <th>Exp (Yrs)</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td style={{ fontWeight: '500' }}>{emp.name}</td>
              <td style={{ color: 'var(--text-muted)' }}>{emp.email}</td>
              <td>
                <span style={{ 
                  background: 'rgba(16, 185, 129, 0.1)', 
                  color: 'var(--success)', 
                  padding: '4px 8px', 
                  borderRadius: '12px',
                  fontSize: '0.85rem'
                }}>
                  {emp.department}
                </span>
              </td>
              <td>
                {emp.skills.map((skill, index) => (
                  <span key={index} className="skill-pill">{skill}</span>
                ))}
              </td>
              <td>{emp.experience}</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', height: '6px', borderRadius: '3px' }}>
                    <div style={{ 
                      width: `${emp.performanceScore}%`, 
                      background: emp.performanceScore > 80 ? 'var(--success)' : emp.performanceScore > 50 ? '#f59e0b' : 'var(--danger)',
                      height: '100%', 
                      borderRadius: '3px' 
                    }}></div>
                  </div>
                  <span style={{ fontSize: '0.85rem' }}>{emp.performanceScore}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
