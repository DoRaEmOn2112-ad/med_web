import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar/AdminSidebar.js';
import Dashboard from './AdminSidebar/Metarial/Dashboard/Dashboad.js';
import UserManagement from './AdminSidebar/Metarial/User Management/UserManagement.js';
import DoctorManagement from './AdminSidebar/Metarial/Doctor Management/DoctorManagement.js';
import Appointment from './AdminSidebar/Metarial/Appointment/Appointment.js';
import Analytics from './AdminSidebar/Metarial/Analytics/Analytics.js';
import SystemSettings from './AdminSidebar/Metarial/System Setting/SystemSettings.js';
import Billing from './AdminSidebar/Metarial/Billing/Billing.js';
import './Admin.css';

const Admin = ({ user, onLogout }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, text: 'New user registration pending approval', time: '5 min ago', type: 'warning' },
    { id: 2, text: 'System backup completed successfully', time: '1 hour ago', type: 'success' },
    { id: 3, text: 'Appointment schedule updated', time: '2 hours ago', type: 'info' }
  ]);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'user-management':
        return <UserManagement />;
      case 'doctor-management':
        return <DoctorManagement />;
      case 'appointments':
        return <Appointment />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <SystemSettings />;
      case 'billing':
        return <Billing />;
      default:
        return <Dashboard />;
    }
  };

  const getSectionTitle = () => {
    const titles = {
      'dashboard': 'Admin Dashboard',
      'user-management': 'User Management',
      'doctor-management': 'Doctor Management',
      'appointments': 'Appointment Management',
      'analytics': 'System Analytics',
      'settings': 'System Settings',
      'billing': 'Billing & Invoices'
    };
    return titles[activeSection] || 'Dashboard';
  };

  const getSectionDescription = () => {
    const descriptions = {
      'dashboard': 'System overview, analytics, and quick actions',
      'user-management': 'Manage patient accounts, permissions, and registrations',
      'doctor-management': 'Handle doctor profiles, schedules, and credentials',
      'appointments': 'View, schedule, and manage patient appointments',
      'analytics': 'Performance metrics, trends, and reporting',
      'settings': 'Configure system preferences and security settings',
      'billing': 'Manage invoices, payments, and financial reports'
    };
    return descriptions[activeSection] || 'System overview and analytics';
  };

  return (
    <div className="admin-dashboard">
      {/* Navigation Bar */}
      <nav className="dashboard-nav">
        <div className="nav-left">
          <button 
            className="hamburger-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle menu"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="nav-brand">
            <i className="fas fa-stethoscope"></i>
            <span>MediCare Pro Admin</span>
          </div>
        </div>
        
        <div className="nav-center">
          <div className="quick-stats-bar">
            <div className="stat-item">
              <i className="fas fa-user-clock"></i>
              <span>Pending: 12</span>
            </div>
            <div className="stat-item">
              <i className="fas fa-calendar-check"></i>
              <span>Today: 89</span>
            </div>
            <div className="stat-item">
              <i className="fas fa-exclamation-circle"></i>
              <span>Alerts: 3</span>
            </div>
          </div>
        </div>

        <div className="nav-right">
          <div className="notifications-dropdown">
            <button className="notifications-btn">
              <i className="fas fa-bell"></i>
              <span className="notification-badge">3</span>
            </button>
            <div className="notifications-panel">
              <div className="notifications-header">
                <h4>Notifications</h4>
                <button className="mark-all-read">Mark all as read</button>
              </div>
              <div className="notifications-list">
                {notifications.map(notif => (
                  <div key={notif.id} className={`notification-item ${notif.type}`}>
                    <div className="notification-icon">
                      <i className={`fas fa-${notif.type === 'warning' ? 'exclamation-triangle' : notif.type === 'success' ? 'check-circle' : 'info-circle'}`}></i>
                    </div>
                    <div className="notification-content">
                      <p>{notif.text}</p>
                      <span className="notification-time">{notif.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="view-all-notifications">View all notifications</button>
            </div>
          </div>
          
          <div className="nav-user">
            <div className="user-avatar">
              <i className="fas fa-user-shield"></i>
            </div>
            <div className="user-info">
              <span className="user-name">Admin {user?.name}</span>
              <span className="user-role">Super Administrator</span>
            </div>
            <div className="user-dropdown">
              <button className="user-menu-btn">
                <i className="fas fa-chevron-down"></i>
              </button>
              <div className="user-dropdown-menu">
                <button className="dropdown-item">
                  <i className="fas fa-user"></i> My Profile
                </button>
                <button className="dropdown-item">
                  <i className="fas fa-cog"></i> Account Settings
                </button>
                <button className="dropdown-item">
                  <i className="fas fa-history"></i> Activity Log
                </button>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item logout-btn" onClick={onLogout}>
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="dashboard-content">
        <AdminSidebar 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        
        <main className="main-content">
          {/* Content Header */}
          <div className="content-header">
            <div className="header-left">
              <h1>{getSectionTitle()}</h1>
              <p>{getSectionDescription()}</p>
            </div>
            <div className="header-actions">
              <button className="action-btn primary">
                <i className="fas fa-plus"></i>
                Add New
              </button>
              <button className="action-btn secondary">
                <i className="fas fa-download"></i>
                Export
              </button>
              <button className="action-btn tertiary">
                <i className="fas fa-print"></i>
                Print
              </button>
            </div>
          </div>

          {/* Breadcrumb Navigation */}
          <nav className="breadcrumb-nav">
            <span className="breadcrumb-item">Admin Panel</span>
            <i className="fas fa-chevron-right breadcrumb-separator"></i>
            <span className="breadcrumb-item active">{getSectionTitle()}</span>
          </nav>

          {/* Content Body */}
          <div className="content-body">
            {renderActiveSection()}
          </div>

          {/* Footer */}
          <footer className="content-footer">
            <div className="footer-left">
              <p>© 2024 MediCare Pro. All rights reserved.</p>
            </div>
            <div className="footer-right">
              <span className="footer-item">
                <i className="fas fa-server"></i> Server: Online
              </span>
              <span className="footer-item">
                <i className="fas fa-database"></i> Last backup: 2 hours ago
              </span>
              <span className="footer-item">
                <i className="fas fa-shield-alt"></i> Security: Active
              </span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Admin;