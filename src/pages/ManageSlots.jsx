import { useEffect, useState } from "react";
import { Card, Row, Col, Form, Button, Badge } from "react-bootstrap";
import API_BASE from "../api";

function getAdvisorId() {
  return Number(localStorage.getItem("advisor_id")) || 1;
}

function addOneHour(time) {
  if (!time || typeof time !== "string") return time;
  const parts = time.split(":");
  if (parts.length < 2) return time;
  let h = Number(parts[0]);
  const m = parts[1];
  if (Number.isNaN(h)) return time;
  h = (h + 1) % 24;
  return `${String(h).padStart(2, "0")}:${m}`;
}

// Available slots from backend
function mapAvailableSlot(s) {
  const start = String(s.slot_time).slice(0, 5);
  const end = addOneHour(start);

  return {
    id: s.slot_id,
    date: String(s.slot_date), // YYYY-MM-DD
    time: `${start} - ${end}`,
    location: s.location,
    status: s.status, // Available
  };
}

// Booked/Completed/Canceled from appointments
function mapAppointmentToSlotRow(a) {
  const start = String(a.slot_time).slice(0, 5);
  const end = addOneHour(start);

  return {
    id: `appt-${a.appointment_id}`,
    date: String(a.slot_date),
    time: `${start} - ${end}`,
    location: a.location,
    status: a.status,
  };
}

export default function ManageSlots() {
  const [form, setForm] = useState({
    date: "",
    start: "",
    end: "",
    location: "",
  });

  const [slots, setSlots] = useState([]);

  async function loadData() {
    const advisorId = getAdvisorId();

    try {
      const slotsRes = await fetch(`${API_BASE}/slots?advisorId=${advisorId}`);
      const slotsData = await slotsRes.json();
      const available = Array.isArray(slotsData)
        ? slotsData.map(mapAvailableSlot)
        : [];

      const apptRes = await fetch(`${API_BASE}/appointments/advisor/${advisorId}`);
      const apptData = await apptRes.json();
      const bookedRows = Array.isArray(apptData)
        ? apptData.map(mapAppointmentToSlotRow)
        : [];

      setSlots([...bookedRows, ...available]);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
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
      const res = await fetch(`${API_BASE}/slots`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          advisor_id: advisorId,
          slot_date: form.date,     // YYYY-MM-DD
          slot_time: form.start,    // HH:MM
          location: form.location.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data?.message || "Create slot failed");
        return;
      }

      setForm({ date: "", start: "", end: "", location: "" });

      // Instructor-style: refresh from DB (no fake local state)
      await loadData();
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete(id) {
    // prevent deleting appointment rows
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

      // refresh list
      await loadData();
    } catch (err) {
      console.log(err);
    }
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
                  type="date"
                  name="date"
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
                  type="time"
                  name="start"
                  value={form.start}
                  onChange={handleChange}
                />
              </Col>

              <Col md={6}>
                <Form.Label>End Time</Form.Label>
                <Form.Control
                  type="time"
                  name="end"
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
                background: s.status === "Available" ? "#eafff0" : "#eaf3ff",
              }}
            >
              <div>
                <div className="fw-bold">
                  {s.date} • {s.time} • {s.location}
                </div>

                <Badge
                  bg={
                    s.status === "Available"
                      ? "success"
                      : s.status === "Booked"
                      ? "primary"
                      : s.status === "Completed"
                      ? "secondary"
                      : "danger"
                  }
                >
                  {s.status}
                </Badge>
              </div>

              <Button
                variant="outline-danger"
                onClick={() => handleDelete(s.id)}
                disabled={typeof s.id === "string"} // appointment rows
              >
                🗑️
              </Button>
            </div>
          ))}

          {slots.length === 0 && <div className="text-muted">No slots yet.</div>}
        </Card.Body>
      </Card>
    </>
  );
}
