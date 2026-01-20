import { useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { setRole } from "../utils/auth";
//import AppNavbar from "../components/AppNavbar";
import "../css/Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.email.trim() || !form.password.trim()) {
      setError("Please fill in email and password.");
      return;
    }

    // Demo login (frontend only)
    if (form.email === "student@demo.com" && form.password === "password") {
      setRole("student");
      navigate("/student/find");
      return;
    }

    if (form.email === "advisor@demo.com" && form.password === "password") {
      setRole("advisor");
      navigate("/advisor/dashboard");
      return;
    }

    setError("Invalid demo credentials.");
  }

  return (
    <div className="login-page">
      

      <main className="login-main">
        <Container className="login-container">
          <Card className="login-card">
            <h2 className="login-title">Welcome Back</h2>
            <p className="login-subtitle">Sign in to your account to continue</p>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="loginEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="student@university.edu"
                  value={form.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="loginPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button type="submit" className="w-100">
                Login
              </Button>
            </Form>

            <div className="login-footer-text">
              <small>
                Don't have an account? <Link to="/register">Create Account</Link>
              </small>
            </div>

            <div className="login-demo">
              <strong>Demo Credentials:</strong>
              <div className="login-demo-list">
                <div>
                  Student: <code>student@demo.com</code> / <code>password</code>
                </div>
                <div>
                  Advisor: <code>advisor@demo.com</code> / <code>password</code>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </main>
    </div>
  );
}
