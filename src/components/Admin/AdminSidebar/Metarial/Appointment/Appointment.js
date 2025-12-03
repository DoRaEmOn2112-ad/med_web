import React, { useState } from 'react';
import './Appointment.css';

const Appointment = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, patient: 'John Doe', doctor: 'Dr. Sarah Johnson', time: '09:00 AM', date: '2024-03-20', status: 'Confirmed', type: 'Follow-up', department: 'Cardiology' },
    { id: 2, patient: 'Jane Smith', doctor: 'Dr. Michael Chen', time: '10:30 AM', date: '2024-03-20', status: 'Pending', type: 'Consultation', department: 'Neurology' },
    { id: 3, patient: 'Robert Brown', doctor: 'Dr. Emily Davis', time: '11:45 AM', date: '2024-03-20', status: 'Confirmed', type: 'Check-up', department: 'Pediatrics' },
    { id: 4, patient: 'Lisa Wilson', doctor: 'Dr. Robert Wilson', time: '02:15 PM', date: '2024-03-20', status: 'Completed', type: 'Surgery', department: 'Orthopedics' },
    { id: 5, patient: 'Tom Johnson', doctor: 'Dr. Jennifer Lee', time: '03:30 PM', date: '2024-03-20', status: 'Cancelled', type: 'Follow-up', department: 'Dermatology' },
    { id: 6, patient: 'Sarah Miller', doctor: 'Dr. David Kim', time: '04:45 PM', date: '2024-03-20', status: 'Confirmed', type: 'Emergency', department: 'Emergency' },
  ]);

  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [selectedDate, setSelectedDate] = useState(new Date());

  const statusOptions = ['All', 'Confirmed', 'Pending', 'Completed', 'Cancelled', 'No-show'];

  const filteredAppointments = appointments.filter(app => 
    filterStatus === 'All' || app.status === filterStatus
  );

  const handleScheduleAppointment = (e) => {
    e.preventDefault();
    // Implementation for scheduling
    setShowScheduleModal(false);
  };

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowEditModal(true);
  };

  const handleStatusChange = (id, status) => {
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, status } : app
    ));
  };

  const handleCancelAppointment = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      handleStatusChange(id, 'Cancelled');
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      'Confirmed': 'status-confirmed',
      'Pending': 'status-pending',
      'Completed': 'status-completed',
      'Cancelled': 'status-cancelled',
      'No-show': 'status-noshow'
    };
    return statusColors[status] || '';
  };

  const getAppointmentTypeIcon = (type) => {
    const icons = {
      'Follow-up': 'fas fa-redo',
      'Consultation': 'fas fa-stethoscope',
      'Check-up': 'fas fa-heartbeat',
      'Surgery': 'fas fa-syringe',
      'Emergency': 'fas fa-ambulance',
      'Lab Test': 'fas fa-flask'
    };
    return icons[type] || 'fas fa-calendar';
  };

  return (
    <div className="appointment-management-container">
      <div className="section-header">
        <div>
          <h2>Appointment Management</h2>
          <p>Schedule, track, and manage patient appointments</p>
        </div>
        <div className="header-actions">
          <button 
            className="btn-primary"
            onClick={() => setShowScheduleModal(true)}
          >
            <i className="fas fa-plus-circle"></i> Schedule Appointment
          </button>
          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <i className="fas fa-list"></i> List
            </button>
            <button 
              className={`view-btn ${viewMode === 'calendar' ? 'active' : ''}`}
              onClick={() => setViewMode('calendar')}
            >
              <i className="fas fa-calendar-alt"></i> Calendar
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="quick-stats-bar">
        <div className="stat-card">
          <div className="stat-icon confirmed">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-info">
            <span className="stat-value">24</span>
            <span className="stat-label">Today's Appointments</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon pending">
            <i className="fas fa-clock"></i>
          </div>
          <div className="stat-info">
            <span className="stat-value">8</span>
            <span className="stat-label">Pending Approval</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon cancelled">
            <i className="fas fa-times-circle"></i>
          </div>
          <div className="stat-info">
            <span className="stat-value">3</span>
            <span className="stat-label">Cancelled Today</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon upcoming">
            <i className="fas fa-calendar-day"></i>
          </div>
          <div className="stat-info">
            <span className="stat-value">156</span>
            <span className="stat-label">Upcoming This Week</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filter-group">
          <label>Filter by Status:</label>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Date Range:</label>
          <input 
            type="date" 
            value={selectedDate.toISOString().split('T')[0]}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
          />
        </div>
        <div className="filter-group">
          <label>Department:</label>
          <select>
            <option>All Departments</option>
            <option>Cardiology</option>
            <option>Neurology</option>
            <option>Pediatrics</option>
            <option>Orthopedics</option>
          </select>
        </div>
        <button className="btn-filter">
          <i className="fas fa-filter"></i> Apply Filters
        </button>
      </div>

      {/* Appointments List */}
      {viewMode === 'list' ? (
        <div className="appointments-table-container">
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date & Time</th>
                <th>Type</th>
                <th>Department</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map(appointment => (
                <tr key={appointment.id}>
                  <td>
                    <div className="patient-info">
                      <div className="patient-avatar">
                        <i className="fas fa-user"></i>
                      </div>
                      <div>
                        <strong>{appointment.patient}</strong>
                        <br />
                        <small>ID: PAT-{appointment.id.toString().padStart(4, '0')}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="doctor-info">
                      <i className="fas fa-user-md"></i>
                      <span>{appointment.doctor}</span>
                    </div>
                  </td>
                  <td>
                    <div className="datetime-cell">
                      <div className="date">{appointment.date}</div>
                      <div className="time">{appointment.time}</div>
                    </div>
                  </td>
                  <td>
                    <div className="appointment-type">
                      <i className={getAppointmentTypeIcon(appointment.type)}></i>
                      {appointment.type}
                    </div>
                  </td>
                  <td>
                    <span className="department-badge">{appointment.department}</span>
                  </td>
                  <td>
                    <span className={`status-badge ${getStatusBadge(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-action edit"
                        onClick={() => handleEditAppointment(appointment)}
                        title="Edit Appointment"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        className="btn-action confirm"
                        onClick={() => handleStatusChange(appointment.id, 'Confirmed')}
                        title="Confirm Appointment"
                      >
                        <i className="fas fa-check"></i>
                      </button>
                      <button 
                        className="btn-action cancel"
                        onClick={() => handleCancelAppointment(appointment.id)}
                        title="Cancel Appointment"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                      <button 
                        className="btn-action view"
                        title="View Details"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="calendar-view">
          {/* Calendar View Component */}
          <div className="calendar-header">
            <button className="nav-btn">
              <i className="fas fa-chevron-left"></i>
            </button>
            <h3>March 2024</h3>
            <button className="nav-btn">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
          <div className="calendar-grid">
            {/* Calendar days would be rendered here */}
            <div className="calendar-placeholder">
              <i className="fas fa-calendar-alt"></i>
              <p>Calendar View</p>
              <small>Click on days to view appointments</small>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Appointment Modal */}
      {showScheduleModal && (
        <div className="modal-overlay">
          <div className="modal appointment-modal">
            <div className="modal-header">
              <h3>Schedule New Appointment</h3>
              <button 
                className="close-btn"
                onClick={() => setShowScheduleModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleScheduleAppointment}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Patient *</label>
                  <select required>
                    <option value="">Select Patient</option>
                    <option>John Doe</option>
                    <option>Jane Smith</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Doctor *</label>
                  <select required>
                    <option value="">Select Doctor</option>
                    <option>Dr. Sarah Johnson</option>
                    <option>Dr. Michael Chen</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Date *</label>
                  <input type="date" required />
                </div>
                <div className="form-group">
                  <label>Time *</label>
                  <input type="time" required />
                </div>
                <div className="form-group">
                  <label>Appointment Type</label>
                  <select>
                    <option>Consultation</option>
                    <option>Follow-up</option>
                    <option>Check-up</option>
                    <option>Emergency</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <select>
                    <option>Cardiology</option>
                    <option>Neurology</option>
                    <option>Pediatrics</option>
                  </select>
                </div>
                <div className="form-group full-width">
                  <label>Notes</label>
                  <textarea 
                    placeholder="Add any notes or special instructions..."
                    rows="3"
                  ></textarea>
                </div>
              </div>
              <div className="modal-actions">
                <button 
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowScheduleModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Schedule Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Appointment Modal */}
      {showEditModal && selectedAppointment && (
        <div className="modal-overlay">
          <div className="modal">
            {/* Similar to schedule modal but for editing */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;