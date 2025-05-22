import React from "react";
import Journal from "./pages/userDashboard/Journal";
import Forum from "./pages/userDashboard/Forums";
import ForumDetail from "./pages/user/Forum/ForumDetail";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Finances from "./pages/admin/Finances";
import Activities from "./pages/admin/Activities";
import User from "./pages/admin/User";
import Modules from "./pages/admin/Modules";
import Feedback from "./pages/admin/Feedback";
import { Therapist as AdminTherapist } from "./pages/admin/Therapist";
import Settings from "./pages/admin/Settings";
import Dashboard from "./pages/userDashboard/Dashboard";
import Calendar from "./pages/userDashboard/CalendarPage";
import Profile from "./pages/userDashboard/Profile";
import { Settings as UserSettings } from "./pages/userDashboard/Settings";
import { Activities as UserActivites } from "./pages/userDashboard/Activities";
import Chatbot from "./pages/user/chatbot/Chatbot";

export const userRoutes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/dashboard/calendar", element: <Calendar /> },
  { path: "/dashboard/profile", element: <Profile /> },
  { path: "/dashboard/settings", element: <UserSettings /> },
  { path: "/dashboard/journal", element: <Journal /> },
  { path: "/dashboard/forums", element: <Forum /> },
  { path: "/dashboard/forum/:id", element: <ForumDetail /> },
  { path: "/dashboard/activities", element: <UserActivites /> },
  { path: "/chatbot", element: <Chatbot /> },
];

export const adminRoutes = [
  { path: "/admin", element: <AdminDashboard /> },
  { path: "/admin/therapists", element: <AdminTherapist /> },
  { path: "/admin/users", element: <User /> },
  { path: "/admin/feedback", element: <Feedback /> },
  { path: "/admin/finances", element: <Finances /> },
  { path: "/admin/modules", element: <Modules /> },
  { path: "/admin/activities", element: <Activities /> },
  { path: "/admin/settings", element: <Settings /> },
];
