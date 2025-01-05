import DashboardShell from "@/components/user/DashboardShell";
import DashboardHeader from "@/components/user/DashboardHeader";
import { Calendar } from "@/components/ui/calendar";
import { Helmet } from "react-helmet";

export default function CalendarPage() {
  return (
    <DashboardShell>
      <Helmet>
        <title>Calendar | Dashboard</title>
        <meta
          name="description"
          content="Manage therapists on the Eunoia platform"
        />
      </Helmet>
      <DashboardHeader
        heading="Calendar"
        text="View and manage your appointments and activities."
      />
      <div className="p-4 bg-white rounded-lg shadow">
        <Calendar />
      </div>
    </DashboardShell>
  );
}
