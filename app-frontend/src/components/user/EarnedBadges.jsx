import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";
import axios from "axios";
import useStore from "@/useStore";

const badges = [
  { name: "Consistency Champion", description: "7-day streak" },
  { name: "Mindfulness Master", description: "Completed 10 meditations" },
  { name: "Gratitude Guru", description: "30 journal entries" },
  { name: "Mood Tracker", description: "Logged mood for 14 days" },
];

export default function EarnedBadges({ className }) {
  const user_id = useStore((state) => state.clientId);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/get_user_badges/${user_id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Earned Badges</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {badges.map((badge, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <Award className="h-8 w-8 text-yellow-500 mb-2" />
              <span className="text-sm font-medium">{badge.name}</span>
              <span className="text-xs text-muted-foreground">
                {badge.description}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
