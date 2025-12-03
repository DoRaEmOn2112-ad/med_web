// src/Admin/AdminSidebar/Metarial/User Management/UserManagement.js
import React, { useState } from 'react';
import './UserManegement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@email.com', role: 'Patient', status: 'Active', joinDate: '2023-01-15', lastLogin: '2 hours ago' },
    { id: 2, name: 'Dr. Sarah Johnson', email: 'sarah@hospital.com', role: 'Doctor', status: 'Active', joinDate: '2022-11-20', lastLogin: '5 hours ago' },
    { id: 3, name: 'Jane Smith', email: 'jane@email.com', role: 'Patient', status: 'Inactive', joinDate: '2023-02-10', lastLogin: '2 days ago' },
    { id: 4, name: 'Dr. Mike Chen', email: 'mike@hospital.com', role: 'Doctor', status: 'Active', joinDate: '2022-09-15', lastLogin: '1 hour ago' },
    { id: 5, name: 'Bob Wilson', email: 'bob@email.com', role: 'Patient', status: 'Pending', joinDate: '2023-03-05', lastLogin: 'Never' },
    { id: 6, name: 'Admin User', email: 'admin@medicare.com', role: 'Admin', status: 'Active', joinDate: '2022-01-01', lastLogin: '30 mins ago' },
    { id: 7, name: 'Emily Davis', email: 'emily@email.com', role: 'Patient', status: 'Active', joinDate: '2023-01-25', lastLogin: '8 hours ago' },
    { id: 8, name: 'Dr. Robert Brown', email: 'robert@hospital.com', role: 'Doctor', status: 'Suspended', joinDate: '2022-12-10', lastLogin: '1 week ago' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Patient',
    status: 'Active'
  });

  const roles = ['All', 'Patient', 'Doctor', 'Admin'];
  const statuses = ['All', 'Active', 'Inactive', 'Pending', 'Suspended'];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'All' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'All' || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    const user = {
      id: users.length + 1,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: newUser.status,
      joinDate: new Date().toISOString().split('T')[0],
      lastLogin: 'Never'
    };
    setUsers([...users, user]);
    setNewUser({ name: '', email: '', role: 'Patient', status: 'Active' });
    setShowAddUserModal(false);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    setUsers(users.map(u => u.id === selectedUser.id ? selectedUser : u));
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: newStatus } : user
    ));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'status-active';
      case 'Inactive': return 'status-inactive';
      case 'Pending': return 'status-pending';
      case 'Suspended': return 'status-suspended';
      default: return '';
    }
  };

  const getRoleIcon = (role) => {
    switch(role) {
      case 'Admin': return 'fas fa-user-shield';
      case 'Doctor': return 'fas fa-user-md';
      case 'Patient': return 'fas fa-user-injured';
      default: return 'fas fa-user';
    }
  };

  return (
    <div className="user-management-container">
      <div className="management-header">
        <div className="header-left">
          <h2>User Management</h2>
          <p>Manage all users in the system</p>
        </div>
        <div className="header-actions">
          <button 
            className="btn-add-user"
            onClick={() => setShowAddUserModal(true)}
          >
            <i className="fas fa-user-plus"></i>
            Add New User
          </button>
          <button className="btn-export">
            <i className="fas fa-file-export"></i>
            Export Users
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="management-filters">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-controls">
          <div className="filter-group">
            <label>Filter by Role:</label>
            <select 
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Filter by Status:</label>
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div className="stats-summary">
            <span className="stat">
              <strong>{filteredUsers.length}</strong> users found
            </span>
            <span className="stat">
              <strong>{users.filter(u => u.status === 'Active').length}</strong> active
            </span>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="users-table-container">
        <div className="table-responsive">
          <table className="users-table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Join Date</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">
                        <i className={getRoleIcon(user.role)}></i>
                      </div>
                      <div className="user-details">
                        <h4>{user.name}</h4>
                        <p>{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={`role-badge role-${user.role.toLowerCase()}`}>
                      {user.role}
                    </div>
                  </td>
                  <td>
                    <div className={`status-badge ${getStatusColor(user.status)}`}>
                      {user.status}
                    </div>
                  </td>
                  <td>{user.joinDate}</td>
                  <td>{user.lastLogin}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-action edit"
                        onClick={() => handleEditUser(user)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        className="btn-action delete"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                      <select 
                        className="status-select"
                        value={user.status}
                        onChange={(e) => handleStatusChange(user.id, e.target.value)}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Pending">Pending</option>
                        <option value="Suspended">Suspended</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="empty-state">
            <i className="fas fa-users-slash"></i>
            <h3>No Users Found</h3>
            <p>Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button className="btn-prev">
          <i className="fas fa-chevron-left"></i>
          Previous
        </button>
        <div className="page-numbers">
          <span className="page-number active">1</span>
          <span className="page-number">2</span>
          <span className="page-number">3</span>
          <span className="page-number">...</span>
          <span className="page-number">10</span>
        </div>
        <button className="btn-next">
          Next
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add New User</h3>
              <button 
                className="close-btn"
                onClick={() => setShowAddUserModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleAddUser}>
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  required
                  placeholder="Enter full name"
                />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  required
                  placeholder="Enter email address"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Role *</label>
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
                  <label>Status *</label>
                  <select
                    value={newUser.status}
                    onChange={(e) => setNewUser({...newUser, status: e.target.value})}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
              <div className="modal-actions">
                <button 
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowAddUserModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Edit User</h3>
              <button 
                className="close-btn"
                onClick={() => setShowEditModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleUpdateUser}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Role</label>
                  <select
                    value={selectedUser.role}
                    onChange={(e) => setSelectedUser({...selectedUser, role: e.target.value})}
                  >
                    <option value="Patient">Patient</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={selectedUser.status}
                    onChange={(e) => setSelectedUser({...selectedUser, status: e.target.value})}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>
              <div className="modal-actions">
                <button 
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Update User
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