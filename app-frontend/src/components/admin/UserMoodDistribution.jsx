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

// Sample data representing the mood distribution of users
const data = [
  { name: "Happy", value: 400 },
  { name: "Sad", value: 300 },
  { name: "Neutral", value: 300 },
  { name: "Anxious", value: 200 },
];

// Color set for each mood slice
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function UserMoodDistribution({ className }) {
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
              data={data}
              cx="50%" // Center the pie chart
              cy="50%" // Center the pie chart vertically
              labelLine={false} // Disable lines between slices and labels
              outerRadius={80} // Set radius of pie slices
              fill="#8884d8" // Default color for slices (overridden by Cell below)
              dataKey="value" // Key used to determine the value of each slice
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                /> // Color slices
              ))}
            </Pie>
            <Tooltip /> // Show value and name when hovered over the slices
            <Legend /> // Show legend for each color with its label (mood)
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
