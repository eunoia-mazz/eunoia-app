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
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
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
