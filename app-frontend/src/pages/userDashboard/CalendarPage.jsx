import DashboardShell from "@/components/user/DashboardShell";
import DashboardHeader from "@/components/user/DashboardHeader";
import { Calendar } from "@/components/ui/calendar";

export default function CalendarPage() {
  return (
    <DashboardShell>
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
