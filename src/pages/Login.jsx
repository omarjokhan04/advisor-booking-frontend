import { useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { setRole } from "../utils/auth";

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
    <Container className="py-5" style={{ maxWidth: 520 }}>
      <Card className="p-4 shadow-sm">
        <h2 className="text-center mb-1">Welcome Back</h2>
        <p className="text-center text-muted mb-4">
          Sign in to your account to continue
        </p>

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

        <div className="text-center mt-3">
          <small className="text-muted">
            Don't have an account? <Link to="/register">Create Account</Link>
          </small>
        </div>

        <Card className="mt-4 p-3 bg-light border-0">
          <strong>Demo Credentials:</strong>
          <div className="mt-2">
            <div>Student: <code>student@demo.com</code> / <code>password</code></div>
            <div>Advisor: <code>advisor@demo.com</code> / <code>password</code></div>
          </div>
        </Card>
      </Card>
    </Container>
  );
}
