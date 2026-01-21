import { NavLink, useNavigate } from "react-router-dom";
import { clearRole } from "../utils/auth";
import { FiLogOut, FiGrid, FiCalendar, FiUsers } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
import "../css/AdvisorSidebar.css";

function getAdvisorName() {
  return localStorage.getItem("advisor_name") || "Advisor";
}

export default function AdvisorSidebar() {
  const navigate = useNavigate();
  const advisorName = getAdvisorName();

  function logout() {
    // clear role
    clearRole();

    // clear all stored user info
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_email");

    localStorage.removeItem("advisor_id");
    localStorage.removeItem("advisor_name");
    localStorage.removeItem("advisor_email");

    localStorage.removeItem("student_id");
    localStorage.removeItem("student_name");
    localStorage.removeItem("student_email");

    navigate("/");
  }

  const linkClass = ({ isActive }) =>
    `asb-link ${isActive ? "asb-link-active" : ""}`;

  return (
    <aside className="asb">
      {/* Top: Logo + Title */}
      <div className="asb-top">
        <div className="asb-logo">
          <FaGraduationCap />
        </div>
        <div>
          <div className="asb-title">Advisor Portal</div>
        </div>
      </div>

      {/* Welcome */}
      <div className="asb-welcome">
        <div className="asb-welcome-muted">Welcome,</div>
        <div className="asb-welcome-name">Dr. {advisorName}</div>
      </div>

      {/* Nav */}
      <nav className="asb-nav">
        <NavLink to="/advisor/dashboard" className={linkClass}>
          <span className="asb-icon">
            <FiGrid />
          </span>
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/advisor/slots" className={linkClass}>
          <span className="asb-icon">
            <FiCalendar />
          </span>
          <span>Manage Slots</span>
        </NavLink>

        <NavLink to="/advisor/appointments" className={linkClass}>
          <span className="asb-icon">
            <FiUsers />
          </span>
          <span>Appointments</span>
        </NavLink>
      </nav>

      {/* Bottom */}
      <div className="asb-bottom">
        <button type="button" className="asb-logout" onClick={logout}>
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
