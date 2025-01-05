// import {
//   Bar,
//   BarChart,
//   ResponsiveContainer,
//   XAxis,
//   YAxis,
//   Tooltip,
// } from "recharts";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// const moods = [
//   "😊",
//   "😞",
//   "😡",
//   "😅",
//   "😢",
//   "🥰",
//   "😎",
//   "😴",
//   "😌",
//   "🤔",
//   "😱",
//   "😜",
//   "🤗",
//   "😬",
//   "🥺",
//   "🤩",
// ];
// const data = [
//   { name: "Mon", mood: 4, activities: 2 },
//   { name: "Tue", mood: 3, activities: 3 },
//   { name: "Wed", mood: 5, activities: 1 },
//   { name: "Thu", mood: 2, activities: 4 },
//   { name: "Fri", mood: 4, activities: 3 },
//   { name: "Sat", mood: 5, activities: 2 },
//   { name: "Sun", mood: 4, activities: 5 },
// ];

// function Overview({ className }) {
//   return (
//     <Card className={className}>
//       <CardHeader>
//         <CardTitle>Weekly Overview</CardTitle>
//         <CardDescription>
//           Your mood and activities for the past week
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ResponsiveContainer width="100%" height={350}>
//           <BarChart data={data}>
//             <XAxis
//               dataKey="name"
//               stroke="#888888"
//               fontSize={12}
//               tickLine={false}
//               axisLine={false}
//             />
//             <YAxis
//               dataKey="activities"
//               stroke="#888888"
//               fontSize={12}
//               tickLine={false}
//               axisLine={false}
//               tickFormatter={(value) => `${value}`}
//             />
//             <Tooltip
//               contentStyle={{
//                 background: "rgba(255, 255, 255, 0.8)",
//                 border: "none",
//                 borderRadius: "4px",
//               }}
//               labelStyle={{ color: "#0f172a" }}
//             />
//             <Bar dataKey="mood" fill="#adfa1d" radius={[4, 4, 0, 0]} />
//             <Bar dataKey="activities" fill="#2563eb" radius={[4, 4, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   );
// }

// export default Overview;
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const moods = [
  "😊",
  "😞",
  "😡",
  "😅",
  "😢",
  "🥰",
  "😎",
  "😴",
  "😌",
  "🤔",
  "😱",
  "😜",
  "🤗",
  "😬",
  "🥺",
  "🤩",
];

const data = [
  { name: "Mon", mood: 4, activities: 2, emoji: "😢" },
  { name: "Tue", mood: 3, activities: 3, emoji: "😎" },
  { name: "Wed", mood: 5, activities: 1, emoji: "😊" },
  { name: "Thu", mood: 2, activities: 4, emoji: "😞" },
  { name: "Fri", mood: 4, activities: 3, emoji: "🥰" },
  { name: "Sat", mood: 5, activities: 2, emoji: "🤩" },
  { name: "Sun", mood: 4, activities: 5, emoji: "😴" },
];

function Overview({ className }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Weekly Overview</CardTitle>
        <CardDescription>
          Your mood and activities for the past week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tick={({ x, y, payload }) => {
                const item = data.find((d) => d.name === payload.value);
                return (
                  <g transform={`translate(${x},${y})`}>
                    <text
                      x={0}
                      y={10}
                      dy={16}
                      textAnchor="middle"
                      fill="#888888"
                      fontSize={12}
                    >
                      {payload.value}
                    </text>
                    <text
                      x={0}
                      y={30}
                      dy={16}
                      textAnchor="middle"
                      fontSize={16}
                      color="#000"
                    >
                      {item?.emoji}
                    </text>
                  </g>
                );
              }}
            />
            <YAxis
              dataKey="activities"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(255, 255, 255, 0.8)",
                border: "none",
                borderRadius: "4px",
              }}
              labelStyle={{ color: "#0f172a" }}
            />
            <Bar dataKey="mood" fill="#adfa1d" radius={[4, 4, 0, 0]} />
            <Bar dataKey="activities" fill="#2563eb" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default Overview;
