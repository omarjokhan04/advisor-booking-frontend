import { useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { setRole } from "../utils/auth";
import API_BASE from "../api";
import "../css/Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.email.trim() || !form.password.trim()) {
      setError("Please fill in email and password.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || "Login failed.");
        return;
      }

      // data should include: user_id, full_name, email, role
      const role = String(data.role || "").toLowerCase();

      
      setRole(role);

      // Store common info (needed by EmailJS + pages)
      localStorage.setItem("user_id", data.user_id);
      localStorage.setItem("user_name", data.full_name);
      localStorage.setItem("user_email", data.email);

      // Store role-specific ids 
      if (role === "student") {
        localStorage.setItem("student_id", data.user_id);
        localStorage.setItem("student_name", data.full_name);
        localStorage.setItem("student_email", data.email);
        navigate("/student/find");
        return;
      }

      if (role === "advisor") {
        localStorage.setItem("advisor_id", data.user_id);
        localStorage.setItem("advisor_name", data.full_name);
        localStorage.setItem("advisor_email", data.email);
        navigate("/advisor/dashboard");
        return;
      }

      // fallback if role is unexpected
      setError("Invalid role returned from server.");
    } catch (err) {
      console.log(err);
      setError("Server error. Please try again.");
    }
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

            
          </Card>
        </Container>
      </main>
    </div>
  );
}
