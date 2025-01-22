import { Link, useLocation } from "react-router-dom";
import {
  BarChart,
  Users,
  MessageSquare,
  UserPlus,
  DollarSign,
  Layout,
  Activity,
  Settings,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Home", href: "/", icon: Home },
  { title: "Dashboard", href: "/admin", icon: BarChart },
  { title: "Users", href: "/admin/users", icon: Users },
  { title: "Feedback", href: "/admin/feedback", icon: MessageSquare },
  { title: "Therapists", href: "/admin/therapists", icon: UserPlus },
  { title: "Finances", href: "/admin/finances", icon: DollarSign },
  { title: "Modules", href: "/admin/modules", icon: Layout },
  { title: "Activities", href: "/admin/activities", icon: Activity },
  { title: "Settings", href: "/admin/settings", icon: Settings },
];

function AdSidebar(props) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <Sidebar {...props}>
      <SidebarHeader className="p-4">
        <Link to="/admin" className="flex items-center space-x-2">
          <BarChart className="h-6 w-6 text-primary" />
          <span className="text-2xl font-bold">Admin Panel</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-4">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton>
                <Link
                  to={item.href}
                  className={`no-underline flex items-center space-x-3 rounded-lg px-3 py-2 transition-all hover:bg-accent ${
                    pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button variant="outline" className="w-full">
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
export default AdSidebar;
