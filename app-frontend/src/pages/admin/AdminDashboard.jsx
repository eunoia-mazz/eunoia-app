import React from "react";
import { Helmet } from "react-helmet";
import DashboardShell from "../../components/admin/DashboardShell";
import DashboardHeader from "../../components/admin/DashboardHeader";
import UserGrowth from "../../components/admin/UserGrowth";
import UserMoodDistribution from "../../components/admin/UserMoodDistribution";
import RecentFeedback from "../../components/admin/RecentFeedback";
import TherapistOverview from "../../components/admin/TherapistOverview";
import FinancialSummary from "../../components/admin/FinancialSummary";
import ModuleUsage from "../../components/admin/ModuleUsage";
import ActivityEngagement from "../../components/admin/ActivityEngagement";
import useStore from "../../useStore";
import AdSidebar from "../../components/admin/AdSidebar";
// import { Button } from "./components/ui/button";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const firstName = useStore((state) => state.firstName);
  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Eunoia</title>
        <meta
          name="description"
          content="Admin dashboard for Eunoia mental health platform"
        />
      </Helmet>
      <DashboardShell>
        <DashboardHeader
          heading="Admin Dashboard"
          text={`Welcome back, ${firstName} Here's an overview of Eunoia's performance.`}
        ></DashboardHeader>
        <div className="flex flex-wrap gap-6">
          <div className="flex-grow md:basis-[50%] lg:basis-[42.14%]">
            <UserGrowth />
          </div>
          <div className="flex-grow md:basis-[50%] lg:basis-[42.86%]">
            <UserMoodDistribution />
          </div>
          <div className="flex-grow md:basis-[50%] lg:basis-[42.86%]">
            <RecentFeedback />
          </div>
          <div className="flex-grow md:basis-[50%] lg:basis-[42.14%]">
            <TherapistOverview />
          </div>
          <div className="flex-grow md:basis-[50%] lg:basis-[42.14%]">
            <FinancialSummary />
          </div>
          <div className="flex-grow md:basis-[50%] lg:basis-[42.86%]">
            <ModuleUsage />
          </div>
          <div className="flex-grow lg:basis-full">
            <ActivityEngagement />
          </div>
        </div>
      </DashboardShell>
    </>
  );
}
