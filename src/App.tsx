import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Sidebar, Topbar } from "./components";
import Dashboard from "./pages/Dashboard";
import VerifyCertificates from "./pages/VerifyCertificates";
import Recents from "./pages/Recents";
// import Alerts from "./pages/Alerts";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import { LoginPage } from "./pages/Login";
import { RegisterPage } from "./pages/Register";
import Alerts from "./pages/Alerts";

export default function App() {
  return (
    <Routes>
      {/* Auth routes without sidebar/topbar */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected routes with sidebar/topbar layout */}
      <Route
        path="/*"
        element={
          <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-auto">
              <Topbar />
              <main className="p-6 md:p-8">
                <Routes>
                  <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                  />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/verify" element={<VerifyCertificates />} />
                  <Route path="/recents" element={<Recents />} />
                  <Route path="/alerts" element={<Alerts />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </main>
            </div>
          </div>
        }
      />
    </Routes>
  );
}
