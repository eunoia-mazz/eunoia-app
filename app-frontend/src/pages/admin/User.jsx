import DashboardHeader from "@/components/admin/DashboardHeader";
import DashboardShell from "@/components/admin/DashboardShell";
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

function User() {
  const users = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      joinDate: "2023-01-15",
      status: "Active",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      joinDate: "2023-02-20",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Charlie Brown",
      email: "charlie@example.com",
      joinDate: "2023-03-10",
      status: "Active",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Users | Admin Dashboard</title>
        <meta
          name="description"
          content="Manage therapists on the Eunoia platform"
        />
      </Helmet>
      <DashboardShell>
        <DashboardHeader
          heading="Users"
          text="Manage and monitor user accounts."
        />
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                    <TableCell>{user.status}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        className="bg-blue-500 text-white hover:bg-blue-600"
                      >
                        Edit
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

export default User;
