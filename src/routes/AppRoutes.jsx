import { Routes, Route } from "react-router-dom";

// Public pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

// Student pages
import FindAppointments from "../pages/FindAppointments";
import MyAppointments from "../pages/MyAppointments";

// Navbar
import StudentNavbar from "../components/StudentNavbar";

// Route protection
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ===== Public Routes ===== */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ===== Student Routes ===== */}
      <Route
        path="/student/find"
        element={
          <ProtectedRoute role="student">
            <>
              <StudentNavbar />
              <FindAppointments />
            </>
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/my"
        element={
          <ProtectedRoute role="student">
            <>
              <StudentNavbar />
              <MyAppointments />
            </>
          </ProtectedRoute>
        }
      />

      {/* ===== Not Found ===== */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
