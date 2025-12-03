// src/Admin/AdminSidebar/AdminSidebar.js
import React from 'react';
import './AdminSidebar.css';

const AdminSidebar = ({ activeSection, setActiveSection, sidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    { key: 'dashboard', icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
    { key: 'user-management', icon: 'fas fa-users-cog', label: 'User Management' },
    { key: 'doctor-management', icon: 'fas fa-user-md', label: 'Doctor Management' },
    { key: 'appointments', icon: 'fas fa-calendar-alt', label: 'Appointments' },
    { key: 'analytics', icon: 'fas fa-chart-bar', label: 'Analytics' },
    { key: 'settings', icon: 'fas fa-cogs', label: 'System Settings' },
    { key: 'billing', icon: 'fas fa-file-invoice-dollar', label: 'Billing' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div className={`admin-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h3>Admin Panel</h3>
          <button 
            className="close-sidebar"
            onClick={() => setSidebarOpen(false)}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="sidebar-menu">
          {menuItems.map(item => (
            <div
              key={item.key}
              className={`menu-item ${activeSection === item.key ? 'active' : ''}`}
              onClick={() => {
                setActiveSection(item.key);
                setSidebarOpen(false);
              }}
            >
              <div className="menu-icon">
                <i className={item.icon}></i>
              </div>
              <span className="menu-label">{item.label}</span>
              <i className="fas fa-chevron-right menu-arrow"></i>
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          <div className="admin-info">
            <div className="admin-avatar">
              <i className="fas fa-user-shield"></i>
            </div>
            <div className="admin-details">
              <h4>Super Admin</h4>
              <p className="status active">Online</p>
              <p className="role">Administrator</p>
            </div>
          </div>
          <div className="system-status">
            <div className="status-indicator">
              <div className="status-dot online"></div>
              <span>System Status: Operational</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;