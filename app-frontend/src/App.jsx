import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Chatbot from "./pages/user/chatbot/Chatbot";
import Navbar from "./components/molecules/Navbar";
import Footer from "./components/molecules/Footer";
// import Forums from "./pages/user/Forums";
import LandingPage from "./pages/user/LandingPage/LandingPage";
import AboutUs from "./pages/user/AboutUs/AboutUs";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Journal from "./pages/user/Journal/Journal";
import Articles from "./pages/user/Articles/Articles";
import Forum from "./pages/user/Forum/Forum";
import ForumDetail from "./pages/user/Forum/ForumDetail";
import Therapists from "./pages/user/Therapist/Therapists";
import TherapistProfile from "./pages/user/Therapist/TherapistProfile";

function App() {
  const location = useLocation();
  const noHeaderFooterPaths = ["/chatbot", "/auth/login", "/auth/signup"];
  const showNavbar = !noHeaderFooterPaths.includes(location.pathname);

  return (
    <div className="">
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/forums" element={<Forum />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/articles" element={<Articles />} />
        {/* <Route path="/forum" element={<Forum />} /> */}
        <Route path="/forum/:id" element={<ForumDetail />} />
        <Route path="/therapist" element={<Therapists />} />
        <Route path="/therapist/:id" element={<TherapistProfile />} />
      </Routes>
      {showNavbar && <Footer />}
    </div>
  );
}

export default App;
