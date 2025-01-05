"use client";

import React from "react";
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

// Data for the chart
const data = [
  { name: "Jan", users: 4000 },
  { name: "Feb", users: 5000 },
  { name: "Mar", users: 6000 },
  { name: "Apr", users: 7000 },
  { name: "May", users: 8500 },
  { name: "Jun", users: 10000 },
];

export default function UserGrowth({ className }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>User Growth</CardTitle>
        <CardDescription>Number of users over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
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
