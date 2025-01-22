import React from "react";

const activities = [
  { id: 1, name: "Daily Meditation", engagement: 78, completionRate: 65 },
  { id: 2, name: "Gratitude Journal", engagement: 62, completionRate: 58 },
  { id: 3, name: "Breathing Exercises", engagement: 85, completionRate: 80 },
  { id: 4, name: "Mood Check-in", engagement: 92, completionRate: 88 },
  { id: 5, name: "Sleep Tracker", engagement: 70, completionRate: 62 },
];
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function ActivityEngagement({ className }) {
  return (
    <div className={`card ${className || ""}`}>
      <div className="card-header flex flex-row items-center justify-between pb-2 ">
        <div>
          <h2 className="card-title font-bold text-lg">Activity Engagement</h2>
          <p className="card-description font-normal text-sm">
            User engagement with various activities
          </p>
        </div>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Activity Name</TableCell>
              <TableCell>Engagement Rate (%)</TableCell>
              <TableCell>Completion Rate (%)</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>{activity.name}</TableCell>
                <TableCell>{activity.engagement}%</TableCell>
                <TableCell>{activity.completionRate}%</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mr-2 bg-blue-500 text-white"
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
