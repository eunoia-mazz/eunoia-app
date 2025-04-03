import React, { useEffect, useState } from "react";
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

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeedbacks = () => {
    fetch("http://localhost:5000/list_reviews")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch reviews");
        return res.json();
      })
      .then((data) => {
        setFeedbacks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        setLoading(false);
      });
  };

  const handleRespond = (userId) => {
    // Opens mailto: link via backend route
    window.open(`http://localhost:5000/respond_to_review/${userId}`, "_blank");
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

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
            {loading ? (
              <p>Loading feedback...</p>
            ) : feedbacks.length === 0 ? (
              <p>No feedback found.</p>
            ) : (
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
                      <TableCell>
                        {feedback.first_name} {feedback.last_name}
                      </TableCell>
                      <TableCell>{feedback.reviewing_msg}</TableCell>
                      <TableCell>{feedback.rating} / 5</TableCell>
                      <TableCell>
                        {new Date(feedback.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          onClick={() => handleRespond(feedback.user_id)}
                          className="bg-blue-500 text-white hover:bg-blue-600"
                        >
                          Respond
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </DashboardShell>
    </>
  );
}
