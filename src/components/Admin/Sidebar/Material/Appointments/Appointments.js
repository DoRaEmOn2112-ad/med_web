import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faCalendarPlus, faCheck, faTimes, faClock, faUserMd, faCalendarAlt, faSort } from '@fortawesome/free-solid-svg-icons';
import './Appointments.css';

const Appointments = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, patient: 'John Smith', doctor: 'Dr. Sarah Johnson', time: '2024-01-20 09:00 AM', type: 'Consultation', status: 'Confirmed', duration: '30 mins' },
    { id: 2, patient: 'Emma Wilson', doctor: 'Dr. Michael Chen', time: '2024-01-20 10:30 AM', type: 'Follow-up', status: 'Pending', duration: '45 mins' },
    { id: 3, patient: 'Robert Davis', doctor: 'Dr. Lisa Wong', time: '2024-01-20 11:15 AM', type: 'Check-up', status: 'Confirmed', duration: '60 mins' },
    { id: 4, patient: 'Mike Brown', doctor: 'Dr. James Miller', time: '2024-01-20 02:00 PM', type: 'Surgery', status: 'Cancelled', duration: '120 mins' },
    { id: 5, patient: 'Lisa Kim', doctor: 'Dr. Anna Garcia', time: '2024-01-21 09:30 AM', type: 'Consultation', status: 'Pending', duration: '30 mins' },
    { id: 6, patient: 'David Wilson', doctor: 'Dr. Robert Davis', time: '2024-01-21 11:00 AM', type: 'Therapy', status: 'Confirmed', duration: '60 mins' },
    { id: 7, patient: 'Sarah Chen', doctor: 'Dr. Emma Wilson', time: '2024-01-21 03:30 PM', type: 'Check-up', status: 'Confirmed', duration: '45 mins' },
    { id: 8, patient: 'James Johnson', doctor: 'Dr. David Kim', time: '2024-01-22 10:00 AM', type: 'Consultation', status: 'Pending', duration: '30 mins' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedDate, setSelectedDate] = useState('All');
  const [sortBy, setSortBy] = useState('time');

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || appointment.status === selectedStatus;
    const matchesDate = selectedDate === 'All' || appointment.time.startsWith(selectedDate);
    
    return matchesSearch && matchesStatus && matchesDate;
  }).sort((a, b) => {
    if (sortBy === 'time') {
      return new Date(a.time) - new Date(b.time);
    }
    if (sortBy === 'patient') {
      return a.patient.localeCompare(b.patient);
    }
    return 0;
  });

  const handleStatusChange = (id, newStatus) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: newStatus } : apt
    ));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Confirmed': return '#10b981';
      case 'Pending': return '#f59e0b';
      case 'Cancelled': return '#ef4444';
      default: return '#64748b';
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'Consultation': return '#0066cc';
      case 'Follow-up': return '#8b5cf6';
      case 'Check-up': return '#059669';
      case 'Surgery': return '#dc2626';
      case 'Therapy': return '#d97706';
      default: return '#64748b';
    }
  };

  const dates = [...new Set(appointments.map(apt => apt.time.split(' ')[0]))];

  return (
    <div className="appointments-management">
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">Appointments</h1>
          <p className="page-subtitle">Manage and schedule patient appointments</p>
        </div>
        <div className="header-actions">
          <button className="schedule-btn">
            <FontAwesomeIcon icon={faCalendarPlus} />
            Schedule New
          </button>
        </div>
      </div>

      <div className="appointments-overview">
        <div className="overview-card">
          <div className="overview-icon" style={{ background: '#f59e0b20' }}>
            <FontAwesomeIcon icon={faClock} style={{ color: '#f59e0b' }} />
          </div>
          <div className="overview-content">
            <h3>{appointments.filter(a => a.status === 'Pending').length}</h3>
            <p>Pending Appointments</p>
          </div>
        </div>
        <div className="overview-card">
          <div className="overview-icon" style={{ background: '#10b98120' }}>
            <FontAwesomeIcon icon={faCheck} style={{ color: '#10b981' }} />
          </div>
          <div className="overview-content">
            <h3>{appointments.filter(a => a.status === 'Confirmed').length}</h3>
            <p>Confirmed</p>
          </div>
        </div>
        <div className="overview-card">
          <div className="overview-icon" style={{ background: '#ef444420' }}>
            <FontAwesomeIcon icon={faTimes} style={{ color: '#ef4444' }} />
          </div>
          <div className="overview-content">
            <h3>{appointments.filter(a => a.status === 'Cancelled').length}</h3>
            <p>Cancelled</p>
          </div>
        </div>
        <div className="overview-card">
          <div className="overview-icon" style={{ background: '#0066cc20' }}>
            <FontAwesomeIcon icon={faCalendarAlt} style={{ color: '#0066cc' }} />
          </div>
          <div className="overview-content">
            <h3>{appointments.length}</h3>
            <p>Total This Week</p>
          </div>
        </div>
      </div>

      <div className="controls-section">
        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search appointments..."
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
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div className="filter-group">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <select 
              className="filter-select"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              <option value="All">All Dates</option>
              {dates.map(date => (
                <option key={date} value={date}>{date}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <FontAwesomeIcon icon={faSort} />
            <select 
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="time">Sort by Time</option>
              <option value="patient">Sort by Patient</option>
            </select>
          </div>
        </div>
      </div>

      <div className="calendar-view">
        <div className="calendar-header">
          <h3>Appointments Calendar</h3>
          <div className="calendar-navigation">
            <button className="nav-btn">‹</button>
            <span className="current-week">Week of Jan 20, 2024</span>
            <button className="nav-btn">›</button>
          </div>
        </div>
        <div className="week-grid">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="day-column">
              <div className="day-header">
                <span className="day-name">{day}</span>
                <span className="day-date">20</span>
              </div>
              <div className="time-slots">
                {['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00'].map(time => (
                  <div key={time} className="time-slot">
                    <span className="time-label">{time}</span>
                    <div className="appointment-slot">
                      {appointments.find(apt => apt.time.includes(time) && apt.time.includes('Jan 20')) && (
                        <div className="calendar-appointment" style={{ 
                          background: getStatusColor(appointments.find(apt => apt.time.includes(time)).status)
                        }}>
                          <span className="apt-time">{time}</span>
                          <span className="apt-patient">Patient</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="appointments-table-container">
        <h3>Upcoming Appointments</h3>
        <div className="table-responsive">
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date & Time</th>
                <th>Type</th>
                <th>Duration</th>
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
                        {appointment.patient.charAt(0)}
                      </div>
                      <div className="patient-details">
                        <strong>{appointment.patient}</strong>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="doctor-info">
                      <FontAwesomeIcon icon={faUserMd} />
                      <span>{appointment.doctor}</span>
                    </div>
                  </td>
                  <td>
                    <div className="time-info">
                      <FontAwesomeIcon icon={faCalendarAlt} />
                      <span>{appointment.time}</span>
                    </div>
                  </td>
                  <td>
                    <span className="type-badge" style={{ background: getTypeColor(appointment.type) }}>
                      {appointment.type}
                    </span>
                  </td>
                  <td>{appointment.duration}</td>
                  <td>
                    <span className="status-badge" style={{ background: getStatusColor(appointment.status) }}>
                      {appointment.status}
                    </span>
                  </td>
                  <td>
                    <div className="appointment-actions">
                      {appointment.status === 'Pending' && (
                        <>
                          <button 
                            className="confirm-btn"
                            onClick={() => handleStatusChange(appointment.id, 'Confirmed')}
                          >
                            <FontAwesomeIcon icon={faCheck} />
                          </button>
                          <button 
                            className="cancel-btn"
                            onClick={() => handleStatusChange(appointment.id, 'Cancelled')}
                          >
                            <FontAwesomeIcon icon={faTimes} />
                          </button>
                        </>
                      )}
                      {appointment.status === 'Confirmed' && (
                        <button 
                          className="cancel-btn"
                          onClick={() => handleStatusChange(appointment.id, 'Cancelled')}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredAppointments.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📅</div>
            <h3>No appointments found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;