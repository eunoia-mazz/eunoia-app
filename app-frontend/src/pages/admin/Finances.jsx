import DashboardHeader from "@/components/admin/DashboardHeader";
import DashboardShell from "@/components/admin/DashboardShell";
import FinancialSummary from "@/components/admin/FinancialSummary";
import React from "react";
import { Helmet } from "react-helmet";

export default function Finances() {
  const transactions = [
    {
      id: 1,
      date: "2023-06-15",
      description: "Subscription Payment",
      amount: 99.99,
      type: "Income",
    },
    {
      id: 2,
      date: "2023-06-14",
      description: "Therapist Payout",
      amount: 150.0,
      type: "Expense",
    },
    {
      id: 3,
      date: "2023-06-13",
      description: "Premium Feature Upgrade",
      amount: 49.99,
      type: "Income",
    },
  ];

  return (
    <div>
      <Helmet>
        <title>Finances | Admin Dashboard</title>
        <meta
          name="description"
          content="Manage modules and features on the MindfulMe platform"
        />
      </Helmet>
      <DashboardShell>
        <DashboardHeader
          heading="Finances"
          text="Manage and monitor financial data."
        />
        <div className="grid gap-6">
          <FinancialSummary />
          <div className="card">
            <div className="card-header">
              <h2>Recent Transactions</h2>
            </div>
            <div className="card-content">
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.date}</td>
                      <td>{transaction.description}</td>
                      <td>${transaction.amount.toFixed(2)}</td>
                      <td>{transaction.type}</td>
                      <td>
                        <button className="btn-outline-sm">View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DashboardShell>
    </div>
  );
}
