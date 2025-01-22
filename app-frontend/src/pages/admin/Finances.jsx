import DashboardHeader from "@/components/admin/DashboardHeader";
import DashboardShell from "@/components/admin/DashboardShell";
import FinancialSummary from "@/components/admin/FinancialSummary";
import React from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
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
          content="Manage modules and features on the Eunoia platform"
        />
      </Helmet>
      <DashboardShell>
        <DashboardHeader
          heading="Finances"
          text="Manage and monitor financial data."
        />
        <div className="grid gap-6">
          <FinancialSummary />
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          className="bg-blue-500 mx-1 text-white hover:bg-blue-600"
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </DashboardShell>
    </div>
  );
}
