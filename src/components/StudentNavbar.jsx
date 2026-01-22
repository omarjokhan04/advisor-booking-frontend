import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";
import { clearRole } from "../utils/auth";
import "../css/StudentNavbar.css";

export default function StudentNavbar() {
  const navigate = useNavigate();

  function handleLogout() {
    // clear role
    clearRole();

    // clear student info
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_email");

    localStorage.removeItem("student_id");
    localStorage.removeItem("student_name");
    localStorage.removeItem("student_email");

    // clear advisor info 
    localStorage.removeItem("advisor_id");
    localStorage.removeItem("advisor_name");
    localStorage.removeItem("advisor_email");

    navigate("/login");
  }

  return (
    <Navbar className="student-navbar" expand="md">
      <Container>
        {/* Left Brand */}
        <Navbar.Brand
          as={Link}
          to="/student/find"
          className="student-navbar-brand"
        >
          <span className="student-navbar-logo">
            <FaGraduationCap />
          </span>
          <span className="student-navbar-title">University Advisor</span>
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse className="justify-content-end">
          <Nav className="student-navbar-links">
            <NavLink to="/student/find" className="nav-link">
              Find Appointments
            </NavLink>

            <NavLink to="/student/my" className="nav-link">
              My Appointments
            </NavLink>

            <Button
              type="button"
              className="student-navbar-logout-btn"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
