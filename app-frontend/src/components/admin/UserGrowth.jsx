"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios"; 

export default function UserGrowth({ className }) {
  const [growthData, setGrowthData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const fetchUserGrowth = async () => {
    try {
      const response = await axios.get("http://localhost:5000/user_growth");
      if (response.status === 200) {
        setGrowthData(response.data); 
      }
    } catch (err) {
      setError("Failed to fetch user growth data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserGrowth(); 
  }, []);

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>User Growth</CardTitle>
          <CardDescription>Number of users over time</CardDescription>
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
          <CardTitle>User Growth</CardTitle>
          <CardDescription>Number of users over time</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }

  const chartData = growthData.map((monthData) => {
    const monthName = Object.keys(monthData)[0]; 
    return {
      name: monthName,
      users: monthData[monthName] || 0, 
    };
  });

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>User Growth</CardTitle>
        <CardDescription>Number of users over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
