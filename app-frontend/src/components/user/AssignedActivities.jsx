import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const initialActivities = [
  { id: 1, name: "10-minute meditation", completed: false },
  { id: 2, name: "Write in gratitude journal", completed: false },
  { id: 3, name: "30-minute walk outside", completed: false },
  { id: 4, name: "Practice deep breathing", completed: false },
];

export default function AssignedActivities({ className }) {
  const [activities, setActivities] = useState(initialActivities);

  const handleMarkAsDone = (id) => {
    setActivities(
      activities.map((activity) =>
        activity.id === id ? { ...activity, completed: true } : activity
      )
    );
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Assigned Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between"
            >
              <span className="text-sm font-medium">{activity.name}</span>
              <Button
                className="text-black"
                variant="outline"
                size="sm"
                onClick={() => handleMarkAsDone(activity.id)}
                disabled={activity.completed}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                {activity.completed ? "Completed" : "Mark as Done"}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
