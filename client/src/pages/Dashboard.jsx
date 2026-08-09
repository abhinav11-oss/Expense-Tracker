import React, { useState } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';

function Dashboard() {
  // We use this key to force the ExpenseList to refresh when a new expense is added
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
        <ExpenseList refreshKey={refreshKey} />
      </div>
    </div>
  )
}

export default Dashboard;
