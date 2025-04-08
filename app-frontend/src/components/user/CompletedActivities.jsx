import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import axios from "axios";
import useStore from "@/useStore";

export default function CompletedActivities({ className, refresh }) {
  const [completedActivities, setCompletedActivities] = useState([]);
  const user_id = useStore((state) => state.clientId);
  const getActivities = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/get_activities/${user_id}`
      );
      setCompletedActivities(res.data.completed_activities);
      console.log(res.data.completed_activities);
    } catch (error) {
      console.log("Error fetching activities:", error);
    }
  };

  useEffect(() => {
    getActivities();
  }, [user_id, refresh]);
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Completed Activities</CardTitle>
      </CardHeader>
      <CardContent>
        {completedActivities?.length > 0 ? (
          <div className="space-y-4">
            {completedActivities.map((activity, index) => (
              <div key={index} className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                <span className="text-sm">{activity.activity_name}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-[100px] items-center justify-center text-sm text-muted-foreground/80">
            No activities completed yet
          </div>
        )}
      </CardContent>
    </Card>
  );
}
