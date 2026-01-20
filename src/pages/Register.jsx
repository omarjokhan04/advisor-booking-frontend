import { useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
//import AppNavbar from "../components/AppNavbar";
import "../css/Register.css";

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    studentId: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !form.fullName.trim() ||
      !form.studentId.trim() ||
      !form.email.trim() ||
      !form.password.trim() ||
      !form.confirmPassword.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Frontend only for now
    setSuccess("Account created (frontend only). You can login now.");
  }

  return (
    <div className="register-page">
     

      <main className="register-main">
        <Container className="register-container">
          <Card className="register-card">
            <h2 className="register-title">Create Account</h2>
            <p className="register-subtitle">
              Register as a student to book appointments
            </p>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="regFullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  value={form.fullName}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="regStudentId">
                <Form.Label>Student ID</Form.Label>
                <Form.Control
                  type="text"
                  name="studentId"
                  placeholder="STU123456"
                  value={form.studentId}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="regEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="student@university.edu"
                  value={form.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="regPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="At least 6 characters"
                  value={form.password}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="regConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button type="submit" className="w-100">
                Register
              </Button>
            </Form>

            <div className="register-footer-text">
              <small>
                Already have an account? <Link to="/login">Login</Link>
              </small>
            </div>
          </Card>
        </Container>
      </main>
    </div>
  );
}
