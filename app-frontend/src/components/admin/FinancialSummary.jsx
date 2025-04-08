import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function FinancialSummary({ className }) {
  const [finances, setFinances] = useState({ finances_available: 0, coupons: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFinancesData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get_finances");
      if (response.status === 200) {
        setFinances(response.data);
      }
    } catch (err) {
      setError("Failed to fetch finance data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFinancesData();
  }, []);

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Financial Summary</CardTitle>
          <CardDescription>Monthly revenue and expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Loading...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Financial Summary</CardTitle>
          <CardDescription>Monthly revenue and expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }

  const chartData = [
    { month: "Jan", revenue: finances.finances_available * 0.2, expenses: finances.finances_available * 0.1 },
    { month: "Feb", revenue: finances.finances_available * 0.15, expenses: finances.finances_available * 0.12 },
    { month: "Mar", revenue: finances.finances_available * 0.25, expenses: finances.finances_available * 0.18 },
    { month: "Apr", revenue: finances.finances_available * 0.2, expenses: finances.finances_available * 0.14 },
    { month: "May", revenue: finances.finances_available * 0.18, expenses: finances.finances_available * 0.16 },
    { month: "Jun", revenue: finances.finances_available * 0.22, expenses: finances.finances_available * 0.12 },
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Financial Summary</CardTitle>
        <CardDescription>Monthly revenue and expenses</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#8884d8" />
            <Bar dataKey="expenses" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
