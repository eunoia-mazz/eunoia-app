import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const recentActivities = [
  { action: "Completed meditation", time: "2 hours ago" },
  { action: "Logged mood", time: "5 hours ago" },
  { action: "Finished journaling", time: "Yesterday" },
  { action: "Attended therapy session", time: "2 days ago" },
];

export default function RecentActivity({ className }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm font-medium">{activity.action}</span>
              <span className="text-xs text-muted-foreground">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
