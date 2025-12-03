// src/Admin/AdminSidebar/Metarial/Dashboard/Dashboard.js
import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 1247,
    activeDoctors: 45,
    todayAppointments: 89,
    revenue: 12567,
    pendingAppointments: 23,
    availableBeds: 156,
    systemUptime: '99.9%',
    avgWaitTime: '15m'
  });

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, user: 'john@email.com', action: 'New registration', time: '2 mins ago', type: 'user' },
    { id: 2, user: 'Dr. Smith', action: 'Updated schedule', time: '5 mins ago', type: 'doctor' },
    { id: 3, user: 'jane@email.com', action: 'Appointment booked', time: '10 mins ago', type: 'appointment' },
    { id: 4, user: 'System', action: 'Database backup completed', time: '15 mins ago', type: 'system' },
    { id: 5, user: 'bob@email.com', action: 'Payment received', time: '20 mins ago', type: 'payment' }
  ]);

  const [systemHealth, setSystemHealth] = useState([
    { id: 1, component: 'Web Server', status: 'healthy', uptime: '99.9%', response: '120ms' },
    { id: 2, component: 'Database', status: 'healthy', uptime: '99.8%', response: '45ms' },
    { id: 3, component: 'API Gateway', status: 'warning', uptime: '98.5%', response: '210ms' },
    { id: 4, component: 'Storage', status: 'healthy', uptime: '99.7%', response: '75ms' }
  ]);

  const [chartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    users: [800, 900, 950, 1050, 1150, 1247],
    appointments: [420, 480, 520, 580, 640, 720],
    revenue: [8500, 9200, 9800, 10500, 11500, 12567]
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'healthy': return 'status-healthy';
      case 'warning': return 'status-warning';
      case 'critical': return 'status-critical';
      default: return '';
    }
  };

  return (
    <div className="admin-dashboard-container">
      <div className="dashboard-header">
        <h2>System Overview</h2>
        <div className="header-actions">
          <button className="btn-refresh">
            <i className="fas fa-sync-alt"></i>
            Refresh Data
          </button>
          <button className="btn-export">
            <i className="fas fa-download"></i>
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon users">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-info">
            <h3>Total Users</h3>
            <p className="stat-value">{stats.totalUsers.toLocaleString()}</p>
            <p className="stat-change positive">
              <i className="fas fa-arrow-up"></i>
              12.5% increase
            </p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon doctors">
            <i className="fas fa-user-md"></i>
          </div>
          <div className="stat-info">
            <h3>Active Doctors</h3>
            <p className="stat-value">{stats.activeDoctors}</p>
            <p className="stat-change positive">
              <i className="fas fa-arrow-up"></i>
              2 new this month
            </p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon appointments">
            <i className="fas fa-calendar-check"></i>
          </div>
          <div className="stat-info">
            <h3>Today's Appointments</h3>
            <p className="stat-value">{stats.todayAppointments}</p>
            <p className="stat-change">
              <i className="fas fa-clock"></i>
              {stats.avgWaitTime} avg wait
            </p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon revenue">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="stat-info">
            <h3>Monthly Revenue</h3>
            <p className="stat-value">{formatCurrency(stats.revenue)}</p>
            <p className="stat-change positive">
              <i className="fas fa-arrow-up"></i>
              18.3% growth
            </p>
          </div>
        </div>
      </div>

      {/* System Health & Recent Activities */}
      <div className="dashboard-grid">
        <div className="system-health">
          <div className="section-header">
            <h3>System Health</h3>
            <span className="uptime">Uptime: {stats.systemUptime}</span>
          </div>
          <div className="health-components">
            {systemHealth.map(component => (
              <div key={component.id} className="health-component">
                <div className="component-info">
                  <h4>{component.component}</h4>
                  <p>Response: {component.response}</p>
                </div>
                <div className="component-status">
                  <div className={`status-indicator ${getStatusBadge(component.status)}`}>
                    {component.status}
                  </div>
                  <p className="uptime">{component.uptime} uptime</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="recent-activities">
          <div className="section-header">
            <h3>Recent Activities</h3>
            <button className="btn-view-all">View All</button>
          </div>
          <div className="activities-list">
            {recentActivities.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className={`activity-icon ${activity.type}`}>
                  <i className={`fas fa-${activity.type === 'user' ? 'user' : activity.type === 'doctor' ? 'user-md' : activity.type === 'appointment' ? 'calendar' : activity.type === 'payment' ? 'dollar-sign' : 'cog'}`}></i>
                </div>
                <div className="activity-content">
                  <p className="activity-action">{activity.action}</p>
                  <p className="activity-user">{activity.user}</p>
                </div>
                <div className="activity-time">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="quick-stats">
        <div className="section-header">
          <h3>Quick Stats</h3>
          <select className="time-filter">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last year</option>
          </select>
        </div>
        <div className="stats-chart">
          <div className="chart-placeholder">
            <div className="chart-header">
              <h4>System Growth Overview</h4>
              <div className="chart-legend">
                <span className="legend users">
                  <div className="dot"></div>
                  Users
                </span>
                <span className="legend appointments">
                  <div className="dot"></div>
                  Appointments
                </span>
                <span className="legend revenue">
                  <div className="dot"></div>
                  Revenue
                </span>
              </div>
            </div>
            <div className="chart-bars">
              {chartData.labels.map((label, index) => (
                <div key={index} className="chart-bar-group">
                  <div className="bar-label">{label}</div>
                  <div className="bars">
                    <div 
                      className="bar users" 
                      style={{ height: `${chartData.users[index] / 15}px` }}
                      title={`${chartData.users[index]} users`}
                    ></div>
                    <div 
                      className="bar appointments" 
                      style={{ height: `${chartData.appointments[index] / 8}px` }}
                      title={`${chartData.appointments[index]} appointments`}
                    ></div>
                    <div 
                      className="bar revenue" 
                      style={{ height: `${chartData.revenue[index] / 150}px` }}
                      title={`$${chartData.revenue[index]}`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Admin Actions */}
      <div className="admin-actions">
        <h3>Quick Actions</h3>
        <div className="action-grid">
          <button className="action-btn">
            <i className="fas fa-user-plus"></i>
            Add New User
          </button>
          <button className="action-btn">
            <i className="fas fa-user-md"></i>
            Register Doctor
          </button>
          <button className="action-btn">
            <i className="fas fa-file-medical"></i>
            Generate Reports
          </button>
          <button className="action-btn">
            <i className="fas fa-cog"></i>
            System Settings
          </button>
          <button className="action-btn">
            <i className="fas fa-database"></i>
            Backup Database
          </button>
          <button className="action-btn">
            <i className="fas fa-shield-alt"></i>
            Security Audit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;