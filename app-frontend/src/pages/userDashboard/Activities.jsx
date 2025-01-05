import DashboardShell from "@/components/user/DashboardShell";
import DashboardHeader from "@/components/user/DashboardHeader";
import AssignedActivities from "@/components/user/AssignedActivities";
import CompletedActivities from "@/components/user/CompletedActivities";
import { Helmet } from "react-helmet";

export function Activities() {
  return (
    <DashboardShell>
      <Helmet>
        <title>Activites | Dashboard</title>
        <meta
          name="description"
          content="Manage therapists on the Eunoia platform"
        />
      </Helmet>
      <DashboardHeader
        heading="Activities"
        text="Manage your assigned and completed activities."
      />
      <div className="grid gap-4 md:grid-cols-2">
        <AssignedActivities className="md:col-span-1" />
        <CompletedActivities className="md:col-span-1" />
      </div>
    </DashboardShell>
  );
}
