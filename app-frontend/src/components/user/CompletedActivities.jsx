import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const completedActivities = [
  "Morning meditation",
  "Journaling session",
  "Yoga practice",
  "Mindful eating exercise",
];

export default function CompletedActivities({ className }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Completed Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {completedActivities.map((activity, index) => (
            <div key={index} className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
              <span className="text-sm">{activity}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
