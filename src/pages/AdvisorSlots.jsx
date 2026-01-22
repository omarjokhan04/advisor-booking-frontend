import { useEffect, useState } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import API_BASE from "../api";
import "../css/AdvisorSlots.css";

function getAdvisorId() {
  return Number(localStorage.getItem("advisor_id")) || 1;
}

// Add 1 hour to "HH:MM"
function addOneHour(time) {
  if (!time || typeof time !== "string") return time;
  const parts = time.split(":");
  if (parts.length < 2) return time;

  let h = Number(parts[0]);
  const m = parts[1];

  if (Number.isNaN(h)) return time;

  h = (h + 1) % 24;
  const hh = String(h).padStart(2, "0");
  return `${hh}:${m}`;
}

// Map backend slot to UI slot row
function mapAvailableSlot(s) {
  const start = String(s.slot_time).slice(0, 5);
  const end = addOneHour(start);

  return {
    id: s.slot_id,
    date: String(s.slot_date), // "YYYY-MM-DD"
    time: `${start} - ${end}`,
    location: s.location,
    status: s.status, // "Available"
  };
}

// Map advisor appointment to UI slot row (Booked/Completed/Canceled)
function mapAppointmentToSlotRow(a) {
  const start = String(a.slot_time).slice(0, 5);
  const end = addOneHour(start);

  return {
    id: `appt-${a.appointment_id}`, // unique in UI list
    date: String(a.slot_date),
    time: `${start} - ${end}`,
    location: a.location,
    status: a.status, // "Booked" | "Completed" | "Canceled"
    _appointment_id: a.appointment_id,
  };
}

export default function AdvisorSlots() {
  const [form, setForm] = useState({
    date: "",
    start: "",
    end: "",
    location: "",
  });

  const [slots, setSlots] = useState([]);

  // Load advisor slots (Available) + appointments (Booked/Completed/Canceled)
  useEffect(() => {
    const advisorId = getAdvisorId();

    async function loadData() {
      try {
        // 1) Available slots from /slots
        const slotsRes = await fetch(`${API_BASE}/slots?advisorId=${advisorId}`);
        const slotsData = await slotsRes.json();
        const available = Array.isArray(slotsData)
          ? slotsData.map(mapAvailableSlot)
          : [];

        // 2) Advisor appointments (Booked/Completed/Canceled)
        const apptRes = await fetch(`${API_BASE}/appointments/advisor/${advisorId}`);
        const apptData = await apptRes.json();
        const bookedRows = Array.isArray(apptData)
          ? apptData.map(mapAppointmentToSlotRow)
          : [];

        // Combine for UI display
        setSlots([...bookedRows, ...available]);
      } catch (err) {
        console.log(err);
      }
    }

    loadData();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  async function handleAdd(e) {
    e.preventDefault();

    if (!form.date || !form.start || !form.end || !form.location.trim()) return;

    const advisorId = getAdvisorId();

    try {
      // Backend stores one time -> we use start
      const res = await fetch(`${API_BASE}/slots`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          advisor_id: advisorId,
          slot_date: form.date,
          slot_time: form.start,
          location: form.location.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        
        console.log(data?.message || "Create slot failed");
        return;
      }

      // Add new Available slot to UI
      const newSlotRow = {
        id: data.slot_id,
        date: String(data.slot_date),
        time: `${String(data.slot_time).slice(0, 5)} - ${form.end}`,
        location: data.location,
        status: data.status, // "Available"
      };

      setSlots((prev) => [newSlotRow, ...prev]);
      setForm({ date: "", start: "", end: "", location: "" });
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete(id) {
    // Only real DB slots can be deleted (numeric slot_id)
    if (typeof id === "string" && id.startsWith("appt-")) return;

    try {
      const res = await fetch(`${API_BASE}/slots/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data?.message || "Delete failed");
        return;
      }

      setSlots((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  const statusClass = (status) => {
    if (status === "Booked") return "ms-badge-booked";
    if (status === "Available") return "ms-badge-available";
    return "ms-badge-canceled"; // Completed/Canceled
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
