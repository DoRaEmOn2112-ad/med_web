import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faPlus, faEdit, faTrash, faEye, faDownload } from '@fortawesome/free-solid-svg-icons';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Smith', email: 'john@example.com', role: 'Patient', status: 'Active', joinDate: '2024-01-15', lastActive: '2 hours ago' },
    { id: 2, name: 'Emma Wilson', email: 'emma@example.com', role: 'Patient', status: 'Active', joinDate: '2024-01-10', lastActive: '1 day ago' },
    { id: 3, name: 'Robert Chen', email: 'robert@example.com', role: 'Doctor', status: 'Pending', joinDate: '2024-01-05', lastActive: '3 days ago' },
    { id: 4, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Admin', status: 'Active', joinDate: '2023-12-20', lastActive: 'Just now' },
    { id: 5, name: 'Mike Brown', email: 'mike@example.com', role: 'Patient', status: 'Inactive', joinDate: '2023-12-15', lastActive: '1 week ago' },
    { id: 6, name: 'Lisa Wong', email: 'lisa@example.com', role: 'Doctor', status: 'Active', joinDate: '2023-12-10', lastActive: '2 hours ago' },
    { id: 7, name: 'David Kim', email: 'david@example.com', role: 'Patient', status: 'Active', joinDate: '2023-12-05', lastActive: '5 hours ago' },
    { id: 8, name: 'Anna Garcia', email: 'anna@example.com', role: 'Patient', status: 'Suspended', joinDate: '2023-11-30', lastActive: '2 weeks ago' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Patient',
    status: 'Active'
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'All' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'All' || user.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const newUserWithId = {
      ...newUser,
      id: users.length + 1,
      joinDate: new Date().toISOString().split('T')[0],
      lastActive: 'Just now'
    };
    setUsers([...users, newUserWithId]);
    setShowAddModal(false);
    setNewUser({ name: '', email: '', role: 'Patient', status: 'Active' });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return '#10b981';
      case 'Pending': return '#f59e0b';
      case 'Inactive': return '#64748b';
      case 'Suspended': return '#ef4444';
      default: return '#64748b';
    }
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'Admin': return '#8b5cf6';
      case 'Doctor': return '#0066cc';
      case 'Patient': return '#059669';
      default: return '#64748b';
    }
  };

  return (
    <div className="user-management">
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">User Management</h1>
          <p className="page-subtitle">Manage all users in the system</p>
        </div>
        <div className="header-actions">
          <button className="export-btn">
            <FontAwesomeIcon icon={faDownload} />
            Export CSV
          </button>
          <button className="add-btn" onClick={() => setShowAddModal(true)}>
            <FontAwesomeIcon icon={faPlus} />
            Add User
          </button>
        </div>
      </div>

      <div className="controls-section">
        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-controls">
          <div className="filter-group">
            <FontAwesomeIcon icon={faFilter} />
            <select 
              className="filter-select"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="All">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Doctor">Doctor</option>
              <option value="Patient">Patient</option>
            </select>
          </div>
          <div className="filter-group">
            <FontAwesomeIcon icon={faFilter} />
            <select 
              className="filter-select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#0066cc20' }}>
            👥
          </div>
          <div className="stat-content">
            <h3>{users.length}</h3>
            <p>Total Users</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#10b98120' }}>
            ✓
          </div>
          <div className="stat-content">
            <h3>{users.filter(u => u.status === 'Active').length}</h3>
            <p>Active Users</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#f59e0b20' }}>
            ⏳
          </div>
          <div className="stat-content">
            <h3>{users.filter(u => u.status === 'Pending').length}</h3>
            <p>Pending Users</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#8b5cf620' }}>
            ⚕️
          </div>
          <div className="stat-content">
            <h3>{users.filter(u => u.role === 'Doctor').length}</h3>
            <p>Doctors</p>
          </div>
        </div>
      </div>

      <div className="users-table-container">
        <div className="table-responsive">
          <table className="users-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Join Date</th>
                <th>Last Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">
                        {user.name.charAt(0)}
                      </div>
                      <div className="user-details">
                        <strong>{user.name}</strong>
                        <span>{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="role-badge" style={{ background: getRoleColor(user.role) }}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span className="status-badge" style={{ background: getStatusColor(user.status) }}>
                      {user.status}
                    </span>
                  </td>
                  <td>{user.joinDate}</td>
                  <td>{user.lastActive}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn view" title="View">
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button className="action-btn edit" title="Edit">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button 
                        className="action-btn delete" 
                        title="Delete"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredUsers.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">👤</div>
            <h3>No users found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add New User</h2>
              <button className="close-btn" onClick={() => setShowAddModal(false)}>×</button>
            </div>
            <form onSubmit={handleAddUser}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  required
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  placeholder="Enter full name"
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  placeholder="Enter email address"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  >
                    <option value="Patient">Patient</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={newUser.status}
                    onChange={(e) => setNewUser({...newUser, status: e.target.value})}
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;