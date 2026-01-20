import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "student",
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

    if (!form.fullName.trim() || !form.email.trim() || !form.password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    // Part 03: no backend yet (we will connect later using axios)
    setSuccess(`Register submitted as ${form.role} (frontend only).`);
    // console.log("REGISTER:", form);
  }

  return (
    <Container className="py-4" style={{ maxWidth: 520 }}>
      <h1 className="mb-3">Register</h1>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="regName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={form.fullName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="regEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="name@example.com"
            value={form.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="regPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="regRole">
          <Form.Label>Role</Form.Label>
          <Form.Select name="role" value={form.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="advisor">Advisor</option>
          </Form.Select>
        </Form.Group>

        <Button type="submit" className="w-100">
          Create Account
        </Button>
      </Form>
    </Container>
  );
}
