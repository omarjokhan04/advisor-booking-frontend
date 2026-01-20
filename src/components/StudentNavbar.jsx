import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { clearRole } from "../utils/auth";

export default function StudentNavbar() {
  const navigate = useNavigate();

  function handleLogout() {
    clearRole();
    navigate("/");
  }

  return (
    <Navbar bg="white" expand="lg" className="border-bottom" sticky="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/student/find">
          University Advisor
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="student-navbar" />
        <Navbar.Collapse id="student-navbar">
          <Nav className="ms-auto align-items-lg-center gap-lg-3">
            <Nav.Link as={NavLink} to="/student/find">
              Find Appointments
            </Nav.Link>
            <Nav.Link as={NavLink} to="/student/my">
              My Appointments
            </Nav.Link>

            <Button variant="outline-primary" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
