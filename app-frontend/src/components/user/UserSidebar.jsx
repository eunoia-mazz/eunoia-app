import React from "react";
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom"; // Changed to react-router-dom
import {
  BarChart,
  Calendar,
  Settings,
  User,
  Activity,
  BookOpen,
  Award,
  Bell,
  LogOut,
  Home,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useStore from "@/useStore";
import axios from "axios";
// import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { title: "Home", href: "/", icon: Home },
  { title: "Dashboard", href: "/dashboard", icon: BarChart },
  { title: "Activities", href: "/dashboard/activities", icon: Activity },
  // { title: "Calendar", href: "/dashboard/calendar", icon: Calendar },
  { title: "Journal", href: "/dashboard/journal", icon: BookOpen },
  { title: "Forums", href: "/dashboard/forums", icon: MessageSquare },
  // { title: "Achievements", href: "/dashboard/achievements", icon: Award },
  { title: "Profile", href: "/dashboard/profile", icon: User },
  // { title: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function UserSidebar() {
  const location = useLocation(); // useLocation is the React Router equivalent of usePathname
  const { clearUserData } = useStore();
  const nav = useNavigate();
  const token = useStore((state) => {
    return state.token;
  });
  const logoutUser = () => {
    console.log(token);
    axios
      .post(
        `http://localhost:5000/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        clearUserData();
        nav("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <Bell className="h-6 w-6 text-primary" />
          <span className="text-2xl font-bold no-underline">Eunoia</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-4">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === item.href}
              >
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-3 rounded-lg px-3 py-2 transition-all hover:bg-accent no-underline",
                    location.pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  )}
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
        <Button onClick={logoutUser} variant="outline" className="w-full">
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

// Wrap your App component with the Router in your main entry file, like index.js
// Example:
// <Router>
//   <AppSidebar />
// </Router>
