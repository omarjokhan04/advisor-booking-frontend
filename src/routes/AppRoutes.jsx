import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import StudentLayout from "../layouts/StudentLayout";
import AdvisorLayout from "../layouts/AdvisorLayout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

import FindAppointments from "../pages/FindAppointments";
import MyAppointments from "../pages/MyAppointments";

import Dashboard from "../pages/Dashboard";
import AdvisorSlots from "../pages/AdvisorSlots";
import AdvisorAppointments from "../pages/AdvisorAppointments";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ========== PUBLIC ========== */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* ========== STUDENT ========== */}
      <Route
        element={
          <ProtectedRoute role="student">
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/student/find" element={<FindAppointments />} />
        <Route path="/student/my" element={<MyAppointments />} />
      </Route>

      {/* ========== ADVISOR ========== */}
      <Route
        element={
          <ProtectedRoute role="advisor">
            <AdvisorLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/advisor/dashboard" element={<Dashboard />} />
        <Route path="/advisor/slots" element={<AdvisorSlots />} />
        <Route
          path="/advisor/appointments"
          element={<AdvisorAppointments />}
        />
      </Route>

      {/* ========== 404 ========== */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
