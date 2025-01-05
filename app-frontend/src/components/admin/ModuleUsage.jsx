import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Adjust the import path based on your project structure
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// const data = [
//   { name: "Meditation", usage: 4000 },
//   { name: "Journaling", usage: 3000 },
//   { name: "Mood Tracking", usage: 2000 },
//   { name: "Therapy Sessions", usage: 2780 },
//   { name: "Goal Setting", usage: 1890 },
// ];
const data = [
  { name: "Meditation", usage: 4000 },
  { name: "Journaling", usage: 3000 },
  { name: "Mood Tracking", usage: 2000 },
  { name: "Therapy Sessions", usage: 2780 },
  { name: "Goal Setting", usage: 1890 },
];
export default function ModuleUsage({ className }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Module Usage</CardTitle>
        <CardDescription>Most accessed features and modules</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="vertical">
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
