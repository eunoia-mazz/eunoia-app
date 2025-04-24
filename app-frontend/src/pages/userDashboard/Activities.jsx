import DashboardShell from "@/components/user/DashboardShell";
import DashboardHeader from "@/components/user/DashboardHeader";
import AssignedActivities from "@/components/user/AssignedActivities";
import CompletedActivities from "@/components/user/CompletedActivities";
import { Helmet } from "react-helmet";
import { useState } from "react";

export function Activities() {
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => {
    setRefresh((prev) => !prev);
  };
  return (
    <div className="p-5 bg-blue-50 min-h-screen">
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
          <AssignedActivities
            className="md:col-span-1"
            onActivityCompleted={triggerRefresh}
          />
          <CompletedActivities className="md:col-span-1" refresh={refresh} />
        </div>
      </DashboardShell>
    </div>
  );
}
