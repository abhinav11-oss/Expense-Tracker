import React, { useState } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseSummary from '../components/ExpenseSummary';
import ExpenseList from '../components/ExpenseList';

function Dashboard() {
  // We use this key to force the components to refresh when a new expense is added
  const [refreshKey, setRefreshKey] = useState(0);

  const handleExpenseAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <h1>Expense Tracker</h1>
        <p>Manage your finances with ease</p>
      </div>
      <div className="dashboard-content">
        <ExpenseForm onExpenseAdded={handleExpenseAdded} />
        <ExpenseSummary refreshKey={refreshKey} />
        <ExpenseList refreshKey={refreshKey} />
      </div>
    </div>
  )
}

export default Dashboard;
