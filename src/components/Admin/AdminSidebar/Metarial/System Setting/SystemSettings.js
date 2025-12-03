import React, { useState } from 'react';
import './SystemSettings.css';

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      clinicName: 'MediCare Pro Hospital',
      timezone: 'UTC-05:00 (Eastern Time)',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12-hour',
      language: 'English',
      maxAppointmentsPerDay: 50,
      appointmentDuration: 30,
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: true,
      appointmentReminders: true,
      billingReminders: true,
      systemAlerts: true,
      dailyReports: false,
      weeklyReports: true,
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      passwordExpiry: 90,
      ipWhitelist: ['192.168.1.1', '192.168.1.100'],
      loginAttempts: 5,
      auditLogging: true,
    },
    integrations: {
      emrSystem: 'Epic Systems',
      billingSoftware: 'QuickBooks',
      labIntegration: true,
      pharmacyIntegration: true,
      apiAccess: true,
      webhookUrl: 'https://api.medicarepro.com/webhook',
    },
    backup: {
      autoBackup: true,
      backupFrequency: 'Daily',
      backupTime: '02:00',
      retentionPeriod: 30,
      backupLocation: 'Cloud (AWS S3)',
      lastBackup: '2024-03-19 02:15 AM',
    }
  });

  const [systemHealth, setSystemHealth] = useState({
    database: { status: 'healthy', size: '2.4 GB', usage: '65%' },
    storage: { status: 'warning', size: '45 GB', usage: '85%' },
    memory: { status: 'healthy', usage: '4.2 GB', usagePercent: '42%' },
    cpu: { status: 'healthy', usage: '28%', load: '2.4' },
    network: { status: 'healthy', latency: '45ms', uptime: '99.9%' },
  });

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    // In real app, this would save to backend
    alert('Settings saved successfully!');
  };

  const handleResetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      // Reset logic
      alert('Settings reset to default values');
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: 'fas fa-cog' },
    { id: 'notifications', label: 'Notifications', icon: 'fas fa-bell' },
    { id: 'security', label: 'Security', icon: 'fas fa-shield-alt' },
    { id: 'integrations', label: 'Integrations', icon: 'fas fa-plug' },
    { id: 'backup', label: 'Backup', icon: 'fas fa-database' },
    { id: 'health', label: 'System Health', icon: 'fas fa-heartbeat' },
  ];

  const renderGeneralSettings = () => (
    <div className="settings-form">
      <div className="form-group">
        <label>Clinic/Hospital Name</label>
        <input 
          type="text" 
          value={settings.general.clinicName}
          onChange={(e) => handleSettingChange('general', 'clinicName', e.target.value)}
        />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Timezone</label>
          <select 
            value={settings.general.timezone}
            onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
          >
            <option>UTC-05:00 (Eastern Time)</option>
            <option>UTC-08:00 (Pacific Time)</option>
            <option>UTC+00:00 (GMT)</option>
          </select>
        </div>
        <div className="form-group">
          <label>Date Format</label>
          <select 
            value={settings.general.dateFormat}
            onChange={(e) => handleSettingChange('general', 'dateFormat', e.target.value)}
          >
            <option>MM/DD/YYYY</option>
            <option>DD/MM/YYYY</option>
            <option>YYYY-MM-DD</option>
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Time Format</label>
          <select 
            value={settings.general.timeFormat}
            onChange={(e) => handleSettingChange('general', 'timeFormat', e.target.value)}
          >
            <option>12-hour</option>
            <option>24-hour</option>
          </select>
        </div>
        <div className="form-group">
          <label>Language</label>
          <select 
            value={settings.general.language}
            onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
          >
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Max Appointments Per Day</label>
          <input 
            type="number" 
            value={settings.general.maxAppointmentsPerDay}
            onChange={(e) => handleSettingChange('general', 'maxAppointmentsPerDay', e.target.value)}
            min="1"
            max="100"
          />
        </div>
        <div className="form-group">
          <label>Default Appointment Duration (minutes)</label>
          <input 
            type="number" 
            value={settings.general.appointmentDuration}
            onChange={(e) => handleSettingChange('general', 'appointmentDuration', e.target.value)}
            min="5"
            max="120"
          />
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="settings-form">
      <div className="settings-group">
        <h4>Notification Channels</h4>
        <div className="toggle-group">
          <div className="toggle-item">
            <label>Email Notifications</label>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={settings.notifications.emailNotifications}
                onChange={(e) => handleSettingChange('notifications', 'emailNotifications', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="toggle-item">
            <label>SMS Notifications</label>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={settings.notifications.smsNotifications}
                onChange={(e) => handleSettingChange('notifications', 'smsNotifications', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="settings-group">
        <h4>Notification Types</h4>
        <div className="toggle-group">
          <div className="toggle-item">
            <label>Appointment Reminders</label>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={settings.notifications.appointmentReminders}
                onChange={(e) => handleSettingChange('notifications', 'appointmentReminders', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="toggle-item">
            <label>Billing Reminders</label>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={settings.notifications.billingReminders}
                onChange={(e) => handleSettingChange('notifications', 'billingReminders', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="toggle-item">
            <label>System Alerts</label>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={settings.notifications.systemAlerts}
                onChange={(e) => handleSettingChange('notifications', 'systemAlerts', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="settings-group">
        <h4>Reports</h4>
        <div className="toggle-group">
          <div className="toggle-item">
            <label>Daily Reports</label>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={settings.notifications.dailyReports}
                onChange={(e) => handleSettingChange('notifications', 'dailyReports', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="toggle-item">
            <label>Weekly Reports</label>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={settings.notifications.weeklyReports}
                onChange={(e) => handleSettingChange('notifications', 'weeklyReports', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="settings-form">
      <div className="settings-group">
        <h4>Authentication</h4>
        <div className="toggle-item">
          <label>Two-Factor Authentication</label>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={settings.security.twoFactorAuth}
              onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Session Timeout (minutes)</label>
            <input 
              type="number" 
              value={settings.security.sessionTimeout}
              onChange={(e) => handleSettingChange('security', 'sessionTimeout', e.target.value)}
              min="5"
              max="240"
            />
          </div>
          <div className="form-group">
            <label>Password Expiry (days)</label>
            <input 
              type="number" 
              value={settings.security.passwordExpiry}
              onChange={(e) => handleSettingChange('security', 'passwordExpiry', e.target.value)}
              min="1"
              max="365"
            />
          </div>
        </div>
      </div>

      <div className="settings-group">
        <h4>Access Control</h4>
        <div className="form-group">
          <label>IP Whitelist (comma-separated)</label>
          <input 
            type="text" 
            value={settings.security.ipWhitelist.join(', ')}
            onChange={(e) => handleSettingChange('security', 'ipWhitelist', e.target.value.split(',').map(ip => ip.trim()))}
            placeholder="192.168.1.1, 192.168.1.100"
          />
        </div>
        <div className="form-group">
          <label>Max Login Attempts</label>
          <input 
            type="number" 
            value={settings.security.loginAttempts}
            onChange={(e) => handleSettingChange('security', 'loginAttempts', e.target.value)}
            min="1"
            max="10"
          />
        </div>
      </div>

      <div className="settings-group">
        <h4>Audit & Logging</h4>
        <div className="toggle-item">
          <label>Audit Logging</label>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={settings.security.auditLogging}
              onChange={(e) => handleSettingChange('security', 'auditLogging', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
        <button className="btn-secondary">
          <i className="fas fa-history"></i> View Audit Logs
        </button>
      </div>
    </div>
  );

  const renderSystemHealth = () => (
    <div className="system-health-dashboard">
      <div className="health-metrics">
        {Object.entries(systemHealth).map(([key, metric]) => (
          <div key={key} className={`health-metric ${metric.status}`}>
            <div className="metric-header">
              <h4>{key.toUpperCase()}</h4>
              <span className={`status-badge ${metric.status}`}>
                {metric.status}
              </span>
            </div>
            <div className="metric-details">
              <div className="metric-bar">
                <div 
                  className="metric-fill"
                  style={{ width: `${metric.usage || metric.usagePercent || 0}%` }}
                ></div>
              </div>
              <div className="metric-stats">
                {Object.entries(metric).map(([statKey, statValue]) => (
                  statKey !== 'status' && (
                    <div key={statKey} className="stat">
                      <span className="stat-key">{statKey}:</span>
                      <span className="stat-value">{statValue}</span>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="system-actions">
        <button className="btn-primary">
          <i className="fas fa-sync-alt"></i> Run System Diagnostics
        </button>
        <button className="btn-secondary">
          <i className="fas fa-download"></i> Download System Logs
        </button>
        <button className="btn-warning">
          <i className="fas fa-redo"></i> Clear Cache
        </button>
        <button className="btn-danger">
          <i className="fas fa-broom"></i> Purge Old Data
        </button>
      </div>

      <div className="system-info">
        <h4>System Information</h4>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Version</span>
            <span className="info-value">v2.4.1</span>
          </div>
          <div className="info-item">
            <span className="info-label">Last Updated</span>
            <span className="info-value">2024-03-15</span>
          </div>
          <div className="info-item">
            <span className="info-label">Uptime</span>
            <span className="info-value">99.9%</span>
          </div>
          <div className="info-item">
            <span className="info-label">Database Size</span>
            <span className="info-value">2.4 GB</span>
          </div>
          <div className="info-item">
            <span className="info-label">Active Users</span>
            <span className="info-value">142</span>
          </div>
          <div className="info-item">
            <span className="info-label">API Requests (24h)</span>
            <span className="info-value">12,847</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch(activeTab) {
      case 'general': return renderGeneralSettings();
      case 'notifications': return renderNotificationSettings();
      case 'security': return renderSecuritySettings();
      case 'health': return renderSystemHealth();
      default: return renderGeneralSettings();
    }
  };

  return (
    <div className="system-settings-container">
      <div className="section-header">
        <div>
          <h2>System Settings</h2>
          <p>Configure system preferences, security, and integrations</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={handleResetSettings}>
            <i className="fas fa-undo"></i> Reset to Default
          </button>
          <button className="btn-primary" onClick={handleSaveSettings}>
            <i className="fas fa-save"></i> Save Changes
          </button>
        </div>
      </div>

      <div className="settings-layout">
        {/* Settings Tabs */}
        <div className="settings-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <i className={tab.icon}></i>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="settings-content">
          {renderTabContent()}
        </div>
      </div>

      {/* System Status Bar */}
      <div className="system-status-bar">
        <div className="status-item">
          <div className="status-indicator online"></div>
          <span>System: Online</span>
        </div>
        <div className="status-item">
          <div className="status-indicator healthy"></div>
          <span>Database: Healthy</span>
        </div>
        <div className="status-item">
          <div className="status-indicator warning"></div>
          <span>Storage: 85% used</span>
        </div>
        <div className="status-item">
          <i className="fas fa-shield-alt"></i>
          <span>Security: Active</span>
        </div>
        <div className="status-item">
          <i className="fas fa-cloud"></i>
          <span>Backup: Enabled</span>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;