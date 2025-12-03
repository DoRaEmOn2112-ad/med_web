import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faPlus, faEdit, faTrash, faEye, faStar, faCalendar, faClock } from '@fortawesome/free-solid-svg-icons';
import './DoctorManagement.css';

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology', experience: '12 years', rating: 4.8, patients: 1240, status: 'Available', schedule: 'Mon-Fri', email: 'sarah@clinic.com' },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Neurology', experience: '8 years', rating: 4.6, patients: 890, status: 'On Leave', schedule: 'Tue-Thu', email: 'michael@clinic.com' },
    { id: 3, name: 'Dr. Lisa Wong', specialty: 'Pediatrics', experience: '15 years', rating: 4.9, patients: 2100, status: 'Available', schedule: 'Mon-Sat', email: 'lisa@clinic.com' },
    { id: 4, name: 'Dr. Robert Davis', specialty: 'Orthopedics', experience: '10 years', rating: 4.7, patients: 1560, status: 'Busy', schedule: 'Mon-Fri', email: 'robert@clinic.com' },
    { id: 5, name: 'Dr. Emma Wilson', specialty: 'Dermatology', experience: '6 years', rating: 4.5, patients: 720, status: 'Available', schedule: 'Wed-Fri', email: 'emma@clinic.com' },
    { id: 6, name: 'Dr. James Miller', specialty: 'Surgery', experience: '20 years', rating: 4.9, patients: 3400, status: 'Available', schedule: 'Mon-Thu', email: 'james@clinic.com' },
    { id: 7, name: 'Dr. Anna Garcia', specialty: 'Psychiatry', experience: '7 years', rating: 4.4, patients: 580, status: 'On Leave', schedule: 'Mon-Wed', email: 'anna@clinic.com' },
    { id: 8, name: 'Dr. David Kim', specialty: 'Radiology', experience: '9 years', rating: 4.6, patients: 1100, status: 'Available', schedule: 'Mon-Fri', email: 'david@clinic.com' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const specialties = ['All', 'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'Surgery', 'Psychiatry', 'Radiology'];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || doctor.specialty === selectedSpecialty;
    const matchesStatus = selectedStatus === 'All' || doctor.status === selectedStatus;
    
    return matchesSearch && matchesSpecialty && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'Available': return '#10b981';
      case 'Busy': return '#f59e0b';
      case 'On Leave': return '#ef4444';
      default: return '#64748b';
    }
  };

  const handleDeleteDoctor = (id) => {
    if (window.confirm('Are you sure you want to remove this doctor?')) {
      setDoctors(doctors.filter(doctor => doctor.id !== id));
    }
  };

  return (
    <div className="doctor-management">
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">Doctor Management</h1>
          <p className="page-subtitle">Manage doctors and their schedules</p>
        </div>
        <button className="add-btn">
          <FontAwesomeIcon icon={faPlus} />
          Add Doctor
        </button>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#0066cc20' }}>
            ⚕️
          </div>
          <div className="stat-content">
            <h3>{doctors.length}</h3>
            <p>Total Doctors</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#10b98120' }}>
            ✓
          </div>
          <div className="stat-content">
            <h3>{doctors.filter(d => d.status === 'Available').length}</h3>
            <p>Available</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#f59e0b20' }}>
            ⭐
          </div>
          <div className="stat-content">
            <h3>{doctors.reduce((acc, doc) => acc + doc.rating, 0) / doctors.length}</h3>
            <p>Avg. Rating</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#8b5cf620' }}>
            👥
          </div>
          <div className="stat-content">
            <h3>{doctors.reduce((acc, doc) => acc + doc.patients, 0).toLocaleString()}</h3>
            <p>Total Patients</p>
          </div>
        </div>
      </div>

      <div className="controls-section">
        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search doctors by name or specialty..."
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
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              {specialties.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
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
              <option value="Available">Available</option>
              <option value="Busy">Busy</option>
              <option value="On Leave">On Leave</option>
            </select>
          </div>
        </div>
      </div>

      <div className="doctors-grid">
        {filteredDoctors.map(doctor => (
          <div key={doctor.id} className="doctor-card">
            <div className="doctor-header">
              <div className="doctor-avatar">
                {doctor.name.split(' ')[1]?.charAt(0) || doctor.name.charAt(0)}
              </div>
              <div className="doctor-info">
                <h3>{doctor.name}</h3>
                <p className="doctor-specialty">{doctor.specialty}</p>
              </div>
              <span className="status-badge" style={{ background: getStatusColor(doctor.status) }}>
                {doctor.status}
              </span>
            </div>
            
            <div className="doctor-details">
              <div className="detail-item">
                <FontAwesomeIcon icon={faClock} />
                <span>{doctor.experience} experience</span>
              </div>
              <div className="detail-item">
                <FontAwesomeIcon icon={faStar} />
                <span>{doctor.rating} Rating</span>
              </div>
              <div className="detail-item">
                <FontAwesomeIcon icon={faCalendar} />
                <span>{doctor.schedule}</span>
              </div>
              <div className="detail-item">
                <span className="patients-count">{doctor.patients.toLocaleString()} patients</span>
              </div>
            </div>
            
            <div className="doctor-contact">
              <span className="email">{doctor.email}</span>
            </div>
            
            <div className="doctor-actions">
              <button className="action-btn view">
                <FontAwesomeIcon icon={faEye} />
                View
              </button>
              <button className="action-btn edit">
                <FontAwesomeIcon icon={faEdit} />
                Edit
              </button>
              <button 
                className="action-btn delete"
                onClick={() => handleDeleteDoctor(doctor.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">👨‍⚕️</div>
          <h3>No doctors found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default DoctorManagement;