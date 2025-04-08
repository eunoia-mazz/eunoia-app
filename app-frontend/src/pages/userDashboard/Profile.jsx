import React, { useState } from "react";
import DashboardShell from "@/components/user/DashboardShell";
import DashboardHeader from "@/components/user/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";
import axios from "axios";
import useStore from "../../useStore";

export const metadata = {
  title: "Profile | Mental Health Support",
  description: "Manage your profile settings",
};

export default function Profile() {
  const client_id = useStore((state) => state.clientId);
  const [fname, setFName] = useState("Ammar");
  const [lname, setLName] = useState("Nadeem");
  // const [email, setEmail] = useState("ammar@example.com");
  const [phone, setPhone] = useState("");
  const [religion, setReligion] = useState("Islam");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving profile:", { fname, lname, phone, religion });
    axios
      .patch("http://localhost:5000/profile", {
        client_id,
        fname,
        lname,
        phone,
        religion,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
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
              <Label htmlFor="fname">First Name</Label>
              <Input
                id="fname"
                value={fname}
                onChange={(e) => setFName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lname">Last Name</Label>
              <Input
                id="lname"
                value={lname}
                onChange={(e) => setLName(e.target.value)}
              />
            </div>
            {/* <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div> */}
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                placeholder="1234-1234567"
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
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
