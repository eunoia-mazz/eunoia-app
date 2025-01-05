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
import DashboardHeader from "@/components/admin/DashboardHeader";
import DashboardShell from "@/components/admin/DashboardShell";

const therapists = [
  {
    id: 1,
    name: "Dr. Emily Johnson",
    specialization: "Anxiety & Depression",
    patients: 28,
    status: "Active",
  },
  {
    id: 2,
    name: "Dr. Michael Lee",
    specialization: "PTSD",
    patients: 22,
    status: "Active",
  },
  {
    id: 3,
    name: "Dr. Sarah Williams",
    specialization: "Relationship Counseling",
    patients: 25,
    status: "On Leave",
  },
];

export function Therapist() {
  return (
    <>
      <Helmet>
        <title>Therapists | Admin Dashboard</title>
        <meta
          name="description"
          content="Manage therapists on the MindfulMe platform"
        />
      </Helmet>
      <DashboardShell>
        <DashboardHeader
          heading="Therapists"
          text="Manage and monitor therapist accounts."
        >
          <Button>Add Therapist</Button>
        </DashboardHeader>
        <Card>
          <CardHeader>
            <CardTitle>Therapist List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Patients</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {therapists.map((therapist) => (
                  <TableRow key={therapist.id}>
                    <TableCell>{therapist.name}</TableCell>
                    <TableCell>{therapist.specialization}</TableCell>
                    <TableCell>{therapist.patients}</TableCell>
                    <TableCell>{therapist.status}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="mr-2">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        View Patients
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
