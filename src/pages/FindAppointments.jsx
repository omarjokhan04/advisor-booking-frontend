import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Card, Alert } from "react-bootstrap";
import SlotCard from "../components/SlotCard";
import emailjs from "emailjs-com";
import API_BASE from "../api";
import "../css/FindAppointments.css";


const EMAILJS_SERVICE_ID = "service_a72ftls";
const EMAILJS_TEMPLATE_ID = "template_t20x6u9";
const EMAILJS_PUBLIC_KEY = "XRhOrLD-3XOj8CMNR";


function getStudentInfo() {
  return {
    name: localStorage.getItem("student_name") || "Student",
    email: localStorage.getItem("student_email") || "student@demo.com",
   
    id: Number(localStorage.getItem("student_id")) || 1,
  };
}

/* Convert mm/dd/yyyy -> yyyy-mm-dd (for backend date filter) */
function toISODate(mmddyyyy) {
  if (!mmddyyyy) return "";
  const parts = mmddyyyy.split("/");
  if (parts.length !== 3) return "";
  const [mm, dd, yyyy] = parts;
  if (!mm || !dd || !yyyy) return "";
  if (yyyy.length !== 4) return "";
  const m = mm.padStart(2, "0");
  const d = dd.padStart(2, "0");
  return `${yyyy}-${m}-${d}`;
}

/* Map backend slot to frontend slot shape */
function mapSlotFromBackend(s) {
  return {
    id: s.slot_id,
    advisor: s.advisor_name,
    // Keep date/time as strings for your current UI
    date: String(s.slot_date), // "2026-01-25"
    time: String(s.slot_time).slice(0, 5), // "10:00"
    location: s.location,
    status: s.status,
    advisor_id: s.advisor_id,
  };
}

export default function FindAppointments() {
  const [slots, setSlots] = useState([]);
  const [myAppointments, setMyAppointments] = useState([]); 

  const [filters, setFilters] = useState({
    advisor: "all", // now holds advisor_id or "all"
    date: "", // mm/dd/yyyy
  });

  const [sendingId, setSendingId] = useState(null);
  const [emailMsg, setEmailMsg] = useState({ type: "", text: "" });

  // -------------------------
  // Load advisors list from backend
  // -------------------------
  const [advisors, setAdvisors] = useState([{ id: "all", name: "All Advisors" }]);

  useEffect(() => {
    fetch(`${API_BASE}/users/advisors`)
      .then((res) => res.json())
      .then((data) => {
        const list = [{ id: "all", name: "All Advisors" }];
        data.forEach((a) => list.push({ id: a.user_id, name: a.full_name }));
        setAdvisors(list);
      })
      .catch((err) => console.log(err));
  }, []);

  // -------------------------
  // Fetch slots from backend (with filters)
  // -------------------------
  useEffect(() => {
    const advisorId = filters.advisor !== "all" ? filters.advisor : "";
    const isoDate = toISODate(filters.date);

    let url = `${API_BASE}/slots`;
    const qs = [];

    if (advisorId) qs.push(`advisorId=${advisorId}`);
    if (isoDate) qs.push(`date=${isoDate}`);

    if (qs.length > 0) url += `?${qs.join("&")}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const mapped = Array.isArray(data) ? data.map(mapSlotFromBackend) : [];
        setSlots(mapped);
      })
      .catch((err) => console.log(err));
  }, [filters.advisor, filters.date]);

  /* handle filter change */
  function handleFilterChange(e) {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  /* send email */
  function sendBookingEmail(slot) {
    const student = getStudentInfo();

    return emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        to_name: student.name,
        to_email: student.email,
        advisor_name: slot.advisor,
        date: slot.date,
        time: slot.time,
        location: slot.location,
      },
      EMAILJS_PUBLIC_KEY
    );
  }

  /* book appointment */
  async function handleBook(slot) {
    setEmailMsg({ type: "", text: "" });

    const student = getStudentInfo();

    try {
      setSendingId(slot.id);

      // 1) Book in backend
      const res = await fetch(`${API_BASE}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slot_id: slot.id,
          student_id: student.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        return setEmailMsg({
          type: "danger",
          text: data?.message || "⚠️ Booking failed.",
        });
      }

      // 2) Update UI (same behavior as before)
      setSlots((prev) => prev.filter((s) => s.id !== slot.id));
      setMyAppointments((prev) => [{ ...slot, status: "Booked" }, ...prev]);

      // 3) Send EmailJS confirmation (frontend-only)
      await sendBookingEmail(slot);

      setEmailMsg({
        type: "success",
        text: "✅ Thank you for booking! A confirmation email was sent.",
      });
    } catch (err) {
      console.error(err);
      setEmailMsg({
        type: "danger",
        text: "⚠️ Appointment booked, but email failed to send.",
      });
    } finally {
      setSendingId(null);
    }
  }

  return (
    <div className="find-page">
      <Container className="find-container">
        {/* HEADER */}
        <div className="find-header">
          <h1 className="find-title">Available Advisor Appointments</h1>
          <p className="find-subtitle">
            Browse and book available time slots with academic advisors
          </p>
        </div>

        {/* EMAIL MESSAGE */}
        {emailMsg.text && <Alert variant={emailMsg.type}>{emailMsg.text}</Alert>}

        {/* FILTER CARD */}
        <Card className="find-filter-card">
          <Card.Body className="find-filter-body">
            <h2 className="find-filter-title">Filter Appointments</h2>

            <Row className="g-3">
              <Col md={6}>
                <Form.Label className="find-label">Advisor</Form.Label>
                <Form.Select
                  name="advisor"
                  value={filters.advisor}
                  onChange={handleFilterChange}
                  className="find-input"
                >
                  {advisors.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>

              <Col md={6}>
                <Form.Label className="find-label">Date</Form.Label>
                <Form.Control
                  type="text"
                  name="date"
                  value={filters.date}
                  onChange={handleFilterChange}
                  placeholder="mm/dd/yyyy"
                  className="find-input"
                />
                {/* Note: backend expects YYYY-MM-DD, we convert if user types mm/dd/yyyy */}
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* SLOTS GRID */}
        <Row className="g-4 find-grid">
          {slots.map((slot) => (
            <Col md={6} lg={4} key={slot.id}>
              <SlotCard
                slot={slot}
                actionLabel={sendingId === slot.id ? "Sending Email..." : "Book Appointment"}
                onAction={handleBook}
                disabled={sendingId === slot.id}
              />
            </Col>
          ))}

          {slots.length === 0 && (
            <Col>
              <div className="find-empty">No appointments match your filter.</div>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}
