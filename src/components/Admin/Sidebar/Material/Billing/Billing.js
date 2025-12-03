import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faFileInvoice, faDownload, faPrint, faCheckCircle, faClock, faExclamationCircle, faDollarSign, faChartLine } from '@fortawesome/free-solid-svg-icons';
import './Billing.css';

const Billing = () => {
  const [activeTab, setActiveTab] = useState('invoices');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const invoices = [
    { id: 'INV-2024-001', patient: 'John Smith', amount: '$450.00', date: '2024-01-15', dueDate: '2024-02-15', status: 'Paid', type: 'Consultation' },
    { id: 'INV-2024-002', patient: 'Emma Wilson', amount: '$1,250.00', date: '2024-01-16', dueDate: '2024-02-16', status: 'Pending', type: 'Surgery' },
    { id: 'INV-2024-003', patient: 'Robert Chen', amount: '$180.00', date: '2024-01-17', dueDate: '2024-02-17', status: 'Overdue', type: 'Follow-up' },
    { id: 'INV-2024-004', patient: 'Sarah Johnson', amount: '$320.00', date: '2024-01-18', dueDate: '2024-02-18', status: 'Paid', type: 'Therapy' },
    { id: 'INV-2024-005', patient: 'Mike Brown', amount: '$890.00', date: '2024-01-19', dueDate: '2024-02-19', status: 'Pending', type: 'Treatment' },
    { id: 'INV-2024-006', patient: 'Lisa Wong', amount: '$540.00', date: '2024-01-20', dueDate: '2024-02-20', status: 'Paid', type: 'Consultation' },
    { id: 'INV-2024-007', patient: 'David Kim', amount: '$1,100.00', date: '2024-01-21', dueDate: '2024-02-21', status: 'Pending', type: 'Surgery' },
    { id: 'INV-2024-008', patient: 'Anna Garcia', amount: '$275.00', date: '2024-01-22', dueDate: '2024-02-22', status: 'Overdue', type: 'Check-up' },
  ];

  const transactions = [
    { id: 'TXN-001', description: 'Consultation Fee - Dr. Sarah Johnson', amount: '$450.00', date: '2024-01-15', type: 'Payment', method: 'Credit Card' },
    { id: 'TXN-002', description: 'Surgery Procedure', amount: '$1,250.00', date: '2024-01-16', type: 'Invoice', method: 'Insurance' },
    { id: 'TXN-003', description: 'Medication Refund', amount: '-$45.00', date: '2024-01-17', type: 'Refund', method: 'Credit Card' },
    { id: 'TXN-004', description: 'Therapy Session', amount: '$320.00', date: '2024-01-18', type: 'Payment', method: 'Cash' },
    { id: 'TXN-005', description: 'Lab Test Fees', amount: '$890.00', date: '2024-01-19', type: 'Invoice', method: 'Insurance' },
  ];

  const billingStats = [
    { label: 'Total Revenue', value: '$124,580', change: '+18.3%', color: '#10b981' },
    { label: 'Outstanding', value: '$24,850', change: '-5.2%', color: '#f59e0b' },
    { label: 'Overdue', value: '$8,450', change: '+12.1%', color: '#ef4444' },
    { label: 'Avg. Payment Days', value: '18 days', change: '-3 days', color: '#0066cc' },
  ];

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || invoice.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'Paid': return '#10b981';
      case 'Pending': return '#f59e0b';
      case 'Overdue': return '#ef4444';
      default: return '#64748b';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Paid': return faCheckCircle;
      case 'Pending': return faClock;
      case 'Overdue': return faExclamationCircle;
      default: return faClock;
    }
  };

  const handleSendReminder = (invoiceId) => {
    alert(`Reminder sent for invoice ${invoiceId}`);
  };

  const handleMarkAsPaid = (invoiceId) => {
    if (window.confirm(`Mark invoice ${invoiceId} as paid?`)) {
      alert(`Invoice ${invoiceId} marked as paid`);
    }
  };

  const tabs = [
    { id: 'invoices', label: 'Invoices', icon: faFileInvoice },
    { id: 'transactions', label: 'Transactions', icon: faDollarSign },
    { id: 'reports', label: 'Reports', icon: faChartLine },
  ];

  return (
    <div className="billing">
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">Billing & Invoicing</h1>
          <p className="page-subtitle">Manage invoices, payments, and financial reports</p>
        </div>
        <div className="header-actions">
          <button className="print-btn">
            <FontAwesomeIcon icon={faPrint} />
            Print Report
          </button>
          <button className="new-invoice-btn">
            <FontAwesomeIcon icon={faFileInvoice} />
            New Invoice
          </button>
        </div>
      </div>

      <div className="billing-stats">
        {billingStats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-content">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-label">{stat.label}</p>
              <span className="stat-change" style={{ color: stat.color }}>
                {stat.change}
              </span>
            </div>
            <div className="stat-chart">
              <div className="chart-mini">
                {[65, 70, 75, 80, 85, 90].map((height, i) => (
                  <div key={i} className="chart-bar-mini" style={{ 
                    height: `${height}%`,
                    background: stat.color 
                  }}></div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="billing-tabs">
        <div className="tabs-header">
          <div className="tabs-navigation">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <FontAwesomeIcon icon={tab.icon} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
          <div className="tabs-controls">
            {activeTab === 'invoices' && (
              <>
                <div className="search-box">
                  <FontAwesomeIcon icon={faSearch} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search invoices..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>
                <div className="filter-group">
                  <FontAwesomeIcon icon={faFilter} />
                  <select 
                    className="filter-select"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="All">All Status</option>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="tabs-content">
          {activeTab === 'invoices' && (
            <div className="invoices-section">
              <div className="invoices-table-container">
                <table className="invoices-table">
                  <thead>
                    <tr>
                      <th>Invoice ID</th>
                      <th>Patient</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Due Date</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvoices.map(invoice => (
                      <tr key={invoice.id}>
                        <td className="invoice-id">
                          <FontAwesomeIcon icon={faFileInvoice} />
                          <span>{invoice.id}</span>
                        </td>
                        <td className="patient-cell">
                          <div className="patient-info">
                            <div className="patient-avatar">
                              {invoice.patient.charAt(0)}
                            </div>
                            <span>{invoice.patient}</span>
                          </div>
                        </td>
                        <td className="amount-cell">
                          <strong>{invoice.amount}</strong>
                        </td>
                        <td>{invoice.date}</td>
                        <td className="due-date">{invoice.dueDate}</td>
                        <td>
                          <span className="invoice-type">{invoice.type}</span>
                        </td>
                        <td>
                          <span 
                            className="status-badge"
                            style={{ background: getStatusColor(invoice.status) }}
                          >
                            <FontAwesomeIcon icon={getStatusIcon(invoice.status)} />
                            {invoice.status}
                          </span>
                        </td>
                        <td>
                          <div className="invoice-actions">
                            <button 
                              className="action-btn view"
                              title="View Invoice"
                            >
                              <FontAwesomeIcon icon={faSearch} />
                            </button>
                            <button 
                              className="action-btn download"
                              title="Download"
                            >
                              <FontAwesomeIcon icon={faDownload} />
                            </button>
                            {invoice.status === 'Pending' && (
                              <button 
                                className="action-btn reminder"
                                title="Send Reminder"
                                onClick={() => handleSendReminder(invoice.id)}
                              >
                                <FontAwesomeIcon icon={faClock} />
                              </button>
                            )}
                            {invoice.status === 'Overdue' && (
                              <button 
                                className="action-btn pay"
                                title="Mark as Paid"
                                onClick={() => handleMarkAsPaid(invoice.id)}
                              >
                                <FontAwesomeIcon icon={faCheckCircle} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredInvoices.length === 0 && (
                  <div className="empty-state">
                    <div className="empty-icon">📄</div>
                    <h3>No invoices found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="transactions-section">
              <div className="transactions-table-container">
                <table className="transactions-table">
                  <thead>
                    <tr>
                      <th>Transaction ID</th>
                      <th>Description</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Payment Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map(transaction => (
                      <tr key={transaction.id}>
                        <td className="transaction-id">
                          <span>{transaction.id}</span>
                        </td>
                        <td className="description">
                          {transaction.description}
                        </td>
                        <td className={`amount ${transaction.amount.startsWith('-') ? 'negative' : 'positive'}`}>
                          {transaction.amount}
                        </td>
                        <td>{transaction.date}</td>
                        <td>
                          <span className={`type-badge ${transaction.type.toLowerCase()}`}>
                            {transaction.type}
                          </span>
                        </td>
                        <td>
                          <span className="method-badge">
                            {transaction.method}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="transaction-summary">
                <div className="summary-card">
                  <h4>Transaction Summary</h4>
                  <div className="summary-items">
                    <div className="summary-item">
                      <span className="summary-label">Total Income</span>
                      <span className="summary-value positive">$3,145.00</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Total Expenses</span>
                      <span className="summary-value negative">$890.00</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Net Amount</span>
                      <span className="summary-value positive">$2,255.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="reports-section">
              <div className="reports-grid">
                <div className="report-card">
                  <div className="report-header">
                    <h4>Revenue Report</h4>
                    <button className="download-report">
                      <FontAwesomeIcon icon={faDownload} />
                    </button>
                  </div>
                  <div className="report-chart">
                    <div className="chart-bars-report">
                      {[65, 80, 75, 90, 85, 95, 70].map((height, i) => (
                        <div key={i} className="chart-bar-report" style={{ height: `${height}%` }}></div>
                      ))}
                    </div>
                    <div className="chart-labels-report">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']}
                    </div>
                  </div>
                </div>
                
                <div className="report-card">
                  <div className="report-header">
                    <h4>Payment Methods</h4>
                  </div>
                  <div className="payment-methods">
                    <div className="method-item">
                      <div className="method-info">
                        <span className="method-name">Credit Card</span>
                        <span className="method-percentage">45%</span>
                      </div>
                      <div className="method-bar">
                        <div className="method-fill" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                    <div className="method-item">
                      <div className="method-info">
                        <span className="method-name">Insurance</span>
                        <span className="method-percentage">35%</span>
                      </div>
                      <div className="method-bar">
                        <div className="method-fill" style={{ width: '35%' }}></div>
                      </div>
                    </div>
                    <div className="method-item">
                      <div className="method-info">
                        <span className="method-name">Cash</span>
                        <span className="method-percentage">15%</span>
                      </div>
                      <div className="method-bar">
                        <div className="method-fill" style={{ width: '15%' }}></div>
                      </div>
                    </div>
                    <div className="method-item">
                      <div className="method-info">
                        <span className="method-name">Bank Transfer</span>
                        <span className="method-percentage">5%</span>
                      </div>
                      <div className="method-bar">
                        <div className="method-fill" style={{ width: '5%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="reports-actions">
                <h4>Generate Reports</h4>
                <div className="report-buttons">
                  <button className="report-btn">
                    <FontAwesomeIcon icon={faFileInvoice} />
                    Monthly Statement
                  </button>
                  <button className="report-btn">
                    <FontAwesomeIcon icon={faChartLine} />
                    Revenue Analytics
                  </button>
                  <button className="report-btn">
                    <FontAwesomeIcon icon={faDollarSign} />
                    Tax Report
                  </button>
                  <button className="report-btn">
                    <FontAwesomeIcon icon={faDownload} />
                    Export All Data
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

export default Billing;