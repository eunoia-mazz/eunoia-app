// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   Legend,
//   Tooltip,
// } from "recharts";

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6347"];

// export default function UserMoodDistribution({ className }) {
//   const [moodData, setMoodData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchMoodCounts = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/get_moods_counts"
//       );
//       if (response.status === 200) {
//         const moodCounts = response.data;
//         console.log("res", response);
//         const chartData = [
//           { name: "Happy", value: moodCounts.happy },
//           { name: "Sad", value: moodCounts.sad },
//           { name: "Neutral", value: moodCounts.neutral },
//           { name: "Anxious", value: moodCounts.anxious },
//         ];
//         setMoodData(chartData);
//       }
//     } catch (err) {
//       setError("Failed to fetch mood distribution data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMoodCounts();
//   }, []);

//   if (loading) {
//     return (
//       <Card className={className}>
//         <CardHeader>
//           <CardTitle>User Mood Distribution</CardTitle>
//           <CardDescription>Current mood distribution of users</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <p>Loading...</p>
//         </CardContent>
//       </Card>
//     );
//   }

//   if (error) {
//     return (
//       <Card className={className}>
//         <CardHeader>
//           <CardTitle>User Mood Distribution</CardTitle>
//           <CardDescription>Current mood distribution of users</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <p className="text-red-500">{error}</p>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <Card className={className}>
//       <CardHeader>
//         <CardTitle>User Mood Distribution</CardTitle>
//         <CardDescription>Current mood distribution of users</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ResponsiveContainer width="100%" height={300}>
//           <PieChart>
//             <Pie
//               data={moodData}
//               cx="50%"
//               cy="50%"
//               labelLine={false}
//               outerRadius={80}
//               fill="#8884d8"
//               dataKey="value"
//             >
//               {moodData.map((entry, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={COLORS[index % COLORS.length]}
//                 />
//               ))}
//             </Pie>
//             <Tooltip />
//             <Legend />
//           </PieChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   );
// }

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

const COLORS = [
  "#0088FE", // Happy
  "#00C49F", // Sad
  "#FFBB28", // Angry
  "#FF8042", // Calm
  "#FF6347", // Stressed
  "#AA00FF", // Excited
  "#8D6E63", // Bored
  "#FFD700", // Anxious
  "#4CAF50", // Content
];

const MOODS = [
  { key: "happy", label: "😊 Happy" },
  { key: "sad", label: "😞 Sad" },
  { key: "angry", label: "😡 Angry" },
  { key: "calm", label: "😌 Calm" },
  { key: "stressed", label: "😅 Stressed" },
  { key: "excited", label: "🤩 Excited" },
  { key: "bored", label: "😴 Bored" },
  { key: "anxious", label: "😬 Anxious" },
  { key: "content", label: "🥰 Content" },
];

export default function UserMoodDistribution({ className }) {
  const [moodData, setMoodData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMoodCounts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/get_moods_counts"
      );
      if (response.status === 200) {
        const moodCounts = response.data;
        const chartData = MOODS.map((mood) => ({
          name: mood.label,
          value: moodCounts[mood.key] || 0,
        }));
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
              outerRadius={100}
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
