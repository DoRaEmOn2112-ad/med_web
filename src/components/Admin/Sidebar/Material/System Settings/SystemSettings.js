import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faBell, faShieldAlt, faPalette, faDatabase, faUsersCog, faGlobe, faLock, faUpload } from '@fortawesome/free-solid-svg-icons';
import './SystemSettings.css';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    clinicName: 'MediCare Pro Clinic',
    clinicEmail: 'contact@medicarepro.com',
    clinicPhone: '+1 (555) 123-4567',
    clinicAddress: '123 Healthcare St, Medical City, MC 12345',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12-hour',
    currency: 'USD',
    language: 'English',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: true,
    appointmentReminders: true,
    prescriptionUpdates: true,
    billingAlerts: true,
    systemAlerts: true,
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordExpiry: 90,
    ipWhitelist: false,
    auditLogging: true,
  });

  const [theme, setTheme] = useState({
    primaryColor: '#0066cc',
    secondaryColor: '#1e293b',
    fontFamily: 'Inter',
    borderRadius: '8px',
    darkMode: false,
  });

  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleSettingChange = (category, field, value) => {
    if (category === 'general') {
      setSettings({ ...settings, [field]: value });
    } else if (category === 'notifications') {
      setNotifications({ ...notifications, [field]: value });
    } else if (category === 'security') {
      setSecurity({ ...security, [field]: value });
    } else if (category === 'theme') {
      setTheme({ ...theme, [field]: value });
    }
  };

  const handleSaveSettings = () => {
    setIsSaving(true);
    setSaveMessage('');
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveMessage('Settings saved successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSaveMessage('');
      }, 3000);
    }, 1000);
  };

  const handleResetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      setSettings({
        clinicName: 'MediCare Pro Clinic',
        clinicEmail: 'contact@medicarepro.com',
        clinicPhone: '+1 (555) 123-4567',
        clinicAddress: '123 Healthcare St, Medical City, MC 12345',
        timezone: 'America/New_York',
        dateFormat: 'MM/DD/YYYY',
        timeFormat: '12-hour',
        currency: 'USD',
        language: 'English',
      });
      
      setNotifications({
        emailNotifications: true,
        smsNotifications: true,
        appointmentReminders: true,
        prescriptionUpdates: true,
        billingAlerts: true,
        systemAlerts: true,
      });
      
      setSecurity({
        twoFactorAuth: true,
        sessionTimeout: 30,
        passwordExpiry: 90,
        ipWhitelist: false,
        auditLogging: true,
      });
      
      setTheme({
        primaryColor: '#0066cc',
        secondaryColor: '#1e293b',
        fontFamily: 'Inter',
        borderRadius: '8px',
        darkMode: false,
      });
    }
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // In a real app, you would upload this to your server
        console.log('Logo uploaded:', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: faGlobe },
    { id: 'notifications', label: 'Notifications', icon: faBell },
    { id: 'security', label: 'Security', icon: faShieldAlt },
    { id: 'theme', label: 'Theme', icon: faPalette },
    { id: 'backup', label: 'Backup', icon: faDatabase },
    { id: 'users', label: 'User Roles', icon: faUsersCog },
  ];

  return (
    <div className="system-settings">
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">System Settings</h1>
          <p className="page-subtitle">Configure your clinic management system</p>
        </div>
        <div className="header-actions">
          <button className="reset-btn" onClick={handleResetSettings}>
            Reset to Default
          </button>
          <button 
            className="save-btn" 
            onClick={handleSaveSettings}
            disabled={isSaving}
          >
            {isSaving ? (
              'Saving...'
            ) : (
              <>
                <FontAwesomeIcon icon={faSave} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {saveMessage && (
        <div className="save-message success">
          {saveMessage}
        </div>
      )}

      <div className="settings-container">
        <div className="settings-sidebar">
          <div className="sidebar-header">
            <h3>Settings</h3>
          </div>
          <nav className="settings-nav">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <FontAwesomeIcon icon={tab.icon} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="settings-content">
          {activeTab === 'general' && (
            <div className="settings-section">
              <h3 className="section-title">
                <FontAwesomeIcon icon={faGlobe} />
                General Settings
              </h3>
              
              <div className="settings-group">
                <h4>Clinic Information</h4>
                <div className="settings-grid">
                  <div className="setting-item">
                    <label>Clinic Name</label>
                    <input
                      type="text"
                      value={settings.clinicName}
                      onChange={(e) => handleSettingChange('general', 'clinicName', e.target.value)}
                      placeholder="Enter clinic name"
                    />
                  </div>
                  <div className="setting-item">
                    <label>Contact Email</label>
                    <input
                      type="email"
                      value={settings.clinicEmail}
                      onChange={(e) => handleSettingChange('general', 'clinicEmail', e.target.value)}
                      placeholder="Enter contact email"
                    />
                  </div>
                  <div className="setting-item">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      value={settings.clinicPhone}
                      onChange={(e) => handleSettingChange('general', 'clinicPhone', e.target.value)}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="setting-item full-width">
                    <label>Address</label>
                    <textarea
                      value={settings.clinicAddress}
                      onChange={(e) => handleSettingChange('general', 'clinicAddress', e.target.value)}
                      placeholder="Enter clinic address"
                      rows="3"
                    />
                  </div>
                </div>
              </div>

              <div className="settings-group">
                <h4>Logo Upload</h4>
                <div className="logo-upload">
                  <div className="logo-preview">
                    <div className="logo-placeholder">MC</div>
                    <div className="logo-info">
                      <span className="logo-name">Current Logo</span>
                      <span className="logo-size">500x500px</span>
                    </div>
                  </div>
                  <label className="upload-btn">
                    <FontAwesomeIcon icon={faUpload} />
                    Upload New Logo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
              </div>

              <div className="settings-group">
                <h4>Regional Settings</h4>
                <div className="settings-grid">
                  <div className="setting-item">
                    <label>Timezone</label>
                    <select
                      value={settings.timezone}
                      onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
                    >
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                    </select>
                  </div>
                  <div className="setting-item">
                    <label>Date Format</label>
                    <select
                      value={settings.dateFormat}
                      onChange={(e) => handleSettingChange('general', 'dateFormat', e.target.value)}
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div className="setting-item">
                    <label>Time Format</label>
                    <select
                      value={settings.timeFormat}
                      onChange={(e) => handleSettingChange('general', 'timeFormat', e.target.value)}
                    >
                      <option value="12-hour">12-hour</option>
                      <option value="24-hour">24-hour</option>
                    </select>
                  </div>
                  <div className="setting-item">
                    <label>Currency</label>
                    <select
                      value={settings.currency}
                      onChange={(e) => handleSettingChange('general', 'currency', e.target.value)}
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="CAD">CAD ($)</option>
                    </select>
                  </div>
                  <div className="setting-item">
                    <label>Language</label>
                    <select
                      value={settings.language}
                      onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="settings-section">
              <h3 className="section-title">
                <FontAwesomeIcon icon={faBell} />
                Notification Settings
              </h3>
              
              <div className="settings-group">
                <h4>Notification Channels</h4>
                <div className="toggle-grid">
                  <div className="toggle-item">
                    <div className="toggle-info">
                      <span className="toggle-label">Email Notifications</span>
                      <span className="toggle-description">Receive system notifications via email</span>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={notifications.emailNotifications}
                        onChange={(e) => handleSettingChange('notifications', 'emailNotifications', e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="toggle-item">
                    <div className="toggle-info">
                      <span className="toggle-label">SMS Notifications</span>
                      <span className="toggle-description">Receive important alerts via SMS</span>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={notifications.smsNotifications}
                        onChange={(e) => handleSettingChange('notifications', 'smsNotifications', e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="settings-group">
                <h4>Notification Types</h4>
                <div className="toggle-grid">
                  <div className="toggle-item">
                    <div className="toggle-info">
                      <span className="toggle-label">Appointment Reminders</span>
                      <span className="toggle-description">Notify patients about upcoming appointments</span>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={notifications.appointmentReminders}
                        onChange={(e) => handleSettingChange('notifications', 'appointmentReminders', e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="toggle-item">
                    <div className="toggle-info">
                      <span className="toggle-label">Prescription Updates</span>
                      <span className="toggle-description">Notify about new prescriptions and renewals</span>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={notifications.prescriptionUpdates}
                        onChange={(e) => handleSettingChange('notifications', 'prescriptionUpdates', e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="toggle-item">
                    <div className="toggle-info">
                      <span className="toggle-label">Billing Alerts</span>
                      <span className="toggle-description">Send billing notifications and payment reminders</span>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={notifications.billingAlerts}
                        onChange={(e) => handleSettingChange('notifications', 'billingAlerts', e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="toggle-item">
                    <div className="toggle-info">
                      <span className="toggle-label">System Alerts</span>
                      <span className="toggle-description">Receive system maintenance and update alerts</span>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={notifications.systemAlerts}
                        onChange={(e) => handleSettingChange('notifications', 'systemAlerts', e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="settings-section">
              <h3 className="section-title">
                <FontAwesomeIcon icon={faShieldAlt} />
                Security Settings
              </h3>
              
              <div className="settings-group">
                <h4>Authentication</h4>
                <div className="toggle-grid">
                  <div className="toggle-item">
                    <div className="toggle-info">
                      <span className="toggle-label">Two-Factor Authentication</span>
                      <span className="toggle-description">Require 2FA for all admin accounts</span>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={security.twoFactorAuth}
                        onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="toggle-item">
                    <div className="toggle-info">
                      <span className="toggle-label">IP Whitelist</span>
                      <span className="toggle-description">Restrict access to specific IP addresses</span>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={security.ipWhitelist}
                        onChange={(e) => handleSettingChange('security', 'ipWhitelist', e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="toggle-item">
                    <div className="toggle-info">
                      <span className="toggle-label">Audit Logging</span>
                      <span className="toggle-description">Log all system activities and changes</span>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={security.auditLogging}
                        onChange={(e) => handleSettingChange('security', 'auditLogging', e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="settings-group">
                <h4>Session Management</h4>
                <div className="settings-grid">
                  <div className="setting-item">
                    <label>Session Timeout (minutes)</label>
                    <input
                      type="number"
                      min="5"
                      max="240"
                      value={security.sessionTimeout}
                      onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                    />
                    <span className="input-help">Automatic logout after inactivity</span>
                  </div>
                  <div className="setting-item">
                    <label>Password Expiry (days)</label>
                    <input
                      type="number"
                      min="1"
                      max="365"
                      value={security.passwordExpiry}
                      onChange={(e) => handleSettingChange('security', 'passwordExpiry', parseInt(e.target.value))}
                    />
                    <span className="input-help">Force password change after expiry</span>
                  </div>
                </div>
              </div>

              <div className="settings-group">
                <h4>Password Policy</h4>
                <div className="password-policy">
                  <div className="policy-rule active">
                    <FontAwesomeIcon icon={faLock} />
                    <span>Minimum 8 characters</span>
                  </div>
                  <div className="policy-rule active">
                    <FontAwesomeIcon icon={faLock} />
                    <span>At least one uppercase letter</span>
                  </div>
                  <div className="policy-rule active">
                    <FontAwesomeIcon icon={faLock} />
                    <span>At least one number</span>
                  </div>
                  <div className="policy-rule active">
                    <FontAwesomeIcon icon={faLock} />
                    <span>At least one special character</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'theme' && (
            <div className="settings-section">
              <h3 className="section-title">
                <FontAwesomeIcon icon={faPalette} />
                Theme Settings
              </h3>
              
              <div className="settings-group">
                <h4>Color Scheme</h4>
                <div className="color-picker-grid">
                  <div className="color-picker">
                    <label>Primary Color</label>
                    <div className="color-input-group">
                      <input
                        type="color"
                        value={theme.primaryColor}
                        onChange={(e) => handleSettingChange('theme', 'primaryColor', e.target.value)}
                      />
                      <input
                        type="text"
                        value={theme.primaryColor}
                        onChange={(e) => handleSettingChange('theme', 'primaryColor', e.target.value)}
                        className="color-value"
                      />
                    </div>
                  </div>
                  <div className="color-picker">
                    <label>Secondary Color</label>
                    <div className="color-input-group">
                      <input
                        type="color"
                        value={theme.secondaryColor}
                        onChange={(e) => handleSettingChange('theme', 'secondaryColor', e.target.value)}
                      />
                      <input
                        type="text"
                        value={theme.secondaryColor}
                        onChange={(e) => handleSettingChange('theme', 'secondaryColor', e.target.value)}
                        className="color-value"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="settings-group">
                <h4>Appearance</h4>
                <div className="settings-grid">
                  <div className="setting-item">
                    <label>Font Family</label>
                    <select
                      value={theme.fontFamily}
                      onChange={(e) => handleSettingChange('theme', 'fontFamily', e.target.value)}
                    >
                      <option value="Inter">Inter</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Open Sans">Open Sans</option>
                      <option value="Montserrat">Montserrat</option>
                      <option value="Poppins">Poppins</option>
                    </select>
                  </div>
                  <div className="setting-item">
                    <label>Border Radius</label>
                    <select
                      value={theme.borderRadius}
                      onChange={(e) => handleSettingChange('theme', 'borderRadius', e.target.value)}
                    >
                      <option value="4px">Small (4px)</option>
                      <option value="8px">Medium (8px)</option>
                      <option value="12px">Large (12px)</option>
                      <option value="16px">Extra Large (16px)</option>
                    </select>
                  </div>
                  <div className="setting-item">
                    <label>Dark Mode</label>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={theme.darkMode}
                        onChange={(e) => handleSettingChange('theme', 'darkMode', e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="settings-group">
                <h4>Theme Preview</h4>
                <div className="theme-preview">
                  <div className="preview-card" style={{
                    backgroundColor: theme.secondaryColor,
                    color: '#fff',
                    borderRadius: theme.borderRadius,
                  }}>
                    <div className="preview-header" style={{
                      backgroundColor: theme.primaryColor,
                      borderRadius: `${theme.borderRadius} ${theme.borderRadius} 0 0`,
                    }}>
                      <h4>Preview Card</h4>
                    </div>
                    <div className="preview-content">
                      <p>This is how your theme will look with the selected colors.</p>
                      <button className="preview-btn" style={{
                        backgroundColor: theme.primaryColor,
                        borderRadius: theme.borderRadius,
                      }}>
                        Sample Button
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'backup' && (
            <div className="settings-section">
              <h3 className="section-title">
                <FontAwesomeIcon icon={faDatabase} />
                Backup & Restore
              </h3>
              
              <div className="settings-group">
                <h4>Backup Settings</h4>
                <div className="backup-info">
                  <div className="backup-stats">
                    <div className="stat-item">
                      <span className="stat-label">Last Backup</span>
                      <span className="stat-value">Jan 19, 2024 02:00 AM</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Backup Size</span>
                      <span className="stat-value">245 MB</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Next Backup</span>
                      <span className="stat-value">Jan 20, 2024 02:00 AM</span>
                    </div>
                  </div>
                </div>
                
                <div className="backup-actions">
                  <button className="backup-btn primary">
                    <FontAwesomeIcon icon={faDatabase} />
                    Create Backup Now
                  </button>
                  <button className="backup-btn secondary">
                    Restore from Backup
                  </button>
                </div>
              </div>

              <div className="settings-group">
                <h4>Backup Schedule</h4>
                <div className="schedule-settings">
                  <div className="schedule-item">
                    <label>Frequency</label>
                    <select defaultValue="daily">
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <div className="schedule-item">
                    <label>Time</label>
                    <input type="time" defaultValue="02:00" />
                  </div>
                  <div className="schedule-item">
                    <label>Retention Period</label>
                    <select defaultValue="30">
                      <option value="7">7 days</option>
                      <option value="30">30 days</option>
                      <option value="90">90 days</option>
                      <option value="365">1 year</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="settings-section">
              <h3 className="section-title">
                <FontAwesomeIcon icon={faUsersCog} />
                User Roles & Permissions
              </h3>
              
              <div className="settings-group">
                <h4>Role Management</h4>
                <div className="roles-list">
                  <div className="role-item">
                    <div className="role-header">
                      <h5>Administrator</h5>
                      <span className="role-users">5 users</span>
                    </div>
                    <p className="role-description">Full access to all system features and settings</p>
                    <div className="role-permissions">
                      <span className="permission-tag">All Permissions</span>
                    </div>
                  </div>
                  <div className="role-item">
                    <div className="role-header">
                      <h5>Doctor</h5>
                      <span className="role-users">12 users</span>
                    </div>
                    <p className="role-description">Can manage patients, appointments, and prescriptions</p>
                    <div className="role-permissions">
                      <span className="permission-tag">View Patients</span>
                      <span className="permission-tag">Manage Appointments</span>
                      <span className="permission-tag">Write Prescriptions</span>
                    </div>
                  </div>
                  <div className="role-item">
                    <div className="role-header">
                      <h5>Receptionist</h5>
                      <span className="role-users">8 users</span>
                    </div>
                    <p className="role-description">Can schedule appointments and manage patient records</p>
                    <div className="role-permissions">
                      <span className="permission-tag">Schedule Appointments</span>
                      <span className="permission-tag">View Patient Info</span>
                      <span className="permission-tag">Billing Access</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="settings-group">
                <h4>Add New Role</h4>
                <div className="new-role-form">
                  <input
                    type="text"
                    placeholder="Role Name"
                    className="role-input"
                  />
                  <button className="add-role-btn">
                    Add Role
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;