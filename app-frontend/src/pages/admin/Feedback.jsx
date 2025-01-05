import React from "react";
import { Helmet } from "react-helmet";
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
import DashboardShell from "@/components/admin/DashboardShell";
import DashboardHeader from "@/components/admin/DashboardHeader";

const feedbacks = [
  {
    id: 1,
    user: "Alice Johnson",
    content: "Great app! Really helping me track my mood.",
    rating: 5,
    date: "2023-06-15",
  },
  {
    id: 2,
    user: "Bob Smith",
    content: "The meditation exercises are fantastic.",
    rating: 4,
    date: "2023-06-14",
  },
  {
    id: 3,
    user: "Charlie Brown",
    content: "Could use more personalization options.",
    rating: 3,
    date: "2023-06-13",
  },
];

export default function Feedback() {
  return (
    <>
      <Helmet>
        <title>Feedback | Admin Dashboard</title>
        <meta
          name="description"
          content="Manage user feedback and reviews on the Eunoia platform"
        />
      </Helmet>
      <DashboardShell>
        <DashboardHeader
          heading="Feedback"
          text="Manage and review user feedback."
        />
        <Card>
          <CardHeader>
            <CardTitle>Recent Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Feedback</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {feedbacks.map((feedback) => (
                  <TableRow key={feedback.id}>
                    <TableCell>{feedback.user}</TableCell>
                    <TableCell>{feedback.content}</TableCell>
                    <TableCell>{feedback.rating} / 5</TableCell>
                    <TableCell>{feedback.date}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Respond
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
