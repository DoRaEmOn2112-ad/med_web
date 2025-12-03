import React, { useState } from 'react';
import './Billing.css';

const Billing = () => {
  const [activeTab, setActiveTab] = useState('invoices');
  const [invoices, setInvoices] = useState([
    { id: 'INV-2024-001', patient: 'John Doe', amount: 250.00, date: '2024-03-19', dueDate: '2024-04-19', status: 'Paid', type: 'Consultation' },
    { id: 'INV-2024-002', patient: 'Jane Smith', amount: 1850.00, date: '2024-03-18', dueDate: '2024-04-18', status: 'Pending', type: 'Surgery' },
    { id: 'INV-2024-003', patient: 'Robert Brown', amount: 125.00, date: '2024-03-17', dueDate: '2024-04-17', status: 'Overdue', type: 'Follow-up' },
    { id: 'INV-2024-004', patient: 'Lisa Wilson', amount: 3200.00, date: '2024-03-16', dueDate: '2024-04-16', status: 'Partial', type: 'Treatment' },
    { id: 'INV-2024-005', patient: 'Tom Johnson', amount: 85.00, date: '2024-03-15', dueDate: '2024-04-15', status: 'Paid', type: 'Lab Test' },
    { id: 'INV-2024-006', patient: 'Sarah Miller', amount: 450.00, date: '2024-03-14', dueDate: '2024-04-14', status: 'Pending', type: 'Consultation' },
  ]);

  const [transactions, setTransactions] = useState([
    { id: 'TXN-001', date: '2024-03-19', description: 'Payment received for INV-2024-001', amount: 250.00, type: 'Credit Card', status: 'Completed' },
    { id: 'TXN-002', date: '2024-03-18', description: 'Insurance claim processed', amount: 1200.00, type: 'Insurance', status: 'Pending' },
    { id: 'TXN-003', date: '2024-03-17', description: 'Refund issued', amount: -85.00, type: 'Refund', status: 'Completed' },
    { id: 'TXN-004', date: '2024-03-16', description: 'Bank transfer payment', amount: 500.00, type: 'Bank Transfer', status: 'Completed' },
    { id: 'TXN-005', date: '2024-03-15', description: 'Payment plan installment', amount: 200.00, type: 'Payment Plan', status: 'Completed' },
  ]);

  const [paymentMethods] = useState([
    { id: 1, type: 'Credit Card', lastFour: '4242', expiry: '12/25', isDefault: true },
    { id: 2, type: 'Debit Card', lastFour: '1881', expiry: '08/24', isDefault: false },
    { id: 3, type: 'Bank Account', lastFour: '5532', expiry: 'N/A', isDefault: false },
  ]);

  const [showCreateInvoice, setShowCreateInvoice] = useState(false);
  const [showRecordPayment, setShowRecordPayment] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');

  const billingStats = {
    totalRevenue: 154250,
    pendingAmount: 24750,
    overdueAmount: 8520,
    thisMonthRevenue: 28450,
    lastMonthRevenue: 23500,
    growthRate: '21.1%'
  };

  const statusOptions = ['All', 'Paid', 'Pending', 'Overdue', 'Partial', 'Cancelled'];

  const filteredInvoices = invoices.filter(inv => 
    filterStatus === 'All' || inv.status === filterStatus
  );

  const getStatusBadge = (status) => {
    const styles = {
      'Paid': 'status-paid',
      'Pending': 'status-pending',
      'Overdue': 'status-overdue',
      'Partial': 'status-partial',
      'Cancelled': 'status-cancelled'
    };
    return styles[status] || '';
  };

  const getPaymentTypeIcon = (type) => {
    const icons = {
      'Credit Card': 'fas fa-credit-card',
      'Insurance': 'fas fa-heartbeat',
      'Refund': 'fas fa-undo',
      'Bank Transfer': 'fas fa-university',
      'Payment Plan': 'fas fa-calendar-alt',
      'Cash': 'fas fa-money-bill'
    };
    return icons[type] || 'fas fa-dollar-sign';
  };

  const handleSendReminder = (invoiceId) => {
    if (window.confirm('Send payment reminder for this invoice?')) {
      alert(`Reminder sent for ${invoiceId}`);
    }
  };

  const handleGenerateInvoice = (e) => {
    e.preventDefault();
    // Generate invoice logic
    setShowCreateInvoice(false);
  };

  const handleRecordPayment = (e) => {
    e.preventDefault();
    // Record payment logic
    setShowRecordPayment(false);
  };

  const tabs = [
    { id: 'invoices', label: 'Invoices', icon: 'fas fa-file-invoice-dollar' },
    { id: 'transactions', label: 'Transactions', icon: 'fas fa-exchange-alt' },
    { id: 'payment-methods', label: 'Payment Methods', icon: 'fas fa-wallet' },
    { id: 'reports', label: 'Financial Reports', icon: 'fas fa-chart-pie' },
    { id: 'insurance', label: 'Insurance Claims', icon: 'fas fa-heartbeat' },
  ];

  return (
    <div className="billing-container">
      <div className="section-header">
        <div>
          <h2>Billing & Financial Management</h2>
          <p>Manage invoices, payments, and financial reports</p>
        </div>
        <div className="header-actions">
          <button 
            className="btn-primary"
            onClick={() => setShowCreateInvoice(true)}
          >
            <i className="fas fa-plus-circle"></i> Create Invoice
          </button>
          <button 
            className="btn-secondary"
            onClick={() => setShowRecordPayment(true)}
          >
            <i className="fas fa-money-bill-wave"></i> Record Payment
          </button>
          <button className="btn-tertiary">
            <i className="fas fa-download"></i> Export Reports
          </button>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="financial-overview">
        <div className="overview-card total-revenue">
          <div className="card-icon">
            <i className="fas fa-chart-line"></i>
          </div>
          <div className="card-content">
            <h3>${billingStats.totalRevenue.toLocaleString()}</h3>
            <p>Total Revenue</p>
            <span className="growth-rate positive">
              <i className="fas fa-arrow-up"></i> {billingStats.growthRate}
            </span>
          </div>
        </div>
        <div className="overview-card pending-amount">
          <div className="card-icon">
            <i className="fas fa-clock"></i>
          </div>
          <div className="card-content">
            <h3>${billingStats.pendingAmount.toLocaleString()}</h3>
            <p>Pending Amount</p>
            <span className="invoice-count">24 invoices</span>
          </div>
        </div>
        <div className="overview-card overdue-amount">
          <div className="card-icon">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <div className="card-content">
            <h3>${billingStats.overdueAmount.toLocaleString()}</h3>
            <p>Overdue Amount</p>
            <span className="invoice-count">8 invoices</span>
          </div>
        </div>
        <div className="overview-card monthly-revenue">
          <div className="card-icon">
            <i className="fas fa-calendar-alt"></i>
          </div>
          <div className="card-content">
            <h3>${billingStats.thisMonthRevenue.toLocaleString()}</h3>
            <p>This Month Revenue</p>
            <span className="comparison">
              vs ${billingStats.lastMonthRevenue.toLocaleString()} last month
            </span>
          </div>
        </div>
      </div>

      {/* Billing Tabs */}
      <div className="billing-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`billing-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <i className={tab.icon}></i>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="billing-content">
        {activeTab === 'invoices' && (
          <div className="invoices-section">
            <div className="section-toolbar">
              <div className="filters">
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <input type="date" placeholder="From Date" />
                <input type="date" placeholder="To Date" />
                <button className="btn-filter">
                  <i className="fas fa-filter"></i> Filter
                </button>
              </div>
              <div className="actions">
                <button className="btn-action">
                  <i className="fas fa-print"></i> Print Selected
                </button>
                <button className="btn-action">
                  <i className="fas fa-envelope"></i> Email Selected
                </button>
              </div>
            </div>

            <div className="invoices-table-container">
              <table className="invoices-table">
                <thead>
                  <tr>
                    <th><input type="checkbox" /></th>
                    <th>Invoice ID</th>
                    <th>Patient</th>
                    <th>Date</th>
                    <th>Due Date</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map(invoice => (
                    <tr key={invoice.id}>
                      <td><input type="checkbox" /></td>
                      <td>
                        <a href="#" className="invoice-link">{invoice.id}</a>
                      </td>
                      <td>{invoice.patient}</td>
                      <td>{invoice.date}</td>
                      <td>
                        <div className="due-date">
                          {invoice.dueDate}
                          {invoice.status === 'Overdue' && (
                            <span className="overdue-badge">Overdue</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <strong>${invoice.amount.toFixed(2)}</strong>
                      </td>
                      <td>{invoice.type}</td>
                      <td>
                        <span className={`status-badge ${getStatusBadge(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td>
                        <div className="invoice-actions">
                          <button 
                            className="btn-icon view"
                            title="View Invoice"
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                          <button 
                            className="btn-icon edit"
                            title="Edit Invoice"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button 
                            className="btn-icon send"
                            onClick={() => handleSendReminder(invoice.id)}
                            title="Send Reminder"
                          >
                            <i className="fas fa-bell"></i>
                          </button>
                          <button 
                            className="btn-icon download"
                            title="Download PDF"
                          >
                            <i className="fas fa-download"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="transactions-section">
            <div className="transactions-list">
              {transactions.map(transaction => (
                <div key={transaction.id} className="transaction-item">
                  <div className="transaction-icon">
                    <i className={getPaymentTypeIcon(transaction.type)}></i>
                  </div>
                  <div className="transaction-details">
                    <h5>{transaction.description}</h5>
                    <div className="transaction-meta">
                      <span className="transaction-id">{transaction.id}</span>
                      <span className="transaction-date">{transaction.date}</span>
                      <span className="transaction-type">{transaction.type}</span>
                    </div>
                  </div>
                  <div className={`transaction-amount ${transaction.amount >= 0 ? 'positive' : 'negative'}`}>
                    ${Math.abs(transaction.amount).toFixed(2)}
                  </div>
                  <div className="transaction-status">
                    <span className={`status-badge ${transaction.status.toLowerCase()}`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'payment-methods' && (
          <div className="payment-methods-section">
            <div className="methods-list">
              {paymentMethods.map(method => (
                <div key={method.id} className="payment-method-card">
                  <div className="method-header">
                    <div className="method-icon">
                      <i className={getPaymentTypeIcon(method.type)}></i>
                    </div>
                    <div className="method-info">
                      <h5>{method.type}</h5>
                      <p>•••• {method.lastFour}</p>
                    </div>
                    {method.isDefault && (
                      <span className="default-badge">Default</span>
                    )}
                  </div>
                  <div className="method-details">
                    <div className="detail">
                      <span>Expires:</span>
                      <span>{method.expiry}</span>
                    </div>
                    <div className="detail">
                      <span>Added:</span>
                      <span>2024-01-15</span>
                    </div>
                  </div>
                  <div className="method-actions">
                    <button className="btn-icon">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="btn-icon">
                      <i className="fas fa-trash"></i>
                    </button>
                    {!method.isDefault && (
                      <button className="btn-icon">
                        <i className="fas fa-check-circle"></i> Set as Default
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-add-method">
              <i className="fas fa-plus"></i> Add Payment Method
            </button>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="reports-section">
            <div className="reports-grid">
              <div className="report-card">
                <h4>Revenue Report</h4>
                <div className="report-chart">
                  {/* Chart placeholder */}
                  <div className="chart-placeholder">
                    <i className="fas fa-chart-bar"></i>
                  </div>
                </div>
                <button className="btn-report">
                  <i className="fas fa-download"></i> Download PDF
                </button>
              </div>
              <div className="report-card">
                <h4>Collection Report</h4>
                <div className="report-chart">
                  <div className="chart-placeholder">
                    <i className="fas fa-chart-pie"></i>
                  </div>
                </div>
                <button className="btn-report">
                  <i className="fas fa-download"></i> Download PDF
                </button>
              </div>
              <div className="report-card">
                <h4>Aging Report</h4>
                <div className="report-summary">
                  <div className="aging-item">
                    <span>0-30 days</span>
                    <span>$12,450</span>
                  </div>
                  <div className="aging-item">
                    <span>31-60 days</span>
                    <span>$5,820</span>
                  </div>
                  <div className="aging-item">
                    <span>61-90 days</span>
                    <span>$2,150</span>
                  </div>
                  <div className="aging-item overdue">
                    <span>90+ days</span>
                    <span>$850</span>
                  </div>
                </div>
                <button className="btn-report">
                  <i className="fas fa-download"></i> Download PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Invoice Modal */}
      {showCreateInvoice && (
        <div className="modal-overlay">
          <div className="modal invoice-modal">
            <div className="modal-header">
              <h3>Create New Invoice</h3>
              <button 
                className="close-btn"
                onClick={() => setShowCreateInvoice(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleGenerateInvoice}>
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
                  <label>Invoice Date *</label>
                  <input type="date" required />
                </div>
                <div className="form-group">
                  <label>Due Date *</label>
                  <input type="date" required />
                </div>
                <div className="form-group">
                  <label>Service Type</label>
                  <select>
                    <option>Consultation</option>
                    <option>Surgery</option>
                    <option>Lab Test</option>
                    <option>Treatment</option>
                  </select>
                </div>
                {/* Line items would go here */}
                <div className="form-group full-width">
                  <label>Notes</label>
                  <textarea placeholder="Additional notes for the invoice..." rows="3"></textarea>
                </div>
              </div>
              <div className="modal-actions">
                <button 
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowCreateInvoice(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Generate Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Record Payment Modal */}
      {showRecordPayment && (
        <div className="modal-overlay">
          <div className="modal payment-modal">
            {/* Similar structure to invoice modal */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;