import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../Pages/Home";
import Blog from "../Component/Blog";
import About from "../Pages/About";
import ContactUs from "../Pages/contactUs";
import Event from "../Pages/event";
import PastPortfolio from "../Pages/pastPortfolio";
import AdminLayout from "../Pages/admin/pages";
import Login from "../Pages/admin/adminlogin/loginPage";
import Dashboard from "../Pages/admin/pages/dashboard";

import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import EventManagement from "../Pages/admin/pages/eventManagement";
import PastPortfolioManagement from "../Pages/admin/pages/pastPortfolioManagement";
import ProtectedRoute from "./protectedRoute";
import ContactUsManagement from "../Pages/admin/pages/contactUsManagement";
import Chatbotify from "../Component/simpleChatbot";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* Admin Routes */}

      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminLayout>
              <Routes>
                <Route path="/" element={<Navigate to="/admin/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/eventManagement" element={<EventManagement />} />
                <Route
                  path="/pastPortfolioManagenemt"
                  element={<PastPortfolioManagement />}
                />
                <Route
                  path="/inquiryManagement"
                  element={<ContactUsManagement />}
                />
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      {/* Public Routes */}
      <Route
        path="/*"
        element={
          <>
            <Navbar />
            <Chatbotify />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/past-portfolio" element={<PastPortfolio />} />
              <Route path="/event" element={<Event />} />
              <Route path="/about" element={<About />} />
              <Route path="/contactUs" element={<ContactUs />} />
              {/* Add more public routes here */}
            </Routes>
            <Footer />
          </>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
