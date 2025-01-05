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
import ModuleUsage from "@/components/admin/ModuleUsage";
import DashboardShell from "@/components/admin/DashboardShell";
import DashboardHeader from "@/components/admin/DashboardHeader";

const modules = [
  { id: 1, name: "Meditation", status: "Active", lastUpdated: "2023-06-15" },
  { id: 2, name: "Mood Tracking", status: "Active", lastUpdated: "2023-06-14" },
  { id: 3, name: "Journaling", status: "Active", lastUpdated: "2023-06-13" },
  {
    id: 4,
    name: "Therapy Sessions",
    status: "Active",
    lastUpdated: "2023-06-12",
  },
];

export default function Modules() {
  return (
    <>
      <Helmet>
        <title>Modules | Admin Dashboard</title>
        <meta
          name="description"
          content="Manage modules and features on the Eunoia platform"
        />
      </Helmet>
      <DashboardShell>
        <DashboardHeader
          heading="Modules"
          text="Manage and monitor platform modules."
        >
          <Button>Add New Module</Button>
        </DashboardHeader>
        <div className="grid gap-6">
          <ModuleUsage />
          <Card>
            <CardHeader>
              <CardTitle>Module List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {modules.map((module) => (
                    <TableRow key={module.id}>
                      <TableCell>{module.name}</TableCell>
                      <TableCell>{module.status}</TableCell>
                      <TableCell>{module.lastUpdated}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" className="mr-2">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Disable
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </DashboardShell>
    </>
  );
}
