import React from "react";
import DashboardShell from "@/components/user/DashboardShell";
import DashboardHeader from "@/components/user/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
import { Switch } from "@mui/material";
import { Helmet } from "react-helmet";

export function Settings() {
  return (
    <DashboardShell>
      <Helmet>
        <title>Settings | Dashboard</title>
        <meta
          name="description"
          content="Manage therapists on the Eunoia platform"
        />
      </Helmet>
      <DashboardHeader
        heading="Settings"
        text="Manage your account settings and preferences."
      />
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications">Email Notifications</Label>
            <Switch defaultChecked id="email-notifications" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="sms-notifications">SMS Notifications</Label>
            <Switch id="sms-notifications" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="push-notifications">Push Notifications</Label>
            <Switch id="push-notifications" />
          </div>
          <div className="flex items-center justify-between">
            <CardTitle>Location</CardTitle>
            <Switch id="location" />
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
