import DashboardShell from "@/components/user/DashboardShell";
import DashboardHeader from "@/components/user/DashboardHeader";
import Overview from "@/components/user/Overview";
import RecentActivity from "@/components/user/RecentActivity";
import MoodTracker from "@/components/user/MoodTracker";
import AssignedActivities from "@/components/user/AssignedActivities";
import CompletedActivities from "@/components/user/CompletedActivities";
import EarnedBadges from "@/components/user/EarnedBadges";
import QuickJournalEntry from "@/components/user/QuickJournalEntry";
import GoalsTracker from "@/components/user/GoalsTracker";
import WellnessQuote from "@/components/user/WellnessQuote";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import useStore from "../../useStore";
export default function Dashboard() {
  const clientId = useStore((state) => state.clientId);
  const firstName = useStore((state) => state.firstName);

  return (
    <DashboardShell>
      <Helmet>
        <title>User Dashboard</title>
        <meta
          name="description"
          content="Manage therapists on the Eunoia platform"
        />
      </Helmet>
      <DashboardHeader
        heading={`Welcome, ${firstName}`}
        text="Here's your wellness journey at a glance."
      >
        <WellnessQuote />
      </DashboardHeader>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Overview className="md:col-span-2 lg:col-span-4" />
        <MoodTracker className="md:col-span-2 lg:col-span-3" />
        <AssignedActivities className="md:col-span-2 lg:col-span-3" />
        <QuickJournalEntry className="md:col-span-2 lg:col-span-4" />
        <GoalsTracker className="md:col-span-2 lg:col-span-4" />
        <div className="space-y-6 md:col-span-2 lg:col-span-3">
          <CompletedActivities />
          <EarnedBadges />
        </div>
      </div>
      <RecentActivity className="mt-6" />
    </DashboardShell>
  );
}
