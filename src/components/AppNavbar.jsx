import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";
import "../css/AppNavbar.css";

export default function AppNavbar() {
  return (
    <Navbar className="app-navbar" expand="md">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/" className="app-navbar-brand">
          <span className="app-navbar-logo">
            <FaGraduationCap />
          </span>
          <span className="app-navbar-title">University Advisor</span>
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse className="justify-content-end">
          <Nav className="app-navbar-links">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>

            <NavLink to="/student/find" className="nav-link">
              Book Appointment
            </NavLink>

            <Button
              as={Link}
              to="/login"
              className="app-navbar-login-btn"
            >
              Login
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
