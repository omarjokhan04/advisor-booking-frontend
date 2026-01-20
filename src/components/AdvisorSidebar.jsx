import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { clearRole } from "../utils/auth";

const linkClass = ({ isActive }) =>
  `d-block px-3 py-2 rounded text-decoration-none ${
    isActive ? "bg-primary text-white" : "text-dark"
  }`;

export default function AdvisorSidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    clearRole();
    navigate("/");
  }

  return (
    <div
      className="border-end bg-white"
      style={{ width: 260, minHeight: "100vh", padding: 16 }}
    >
      <div className="mb-4">
        <div className="fw-bold">Advisor Portal</div>
        <div className="text-muted" style={{ fontSize: 13 }}>
          University Advisor
        </div>
      </div>

      <div className="p-3 bg-light rounded mb-4">
        <div className="text-muted" style={{ fontSize: 13 }}>
          Welcome,
        </div>
        <div className="fw-bold">Advisor</div>
      </div>

      <div className="d-grid gap-2">
        <NavLink to="/advisor/dashboard" className={linkClass}>
          📊 Dashboard
        </NavLink>

        <NavLink to="/advisor/slots" className={linkClass}>
          🗓️ Manage Slots
        </NavLink>

        <NavLink to="/advisor/appointments" className={linkClass}>
          👥 Appointments
        </NavLink>
      </div>

      <div className="mt-auto" style={{ position: "absolute", bottom: 16, width: 228 }}>
        <Button variant="outline-primary" className="w-100" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}
