import { useState } from "react";
import { Container, Form, Button, Card, Row, Col, Alert } from "react-bootstrap";

export default function AdvisorSlots() {
  const [slots, setSlots] = useState([
    { id: 1, date: "2026-01-25", time: "10:00", status: "available" },
    { id: 2, date: "2026-01-26", time: "12:30", status: "available" },
  ]);

  const [form, setForm] = useState({ date: "", time: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleAddSlot(e) {
    e.preventDefault();
    setError("");

    if (!form.date || !form.time) {
      setError("Please choose date and time.");
      return;
    }

    const newSlot = {
      id: Date.now(),
      date: form.date,
      time: form.time,
      status: "available",
    };

    setSlots((prev) => [newSlot, ...prev]);
    setForm({ date: "", time: "" });
  }

  function handleDelete(id) {
    setSlots((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <Container className="py-4">
      <h1 className="mb-3">Advisor Slots</h1>
      <p className="text-muted">
        Part 04: Form + map() list rendering (frontend only).
      </p>

      {error && <Alert variant="danger">{error}</Alert>}

      <Card className="mb-4">
        <Card.Body>
          <Card.Title className="mb-3">Create New Slot</Card.Title>

          <Form onSubmit={handleAddSlot}>
            <Row className="g-3">
              <Col md={5}>
                <Form.Group controlId="slotDate">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={5}>
                <Form.Group controlId="slotTime">
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={2} className="d-flex align-items-end">
                <Button type="submit" className="w-100">
                  Add
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <h3 className="mb-3">Slots List</h3>

      {slots.length === 0 ? (
        <Alert variant="info">No slots yet.</Alert>
      ) : (
        <Row className="g-3">
          {slots.map((slot) => (
            <Col md={6} lg={4} key={slot.id}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    {slot.date} — {slot.time}
                  </Card.Title>
                  <Card.Text className="mb-3">
                    Status: <strong>{slot.status}</strong>
                  </Card.Text>

                  <Button
                    variant="outline-danger"
                    onClick={() => handleDelete(slot.id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
