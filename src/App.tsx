import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Sidebar, Topbar } from "./components";
import Dashboard from "./pages/Dashboard";
import VerifyCertificates from "./pages/VerifyCertificates";
import Recents from "./pages/Recents";
// import Alerts from "./pages/";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import { LoginPage } from "./pages/Login";

export default function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto">
        <Topbar />
        <main className="p-6 md:p-8">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/verify" element={<VerifyCertificates />} />
            <Route path="/recents" element={<Recents />} />
            {/* <Route path="/alerts" element={<Alerts />} /> */}
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
