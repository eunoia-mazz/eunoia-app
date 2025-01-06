import React, { useState } from "react";
import DashboardShell from "@/components/user/DashboardShell";
import DashboardHeader from "@/components/user/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";

export const metadata = {
  title: "Profile | Mental Health Support",
  description: "Manage your profile settings",
};

export default function Profile() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [religion, setReligion] = useState("Islam");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send updated data to the backend here
    console.log("Saving profile:", { name, email, phone });
    // Example API call could go here like:
    // await api.updateProfile({ name, email, phone });

    alert("Profile updated!");
  };

  return (
    <DashboardShell>
      <Helmet>
        <title>Profile | Dashboard</title>
        <meta
          name="description"
          content="Manage therapists on the Eunoia platform"
        />
      </Helmet>
      <DashboardHeader
        heading="Profile"
        text="Manage your personal information and preferences."
      />
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="religion">Religion</Label>
              <Input
                id="religion"
                value={religion}
                onChange={(e) => setReligion(e.target.value)}
              />
            </div>
            <Button type="submit">Save Changes</Button>
          </form>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
