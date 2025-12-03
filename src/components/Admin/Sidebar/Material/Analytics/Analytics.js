import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faChartBar, faUsers, faCalendarAlt, faDollarSign, faDownload, faFilter } from '@fortawesome/free-solid-svg-icons';
import './Analytics.css';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const metrics = [
    { label: 'Total Revenue', value: '$124,580', change: '+18.3%', icon: faDollarSign, color: '#10b981' },
    { label: 'Active Patients', value: '2,847', change: '+12.5%', icon: faUsers, color: '#0066cc' },
    { label: 'Appointments', value: '1,248', change: '+23.1%', icon: faCalendarAlt, color: '#8b5cf6' },
    { label: 'Avg. Rating', value: '4.7/5', change: '+2.1%', icon: faChartLine, color: '#f59e0b' },
  ];

  const chartData = {
    revenue: [65, 80, 75, 90, 85, 95, 70, 85, 80, 95, 90, 100],
    patients: [120, 150, 130, 170, 160, 180, 140, 160, 150, 180, 170, 190],
    appointments: [85, 100, 90, 110, 105, 115, 95, 110, 100, 120, 110, 125],
  };

  const topDoctors = [
    { name: 'Dr. Sarah Johnson', specialty: 'Cardiology', patients: 240, revenue: '$28,400', rating: 4.9 },
    { name: 'Dr. James Miller', specialty: 'Surgery', patients: 180, revenue: '$24,800', rating: 4.8 },
    { name: 'Dr. Lisa Wong', specialty: 'Pediatrics', patients: 210, revenue: '$22,100', rating: 4.8 },
    { name: 'Dr. Michael Chen', specialty: 'Neurology', patients: 160, revenue: '$19,500', rating: 4.7 },
    { name: 'Dr. Robert Davis', specialty: 'Orthopedics', patients: 140, revenue: '$18,200', rating: 4.6 },
  ];

  const demographics = [
    { age: '0-18', count: 320, percentage: 15 },
    { age: '19-30', count: 580, percentage: 28 },
    { age: '31-45', count: 690, percentage: 33 },
    { age: '46-60', count: 380, percentage: 18 },
    { age: '60+', count: 130, percentage: 6 },
  ];

  return (
    <div className="analytics">
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">Analytics Dashboard</h1>
          <p className="page-subtitle">Key metrics and insights for your clinic</p>
        </div>
        <div className="header-actions">
          <div className="time-range-selector">
            <FontAwesomeIcon icon={faFilter} />
            <select 
              className="range-select"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="week">Last 7 days</option>
              <option value="month">Last 30 days</option>
              <option value="quarter">This quarter</option>
              <option value="year">This year</option>
            </select>
          </div>
          <button className="export-btn">
            <FontAwesomeIcon icon={faDownload} />
            Export Report
          </button>
        </div>
      </div>

      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <div key={index} className="metric-card">
            <div className="metric-header">
              <div className="metric-icon" style={{ background: `${metric.color}20` }}>
                <FontAwesomeIcon icon={metric.icon} style={{ color: metric.color }} />
              </div>
              <span className="metric-change positive">{metric.change}</span>
            </div>
            <div className="metric-content">
              <h3 className="metric-value">{metric.value}</h3>
              <p className="metric-label">{metric.label}</p>
            </div>
            <div className="metric-trend">
              <div className="trend-line">
                {chartData[metric.label.toLowerCase().split(' ')[1] || 'revenue']?.map((height, i) => (
                  <div key={i} className="trend-point" style={{ height: `${height * 0.3}%` }}></div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-grid">
        <div className="chart-card main-chart">
          <div className="chart-header">
            <h3>Revenue Overview</h3>
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-dot" style={{ background: '#0066cc' }}></span>
                <span>Revenue</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot" style={{ background: '#10b981' }}></span>
                <span>Target</span>
              </div>
            </div>
          </div>
          <div className="chart-container">
            <div className="chart-bars">
              {chartData.revenue.map((value, index) => (
                <div key={index} className="chart-bar-group">
                  <div 
                    className="chart-bar revenue" 
                    style={{ height: `${value}%` }}
                    title={`$${(value * 1200).toLocaleString()}`}
                  ></div>
                  <div 
                    className="chart-bar target" 
                    style={{ height: `${value * 0.9}%` }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="chart-labels">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
            </div>
          </div>
        </div>

        <div className="chart-card pie-chart">
          <div className="chart-header">
            <h3>Patient Demographics</h3>
            <select 
              className="metric-select"
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
            >
              <option value="all">All Metrics</option>
              <option value="age">Age Groups</option>
              <option value="gender">Gender</option>
            </select>
          </div>
          <div className="pie-chart-container">
            <div className="pie-chart-visual">
              <div className="pie-chart-svg">
                {demographics.map((demo, index) => (
                  <div 
                    key={index}
                    className="pie-segment"
                    style={{
                      background: `conic-gradient(#${['0066cc', '10b981', '8b5cf6', 'f59e0b', 'ef4444'][index]} ${
                        index === 0 ? '0%' : `${demographics.slice(0, index).reduce((a, b) => a + b.percentage, 0)}%`
                      } ${demographics.slice(0, index + 1).reduce((a, b) => a + b.percentage, 0)}%)`
                    }}
                  ></div>
                ))}
              </div>
              <div className="pie-chart-center">
                <span className="center-value">2,100</span>
                <span className="center-label">Total Patients</span>
              </div>
            </div>
            <div className="pie-legend">
              {demographics.map((demo, index) => (
                <div key={index} className="legend-item">
                  <span 
                    className="legend-dot" 
                    style={{ background: `#${['0066cc', '10b981', '8b5cf6', 'f59e0b', 'ef4444'][index]}` }}
                  ></span>
                  <div className="legend-content">
                    <span className="legend-label">{demo.age} years</span>
                    <span className="legend-value">{demo.percentage}% ({demo.count})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="tables-grid">
        <div className="table-card">
          <div className="table-header">
            <h3>Top Performing Doctors</h3>
            <button className="view-all">View All →</button>
          </div>
          <div className="table-container">
            <table className="performance-table">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Specialty</th>
                  <th>Patients</th>
                  <th>Revenue</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {topDoctors.map((doctor, index) => (
                  <tr key={index}>
                    <td>
                      <div className="doctor-cell">
                        <div className="doctor-rank">{index + 1}</div>
                        <span>{doctor.name}</span>
                      </div>
                    </td>
                    <td>{doctor.specialty}</td>
                    <td>{doctor.patients}</td>
                    <td className="revenue-cell">{doctor.revenue}</td>
                    <td>
                      <div className="rating-cell">
                        <span className="rating-value">{doctor.rating}</span>
                        <div className="rating-stars">
                          {'★'.repeat(Math.floor(doctor.rating))}
                          {'☆'.repeat(5 - Math.floor(doctor.rating))}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="table-card">
          <div className="table-header">
            <h3>Clinic Performance</h3>
            <span className="performance-change positive">+14.2%</span>
          </div>
          <div className="kpi-grid">
            <div className="kpi-item">
              <div className="kpi-icon" style={{ background: '#0066cc20' }}>
                <FontAwesomeIcon icon={faChartBar} style={{ color: '#0066cc' }} />
              </div>
              <div className="kpi-content">
                <h4>84.2%</h4>
                <p>Occupancy Rate</p>
              </div>
            </div>
            <div className="kpi-item">
              <div className="kpi-icon" style={{ background: '#10b98120' }}>
                <FontAwesomeIcon icon={faUsers} style={{ color: '#10b981' }} />
              </div>
              <div className="kpi-content">
                <h4>92.5%</h4>
                <p>Patient Satisfaction</p>
              </div>
            </div>
            <div className="kpi-item">
              <div className="kpi-icon" style={{ background: '#f59e0b20' }}>
                <FontAwesomeIcon icon={faCalendarAlt} style={{ color: '#f59e0b' }} />
              </div>
              <div className="kpi-content">
                <h4>18.4 min</h4>
                <p>Avg. Wait Time</p>
              </div>
            </div>
            <div className="kpi-item">
              <div className="kpi-icon" style={{ background: '#8b5cf620' }}>
                <FontAwesomeIcon icon={faChartLine} style={{ color: '#8b5cf6' }} />
              </div>
              <div className="kpi-content">
                <h4>76.8%</h4>
                <p>Follow-up Rate</p>
              </div>
            </div>
          </div>
          <div className="trend-chart-mini">
            <div className="trend-line-mini">
              {[65, 70, 68, 75, 72, 78, 76, 82, 80, 85, 83, 88].map((value, index) => (
                <div key={index} className="trend-point-mini" style={{ height: `${value * 0.4}%` }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;