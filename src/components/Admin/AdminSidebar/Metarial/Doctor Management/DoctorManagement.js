import React, { useState } from 'react';
import './DoctorManagement.css';

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology', status: 'Active', appointments: 45, rating: 4.8 },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Neurology', status: 'Available', appointments: 32, rating: 4.9 },
    { id: 3, name: 'Dr. Emily Davis', specialty: 'Pediatrics', status: 'On Leave', appointments: 28, rating: 4.7 },
    { id: 4, name: 'Dr. Robert Wilson', specialty: 'Orthopedics', status: 'Active', appointments: 39, rating: 4.6 },
    { id: 5, name: 'Dr. Jennifer Lee', specialty: 'Dermatology', status: 'Available', appointments: 41, rating: 4.9 },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  const specialties = ['All', 'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'General'];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Active': return 'status-active';
      case 'Available': return 'status-available';
      case 'On Leave': return 'status-leave';
      default: return '';
    }
  };

  return (
    <div className="doctor-management-container">
      <div className="section-header">
        <div>
          <h2>Doctor Management</h2>
          <p>Manage medical staff profiles and schedules</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAddModal(true)}>
          <i className="fas fa-user-md"></i> Add New Doctor
        </button>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input 
            type="text" 
            placeholder="Search doctors by name or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-controls">
          <select value={selectedSpecialty} onChange={(e) => setSelectedSpecialty(e.target.value)}>
            {specialties.map(spec => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="doctors-grid">
        {filteredDoctors.map(doctor => (
          <div key={doctor.id} className="doctor-card">
            <div className="doctor-header">
              <div className="doctor-avatar">
                <i className="fas fa-user-md"></i>
              </div>
              <div className="doctor-info">
                <h4>{doctor.name}</h4>
                <p className="specialty">{doctor.specialty}</p>
              </div>
              <div className={`status-badge ${getStatusBadge(doctor.status)}`}>
                {doctor.status}
              </div>
            </div>
            
            <div className="doctor-stats">
              <div className="stat">
                <span className="stat-value">{doctor.appointments}</span>
                <span className="stat-label">Appointments</span>
              </div>
              <div className="stat">
                <span className="stat-value">{doctor.rating}</span>
                <span className="stat-label">Rating</span>
              </div>
            </div>

            <div className="doctor-actions">
              <button className="btn-icon" title="View Profile">
                <i className="fas fa-eye"></i>
              </button>
              <button className="btn-icon" title="Edit">
                <i className="fas fa-edit"></i>
              </button>
              <button className="btn-icon" title="Schedule">
                <i className="fas fa-calendar-alt"></i>
              </button>
              <button className="btn-icon" title="Message">
                <i className="fas fa-envelope"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="empty-state">
          <i className="fas fa-user-md"></i>
          <h3>No Doctors Found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      )}

      {/* Add Doctor Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Doctor</h3>
            <form>
              {/* Form fields for adding doctor */}
              <button type="submit">Add Doctor</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorManagement;