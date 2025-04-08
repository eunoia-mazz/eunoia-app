import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; // Adjust the import path based on your project structure
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios"; 

export default function ModuleUsage({ className }) {
  const [modulesData, setModulesData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const fetchVisitStats = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get_visit_stats"); 
      if (response.status === 200) {
        const formattedData = response.data.map((module) => ({
          name: module.module_name,
          usage: module.visit_count,
        }));
        setModulesData(formattedData); 
      }
    } catch (err) {
      setError("Failed to fetch module visit data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitStats(); 
  }, []);

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Module Usage</CardTitle>
          <CardDescription>Most accessed features and modules</CardDescription>
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
          <CardTitle>Module Usage</CardTitle>
          <CardDescription>Most accessed features and modules</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Module Usage</CardTitle>
        <CardDescription>Most accessed features and modules</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={modulesData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis tick={{ fontSize: 11 }} dataKey="name" type="category" />
            <Tooltip />
            <Bar dataKey="usage" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
