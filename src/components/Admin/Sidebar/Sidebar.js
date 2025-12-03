import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { 
  faTachometerAlt, 
  faUsers, 
  faUserMd, 
  faCalendarAlt, 
  faChartBar, 
  faCog, 
  faCreditCard,
  faChevronLeft,
  faChevronRight,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = ({ activeComponent, onLogout ,setActiveComponent, collapsed, toggleSidebar }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: faTachometerAlt },
    { id: 'users', label: 'User Management', icon: faUsers },
    { id: 'doctors', label: 'Doctor Management', icon: faUserMd },
    { id: 'appointments', label: 'Appointments', icon: faCalendarAlt },
    { id: 'analytics', label: 'Analytics', icon: faChartBar },
    { id: 'billing', label: 'Billing', icon: faCreditCard },
    { id: 'settings', label: 'System Settings', icon: faCog },
  ];
 
  
    
    
  

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!collapsed && (
          <div className="logo-container">
            <div className="logo-icon">⚕️</div>
            <h2 className="logo-text">MediCare Pro</h2>
          </div>
        )}
        <button className="collapse-btn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={collapsed ? faChevronRight : faChevronLeft} />
        </button>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="menu-items">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`menu-item ${activeComponent === item.id ? 'active' : ''}`}
                onClick={() => setActiveComponent(item.id)}
              >
                <FontAwesomeIcon icon={item.icon} className="menu-icon" />
                {!collapsed && <span className="menu-label">{item.label}</span>}
                {activeComponent === item.id && !collapsed && (
                  <div className="active-indicator"></div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="sidebar-footer">
         <button className="logout-btn" onClick={onLogout}>
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </button>
      </div>
    </aside>
  );
};

export default Sidebar;