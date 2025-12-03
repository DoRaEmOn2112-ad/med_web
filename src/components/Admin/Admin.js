import React, { useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import Dashboard from './Sidebar/Material/Dashboard/Dashboard';
import UserManagement from './Sidebar/Material/User Management/UserManagement';
import DoctorManagement from './Sidebar/Material/Doctor Management/DoctorManagement';
import Appointments from './Sidebar/Material/Appointments/Appointments';
import Analytics from './Sidebar/Material/Analytics/Analytics';
import SystemSettings from './Sidebar/Material/System Settings/SystemSettings';
import Billing from './Sidebar/Material/Billing/Billing';
import './Admin.css';

const Admin = () => {
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UserManagement />;
      case 'doctors':
        return <DoctorManagement />;
      case 'appointments':
        return <Appointments />;
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

  return (
    <div className="admin-container">
      <Sidebar 
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
        collapsed={sidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />
      <main className={`admin-main ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="admin-header">
          <button className="hamburger-btn" onClick={toggleSidebar}>
            <i className="fas fa-bars"></i>
          </button>
          <div className="admin-header-content">
            <h1 className="admin-title">
              {activeComponent.charAt(0).toUpperCase() + activeComponent.slice(1).replace(/([A-Z])/g, ' $1')}
            </h1>
            <div className="admin-actions">
              <button className="notification-btn">
                <i className="fas fa-bell"></i>
                <span className="notification-count">3</span>
              </button>
              <div className="admin-profile">
                <img 
                  src="https://ui-avatars.com/api/?name=Admin+User&background=0066cc&color=fff" 
                  alt="Admin" 
                  className="profile-image"
                />
                <span className="profile-name">Admin User</span>
                <i className="fas fa-chevron-down"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="admin-content">
          {renderActiveComponent()}
        </div>
      </main>
    </div>
  );
};

export default Admin;