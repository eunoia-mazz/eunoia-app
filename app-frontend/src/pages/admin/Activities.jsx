import React from "react";
import { Helmet } from "react-helmet";
import DashboardShell from "@/components/admin/DashboardShell";
import DashboardHeader from "@/components/admin/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const activities = [
  {
    id: 1,
    name: "Daily Meditation",
    category: "Mindfulness",
    duration: "10 min",
    difficulty: "Beginner",
  },
  {
    id: 2,
    name: "Gratitude Journal",
    category: "Journaling",
    duration: "5 min",
    difficulty: "All Levels",
  },
  {
    id: 3,
    name: "Breathing Exercises",
    category: "Stress Relief",
    duration: "5 min",
    difficulty: "Beginner",
  },
  {
    id: 4,
    name: "Progressive Muscle Relaxation",
    category: "Relaxation",
    duration: "15 min",
    difficulty: "Intermediate",
  },
];

export default function Activities() {
  return (
    <>
      <Helmet>
        <title>Activities | Admin Dashboard</title>
        <meta
          name="description"
          content="Manage activities on the Eunoia platform"
        />
      </Helmet>
      <DashboardShell>
        <DashboardHeader
          heading="Activities"
          text="Manage and create activities for users."
        >
          <Button
            size="sm"
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Add Activity
          </Button>
        </DashboardHeader>
        <Card>
          <CardHeader>
            <CardTitle>Activity List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>{activity.name}</TableCell>
                    <TableCell>{activity.category}</TableCell>
                    <TableCell>{activity.duration}</TableCell>
                    <TableCell>{activity.difficulty}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        className="bg-blue-500 mx-1 text-white hover:bg-blue-600"
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        className="bg-blue-500 mx-1 text-white hover:bg-blue-600"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </DashboardShell>
    </>
  );
}
