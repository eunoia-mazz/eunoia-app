import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import useStore from "@/useStore";
import axios from "axios";

export default function AssignedActivities({ className, onActivityCompleted }) {
  const [activities, setActivities] = useState([]);
  const user_id = useStore((state) => state.clientId);
  const getActivities = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/get_activities/${user_id}`
      );
      setActivities(res.data.assigned_activities);
      console.log("res", res.data.assigned_activities[0]);
    } catch (error) {
      console.log("Error fetching activities:", error);
    }
  };

  useEffect(() => {
    getActivities();
  }, [user_id]);

  const handleMarkAsDone = async (id) => {
    try {
      axios
        .post(`http://localhost:5000/mark_activity_as_done`, {
          user_id,
          activity_id: id,
        })
        .then((res) => {
          console.log(res);
          onActivityCompleted();
        })
        .catch((err) => {
          console.log(err);
        });

      setActivities(
        activities.map((activity) =>
          activity.activity_id === id
            ? { ...activity, completed: true }
            : activity
        )
      );
    } catch (error) {
      console.log("Error updating activity:", error);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Assigned Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities?.length > 0 ? (
            <div className="space-y-4">
              {activities &&
                activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm font-medium">
                      {activity.activity_name}
                    </span>
                    <Button
                      className="text-black"
                      variant="outline"
                      size="sm"
                      onClick={() => handleMarkAsDone(activity.activity_id)}
                      // disabled={activity.completed}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      {activity.completed ? "Completed" : "Mark as Done"}
                    </Button>
                  </div>
                ))}
            </div>
          ) : (
            <div className="flex h-[100px] items-center justify-center text-sm  text-muted-foreground/80">
              No activities to show
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
