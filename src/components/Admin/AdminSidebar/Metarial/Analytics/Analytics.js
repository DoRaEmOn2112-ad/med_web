import React, { useState } from 'react';
import './Analytics.css';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [activeMetric, setActiveMetric] = useState('appointments');

  const metricsData = {
    appointments: {
      title: 'Appointment Analytics',
      description: 'Track appointment trends and patterns',
      data: [120, 145, 180, 210, 190, 230, 265, 240, 280, 310, 290, 320],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      color: '#4e54c8'
    },
    patients: {
      title: 'Patient Growth',
      description: 'New patient registrations over time',
      data: [85, 92, 110, 125, 140, 165, 180, 195, 210, 230, 250, 275],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      color: '#38ef7d'
    },
    revenue: {
      title: 'Revenue Analysis',
      description: 'Monthly revenue and financial trends',
      data: [12500, 14200, 15800, 17200, 18500, 21000, 22500, 23800, 25500, 27200, 29000, 31500],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      color: '#fc4a1a'
    },
    doctors: {
      title: 'Doctor Performance',
      description: 'Appointment completion rates by doctor',
      data: [45, 48, 52, 55, 58, 60, 62, 65, 67, 70, 72, 75],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      color: '#1a2a6c'
    }
  };

  const kpiData = [
    { title: 'Appointment Volume', value: '2,847', change: '+12%', icon: 'fas fa-calendar-check', color: 'blue' },
    { title: 'Patient Satisfaction', value: '94.5%', change: '+2.3%', icon: 'fas fa-smile', color: 'green' },
    { title: 'Average Wait Time', value: '14min', change: '-18%', icon: 'fas fa-clock', color: 'orange' },
    { title: 'Revenue Growth', value: '$315K', change: '+24%', icon: 'fas fa-chart-line', color: 'purple' },
    { title: 'Doctor Utilization', value: '82%', change: '+5%', icon: 'fas fa-user-md', color: 'red' },
    { title: 'Cancellation Rate', value: '4.2%', change: '-1.8%', icon: 'fas fa-times-circle', color: 'yellow' }
  ];

  const departmentPerformance = [
    { department: 'Cardiology', appointments: 420, revenue: 125000, satisfaction: 96 },
    { department: 'Neurology', appointments: 380, revenue: 142000, satisfaction: 94 },
    { department: 'Pediatrics', appointments: 520, revenue: 98000, satisfaction: 97 },
    { department: 'Orthopedics', appointments: 310, revenue: 165000, satisfaction: 93 },
    { department: 'Dermatology', appointments: 290, revenue: 88000, satisfaction: 95 },
  ];

  const topDoctors = [
    { name: 'Dr. Sarah Johnson', specialty: 'Cardiology', appointments: 145, rating: 4.9, revenue: 85000 },
    { name: 'Dr. Michael Chen', specialty: 'Neurology', appointments: 132, rating: 4.8, revenue: 92000 },
    { name: 'Dr. Emily Davis', specialty: 'Pediatrics', appointments: 158, rating: 4.9, revenue: 72000 },
    { name: 'Dr. Robert Wilson', specialty: 'Orthopedics', appointments: 125, rating: 4.7, revenue: 105000 },
    { name: 'Dr. Jennifer Lee', specialty: 'Dermatology', appointments: 118, rating: 4.8, revenue: 68000 },
  ];

  const timeRanges = [
    { id: 'week', label: 'Week' },
    { id: 'month', label: 'Month' },
    { id: 'quarter', label: 'Quarter' },
    { id: 'year', label: 'Year' },
    { id: 'custom', label: 'Custom' }
  ];

  const metrics = [
    { id: 'appointments', label: 'Appointments', icon: 'fas fa-calendar-alt' },
    { id: 'patients', label: 'Patients', icon: 'fas fa-user-injured' },
    { id: 'revenue', label: 'Revenue', icon: 'fas fa-dollar-sign' },
    { id: 'doctors', label: 'Doctors', icon: 'fas fa-user-md' }
  ];

  const renderChart = () => {
    const data = metricsData[activeMetric];
    const maxValue = Math.max(...data.data);
    
    return (
      <div className="chart-container">
        <div className="chart-bars">
          {data.data.map((value, index) => (
            <div key={index} className="chart-bar-group">
              <div className="bar-label">{data.labels[index]}</div>
              <div 
                className="bar" 
                style={{ 
                  height: `${(value / maxValue) * 100}%`,
                  backgroundColor: data.color
                }}
                title={`${value}`}
              >
                <span className="bar-value">{value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="analytics-container">
      <div className="section-header">
        <div>
          <h2>System Analytics Dashboard</h2>
          <p>Comprehensive insights and performance metrics</p>
        </div>
        <div className="header-actions">
          <button className="btn-primary">
            <i className="fas fa-download"></i> Export Report
          </button>
          <button className="btn-secondary">
            <i className="fas fa-print"></i> Print
          </button>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="time-selector">
        {timeRanges.map(range => (
          <button
            key={range.id}
            className={`time-btn ${timeRange === range.id ? 'active' : ''}`}
            onClick={() => setTimeRange(range.id)}
          >
            {range.label}
          </button>
        ))}
        <div className="date-picker">
          <input type="date" />
          <span>to</span>
          <input type="date" />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        {kpiData.map((kpi, index) => (
          <div key={index} className="kpi-card">
            <div className="kpi-header">
              <div className={`kpi-icon ${kpi.color}`}>
                <i className={kpi.icon}></i>
              </div>
              <span className={`kpi-change ${kpi.change.startsWith('+') ? 'positive' : 'negative'}`}>
                {kpi.change}
              </span>
            </div>
            <div className="kpi-body">
              <h3 className="kpi-value">{kpi.value}</h3>
              <p className="kpi-title">{kpi.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Chart Area */}
      <div className="chart-section">
        <div className="chart-header">
          <div>
            <h3>{metricsData[activeMetric].title}</h3>
            <p>{metricsData[activeMetric].description}</p>
          </div>
          <div className="metric-selector">
            {metrics.map(metric => (
              <button
                key={metric.id}
                className={`metric-btn ${activeMetric === metric.id ? 'active' : ''}`}
                onClick={() => setActiveMetric(metric.id)}
              >
                <i className={metric.icon}></i>
                {metric.label}
              </button>
            ))}
          </div>
        </div>
        <div className="chart-wrapper">
          {renderChart()}
        </div>
      </div>

      {/* Department Performance */}
      <div className="data-grid">
        <div className="data-card">
          <div className="card-header">
            <h4>Department Performance</h4>
            <button className="btn-link">View Details</button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Appointments</th>
                <th>Revenue</th>
                <th>Satisfaction</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              {departmentPerformance.map(dept => (
                <tr key={dept.department}>
                  <td>
                    <div className="dept-info">
                      <div className="dept-icon">
                        <i className="fas fa-hospital"></i>
                      </div>
                      <span>{dept.department}</span>
                    </div>
                  </td>
                  <td>{dept.appointments.toLocaleString()}</td>
                  <td>${dept.revenue.toLocaleString()}</td>
                  <td>
                    <div className="satisfaction-bar">
                      <div 
                        className="satisfaction-fill"
                        style={{ width: `${dept.satisfaction}%` }}
                      ></div>
                      <span>{dept.satisfaction}%</span>
                    </div>
                  </td>
                  <td>
                    <span className="trend-up">
                      <i className="fas fa-arrow-up"></i> 8.5%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top Doctors */}
        <div className="data-card">
          <div className="card-header">
            <h4>Top Performing Doctors</h4>
            <button className="btn-link">View All</button>
          </div>
          <div className="doctors-list">
            {topDoctors.map(doctor => (
              <div key={doctor.name} className="doctor-item">
                <div className="doctor-avatar">
                  <i className="fas fa-user-md"></i>
                </div>
                <div className="doctor-details">
                  <h5>{doctor.name}</h5>
                  <p>{doctor.specialty}</p>
                </div>
                <div className="doctor-stats">
                  <div className="stat">
                    <span className="stat-label">Appointments</span>
                    <span className="stat-value">{doctor.appointments}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Rating</span>
                    <span className="stat-value">{doctor.rating}/5.0</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Revenue</span>
                    <span className="stat-value">${doctor.revenue.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics Summary */}
      <div className="summary-section">
        <div className="summary-card">
          <h4>Key Insights</h4>
          <ul className="insights-list">
            <li>
              <i className="fas fa-chart-line positive"></i>
              <span>Appointment volume increased by <strong>12%</strong> this month</span>
            </li>
            <li>
              <i className="fas fa-users positive"></i>
              <span>Patient satisfaction rate reached an all-time high of <strong>94.5%</strong></span>
            </li>
            <li>
              <i className="fas fa-clock negative"></i>
              <span>Average wait time decreased by <strong>18%</strong> after optimization</span>
            </li>
            <li>
              <i className="fas fa-dollar-sign positive"></i>
              <span>Revenue growth of <strong>24%</strong> compared to last quarter</span>
            </li>
            <li>
              <i className="fas fa-user-md positive"></i>
              <span>Doctor utilization rate improved to <strong>82%</strong></span>
            </li>
          </ul>
        </div>
        <div className="summary-card">
          <h4>Recommendations</h4>
          <div className="recommendations">
            <div className="recommendation">
              <div className="rec-icon high">
                <i className="fas fa-exclamation-circle"></i>
              </div>
              <div className="rec-content">
                <h5>Optimize Cardiology Schedule</h5>
                <p>High demand detected - consider adding more time slots</p>
              </div>
            </div>
            <div className="recommendation">
              <div className="rec-icon medium">
                <i className="fas fa-lightbulb"></i>
              </div>
              <div className="rec-content">
                <h5>Expand Pediatric Services</h5>
                <p>Growing patient base indicates opportunity for expansion</p>
              </div>
            </div>
            <div className="recommendation">
              <div className="rec-icon low">
                <i className="fas fa-cogs"></i>
              </div>
              <div className="rec-content">
                <h5>Automate Follow-up Reminders</h5>
                <p>Reduce no-show rate by 25% with automated reminders</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;