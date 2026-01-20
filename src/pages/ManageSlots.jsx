import { useState } from "react";
import { Card, Row, Col, Form, Button, Badge } from "react-bootstrap";

export default function ManageSlots() {
  const [form, setForm] = useState({
    date: "",
    start: "",
    end: "",
    location: "",
  });

  const [slots, setSlots] = useState([
    {
      id: 1,
      date: "Wed, Jan 15, 2025",
      time: "09:00 - 10:00",
      location: "Office 305",
      status: "Available",
    },
    {
      id: 2,
      date: "Wed, Jan 15, 2025",
      time: "10:00 - 10:30",
      location: "Zoom Meeting",
      status: "Booked",
    },
  ]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function handleAdd(e) {
    e.preventDefault();

    if (!form.date || !form.start || !form.end || !form.location.trim()) return;

    const newSlot = {
      id: Date.now(),
      date: form.date,
      time: `${form.start} - ${form.end}`,
      location: form.location,
      status: "Available",
    };

    setSlots((prev) => [newSlot, ...prev]);
    setForm({ date: "", start: "", end: "", location: "" });
  }

  function handleDelete(id) {
    setSlots((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <>
      <h1 className="mb-1">Manage Time Slots</h1>
      <p className="text-muted mb-4">
        Create and manage your available appointment slots
      </p>

      <Card className="mb-4">
        <Card.Body>
          <h5 className="mb-3">➕ Add New Time Slot</h5>

          <Form onSubmit={handleAdd}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="text"
                  name="date"
                  placeholder="01/20/2026"
                  value={form.date}
                  onChange={handleChange}
                />
              </Col>

              <Col md={6}>
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  placeholder="e.g. Office 305 or Zoom Meeting"
                  value={form.location}
                  onChange={handleChange}
                />
              </Col>

              <Col md={6}>
                <Form.Label>Start Time</Form.Label>
                <Form.Control
                  type="text"
                  name="start"
                  placeholder="09:00 AM"
                  value={form.start}
                  onChange={handleChange}
                />
              </Col>

              <Col md={6}>
                <Form.Label>End Time</Form.Label>
                <Form.Control
                  type="text"
                  name="end"
                  placeholder="10:00 AM"
                  value={form.end}
                  onChange={handleChange}
                />
              </Col>

              <Col className="d-flex justify-content-end">
                <Button type="submit">+ Add Time Slot</Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <h5 className="mb-3">Your Time Slots</h5>

          {slots.map((s) => (
            <div
              key={s.id}
              className="border rounded p-3 mb-3 d-flex justify-content-between align-items-center"
              style={{
                background:
                  s.status === "Available" ? "#eafff0" : "#eaf3ff",
              }}
            >
              <div>
                <div className="fw-bold">
                  {s.date} • {s.time} • {s.location}
                </div>
                <Badge bg={s.status === "Available" ? "success" : "primary"}>
                  {s.status}
                </Badge>
              </div>

              <Button
                variant="outline-danger"
                onClick={() => handleDelete(s.id)}
              >
                🗑️
              </Button>
            </div>
          ))}
        </Card.Body>
      </Card>
    </>
  );
}
