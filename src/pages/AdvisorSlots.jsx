import { useState } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import "../css/AdvisorSlots.css";

export default function AdvisorSlots() {
  const [form, setForm] = useState({
    date: "",
    start: "",
    end: "",
    location: "",
  });

  const [slots, setSlots] = useState([
    {
      id: 1,
      date: "Wed, Jan 21, 2026",
      time: "09:00 - 10:00",
      location: "Office 305, Academic Building",
      status: "Booked",
    },
    {
      id: 2,
      date: "Wed, Jan 21, 2026",
      time: "14:00 - 15:00",
      location: "Zoom Meeting",
      status: "Available",
    },
    {
      id: 3,
      date: "Tue, Jan 27, 2026",
      time: "10:00 - 11:00",
      location: "Office 305, Academic Building",
      status: "Available",
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

  const statusClass = (status) => {
    if (status === "Booked") return "ms-badge-booked";
    if (status === "Available") return "ms-badge-available";
    return "ms-badge-canceled"; // if you ever add "Canceled"
  };

  return (
    <div className="ms-page">
      <h1 className="ms-title">Manage Time Slots</h1>
      <p className="ms-subtitle">
        Create and manage your available appointment slots
      </p>

      {/* Add New Time Slot */}
      <Card className="ms-card mb-4">
        <Card.Body className="ms-card-body">
          <div className="ms-card-head">
            <FiPlus className="ms-plus" />
            <span className="ms-card-head-text">Add New Time Slot</span>
          </div>

          <Form onSubmit={handleAdd}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Label className="ms-label">Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="ms-input"
                />
              </Col>

              <Col md={6}>
                <Form.Label className="ms-label">Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  placeholder="e.g., Office 305 or Zoom Meeting"
                  value={form.location}
                  onChange={handleChange}
                  className="ms-input"
                />
              </Col>

              <Col md={6}>
                <Form.Label className="ms-label">Start Time</Form.Label>
                <Form.Control
                  type="time"
                  name="start"
                  value={form.start}
                  onChange={handleChange}
                  className="ms-input"
                />
              </Col>

              <Col md={6}>
                <Form.Label className="ms-label">End Time</Form.Label>
                <Form.Control
                  type="time"
                  name="end"
                  value={form.end}
                  onChange={handleChange}
                  className="ms-input"
                />
              </Col>

              <Col className="d-flex justify-content-start">
                <Button type="submit" className="ms-add-btn">
                  <FiPlus style={{ marginRight: 8 }} />
                  Add Time Slot
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {/* Your Time Slots */}
      <Card className="ms-card">
        <Card.Body className="ms-card-body">
          <h5 className="ms-section-title">Your Time Slots</h5>

          <div className="ms-list">
            {slots.map((s) => (
              <div key={s.id} className="ms-row">
                <div className="ms-row-main">
                  <div className="ms-row-line">
                    <span className="ms-date">{s.date}</span>
                    <span className="ms-dot">•</span>
                    <span className="ms-time">{s.time}</span>
                    <span className="ms-dot">•</span>
                    <span className="ms-loc">{s.location}</span>
                  </div>

                  {/* ✅ Soft pill badge (matches your "needed" design) */}
                  <span className={`ms-badge ${statusClass(s.status)}`}>
                    {s.status}
                  </span>
                </div>

                <button
                  type="button"
                  className={`ms-trash ${
                    s.status === "Booked" ? "ms-trash-soft" : "ms-trash-strong"
                  }`}
                  onClick={() => handleDelete(s.id)}
                  aria-label="Delete slot"
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
