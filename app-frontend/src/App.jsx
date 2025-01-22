import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Chatbot from "./pages/user/chatbot/Chatbot";
import Navbar from "./components/molecules/Navbar";
import Footer from "./components/molecules/Footer";
import LandingPage from "./pages/user/LandingPage/LandingPage";
import AboutUs from "./pages/user/AboutUs/AboutUs";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Login_SignUp from "./pages/auth/Login_SignUp";
import Journal from "./pages/userDashboard/Journal";
import Articles from "./pages/user/Articles/Articles";
import Forum from "./pages/userDashboard/Forums";
import ForumDetail from "./pages/user/Forum/ForumDetail";
import Therapists from "./pages/user/Therapist/Therapists";
import TherapistProfile from "./pages/user/Therapist/TherapistProfile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Finances from "./pages/admin/Finances";
import Activities from "./pages/admin/Activities";
import User from "./pages/admin/User";
import Modules from "./pages/admin/Modules";
import Feedback from "./pages/admin/Feedback";
import { Therapist as AdminTherapist } from "./pages/admin/Therapist";
import Settings from "./pages/admin/Settings";
import Dashboard from "./pages/userDashboard/Dashboard";
import { Activities as UserActivites } from "./pages/userDashboard/Activities";
import Calendar from "./pages/userDashboard/CalendarPage";
import Profile from "./pages/userDashboard/Profile";
import { Settings as UserSettings } from "./pages/userDashboard/Settings";
import PrivacyPolicy from "./pages/Agreements/PrivacyPolicy";
import TermsOfService from "./pages/Agreements/TermsOfService";
import PageNotFound from "./pages/user/PageNotFound/PageNotFound.jsx";
// new
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import EmailSent from "./pages/auth/EmailSent";
import PasswordUpdated from "./pages/auth/PasswordUpdated";

function App() {
  const location = useLocation();
  const showNavbar =
    location.pathname !== "/chatbot" &&
    location.pathname !== "/signup" &&
    location.pathname !== "/login" &&
    location.pathname !== "/forgot-password" &&
    location.pathname !== "/forgot-password" &&
    !/\/dashboard(\/.*)?$/.test(location.pathname) &&
    !/\/admin(\/.*)?$/.test(location.pathname);

  return (
    <div className="">
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/password-updated" element={<PasswordUpdated />} />
        <Route path="/email-sent" element={<EmailSent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/therapist" element={<Therapists />} />
        <Route path="/therapist/:id" element={<TherapistProfile />} />

        {/* Admin  Dashboard*/}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/therapists" element={<AdminTherapist />} />
        <Route path="/admin/users" element={<User />} />
        <Route path="/admin/feedback" element={<Feedback />} />
        <Route path="/admin/finances" element={<Finances />} />
        <Route path="/admin/modules" element={<Modules />} />
        <Route path="/admin/activities" element={<Activities />} />
        <Route path="/admin/settings" element={<Settings />} />
        {/*  */}
        {/* User Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/activities" element={<UserActivites />} />
        <Route path="/dashboard/calendar" element={<Calendar />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/dashboard/settings" element={<UserSettings />} />
        <Route path="/dashboard/journal" element={<Journal />} />
        <Route path="/dashboard/forums" element={<Forum />} />
        <Route path="/dashboard/forum/:id" element={<ForumDetail />} />
        {/*  */}

        {/* Legal Agreements */}
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/termsOfService" element={<TermsOfService />} />

        {/* Page Not Found */}
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      {showNavbar && <Footer />}
    </div>
  );
}

export default App;
