import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";
import useStore from "@/useStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Overview({ className }) {
  const user_id = useStore((state) => state.clientId);
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/${user_id}/weekly_moods`)
      .then((res) => {
        const formattedData = Object.keys(res.data.weekly_moods).map((day) => {
          const dayData = res.data.weekly_moods[day];
          const moodCount = {
            happy: 0,
            sad: 0,
            angry: 0,
            calm: 0,
            stressed: 0,
            excited: 0,
            bored: 0,
            anxious: 0,
            content: 0,
          };

          dayData.all_moods.forEach((mood) => {
            if (moodCount.hasOwnProperty(mood)) {
              moodCount[mood] += 1;
            }
          });

          return {
            name: day,
            ...moodCount,
            overall_mood: dayData.overall_mood, // Optional: for further display
          };
        });

        setWeeklyData(formattedData);
      })
      .catch((err) => {
        console.log("Error fetching mood data: ", err);
      });
  }, [user_id]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Weekly Mood Overview</CardTitle>
        <CardDescription>Your mood breakdown for the past week</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={weeklyData}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(255, 255, 255, 0.8)",
                border: "none",
                borderRadius: "4px",
              }}
              labelStyle={{ color: "#0f172a" }}
            />
            <Legend />
            <Bar dataKey="happy" stackId="a" fill="#fcbf49" />
            <Bar dataKey="sad" stackId="a" fill="#f72585" />
            <Bar dataKey="angry" stackId="a" fill="#e63946" />
            <Bar dataKey="calm" stackId="a" fill="#1d3557" />
            <Bar dataKey="stressed" stackId="a" fill="#ff7f50" />
            <Bar dataKey="excited" stackId="a" fill="#2a9d8f" />
            <Bar dataKey="bored" stackId="a" fill="#8a2be2" />
            <Bar dataKey="anxious" stackId="a" fill="#6a5acd" />
            <Bar dataKey="content" stackId="a" fill="#00bcd4" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default Overview;
