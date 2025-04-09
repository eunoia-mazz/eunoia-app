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
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6347"];

export default function UserMoodDistribution({ className }) {
  const [moodData, setMoodData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMoodCounts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get_moods_counts");
      if (response.status === 200) {
        const moodCounts = response.data;
        const chartData = [
          { name: "Happy", value: moodCounts.happy },
          { name: "Sad", value: moodCounts.sad },
          { name: "Neutral", value: moodCounts.neutral },
          { name: "Anxious", value: moodCounts.anxious },
        ];
        setMoodData(chartData);
      }
    } catch (err) {
      setError("Failed to fetch mood distribution data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoodCounts();
  }, []);

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>User Mood Distribution</CardTitle>
          <CardDescription>Current mood distribution of users</CardDescription>
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
          <CardTitle>User Mood Distribution</CardTitle>
          <CardDescription>Current mood distribution of users</CardDescription>
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
        <CardTitle>User Mood Distribution</CardTitle>
        <CardDescription>Current mood distribution of users</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={moodData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {moodData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
