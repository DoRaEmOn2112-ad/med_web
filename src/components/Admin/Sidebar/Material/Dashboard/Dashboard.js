import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const stats = [
    { label: 'Total Users', value: '2,847', change: '+12.5%', icon: '👥', color: '#0066cc' },
    { label: 'Active Doctors', value: '156', change: '+5.2%', icon: '⚕️', color: '#10b981' },
    { label: 'Today\'s Appointments', value: '48', change: '+23.1%', icon: '📅', color: '#8b5cf6' },
    { label: 'Revenue', value: '$24,580', change: '+18.3%', icon: '💰', color: '#f59e0b' },
  ];

  const recentActivities = [
    { user: 'Dr. Sarah Johnson', action: 'added new patient record', time: '10 min ago' },
    { user: 'John Smith', action: 'booked appointment', time: '25 min ago' },
    { user: 'Dr. Michael Chen', action: 'updated prescription', time: '1 hour ago' },
    { user: 'System', action: 'weekly backup completed', time: '2 hours ago' },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h2>Welcome back, Admin</h2>
          <p className="subtitle">Here's what's happening with your system today.</p>
        </div>
        <div className="date-filter">
          <span className="current-date">Today, {new Date().toLocaleDateString()}</span>
          <select className="date-select">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>This quarter</option>
          </select>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderLeftColor: stat.color }}>
            <div className="stat-header">
              <span className="stat-icon" style={{ backgroundColor: stat.color + '20' }}>
                {stat.icon}
              </span>
              <span className="stat-change positive">{stat.change}</span>
            </div>
            <div className="stat-content">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-label">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="chart-section">
          <div className="section-header">
            <h3>Appointments Overview</h3>
            <button className="view-all-btn">View All →</button>
          </div>
          <div className="chart-placeholder">
            <div className="chart-bars">
              {[65, 80, 75, 90, 85, 95, 70].map((height, i) => (
                <div key={i} className="chart-bar" style={{ height: `${height}%` }}></div>
              ))}
            </div>
            <div className="chart-labels">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
            </div>
          </div>
        </div>

        <div className="activities-section">
          <div className="section-header">
            <h3>Recent Activities</h3>
            <button className="view-all-btn">View All →</button>
          </div>
          <div className="activities-list">
            {recentActivities.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className="activity-icon">
                  <div className="icon-circle">👤</div>
                </div>
                <div className="activity-details">
                  <p className="activity-text">
                    <strong>{activity.user}</strong> {activity.action}
                  </p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="actions-grid">
          <button className="action-btn">
            <span className="action-icon">➕</span>
            <span>Add New User</span>
          </button>
          <button className="action-btn">
            <span className="action-icon">📋</span>
            <span>Schedule Appointment</span>
          </button>
          <button className="action-btn">
            <span className="action-icon">📊</span>
            <span>Generate Report</span>
          </button>
          <button className="action-btn">
            <span className="action-icon">🔔</span>
            <span>Send Notification</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;