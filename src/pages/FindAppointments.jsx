import { useState } from "react";
import { Container, Row, Col, Form, Card, Alert } from "react-bootstrap";
import SlotCard from "../components/SlotCard";
import { availableSlots as initialSlots } from "../data/mockAppointments";
import emailjs from "emailjs-com";
import "../css/FindAppointments.css";

/* 🔴 PUT YOUR REAL EMAILJS IDS HERE */
const EMAILJS_SERVICE_ID = "service_a72ftls";
const EMAILJS_TEMPLATE_ID = "template_t20x6u9";
const EMAILJS_PUBLIC_KEY = "XRhOrLD-3XOj8CMNR";

/* simple student info (replace later if you add auth) */
function getStudentInfo() {
  return {
    name: localStorage.getItem("student_name") || "Student",
    email: localStorage.getItem("student_email") || "student@demo.com",
  };
}

export default function FindAppointments() {
  const [slots, setSlots] = useState(initialSlots);
  const [myAppointments, setMyAppointments] = useState([]);

  const [filters, setFilters] = useState({
    advisor: "all",
    date: "",
  });

  const [sendingId, setSendingId] = useState(null);
  const [emailMsg, setEmailMsg] = useState({ type: "", text: "" });

  /* handle filter change */
  function handleFilterChange(e) {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  /* build advisor list */
  const advisors = ["all"];
  slots.forEach((s) => {
    if (!advisors.includes(s.advisor)) {
      advisors.push(s.advisor);
    }
  });

  /* filter slots (simple loop) */
  const filteredSlots = slots.filter((s) => {
    const advisorOk =
      filters.advisor === "all" || s.advisor === filters.advisor;

    const dateOk =
      !filters.date ||
      (typeof s.date === "string" && s.date.includes(filters.date));

    return advisorOk && dateOk;
  });

  /* send email */
  function sendBookingEmail(slot) {
    const student = getStudentInfo();

    return emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        to_name: student.name,
        to_email: "omarjokhan2004@gmail.com",
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

    // update UI first
    setSlots((prev) => prev.filter((s) => s.id !== slot.id));
    setMyAppointments((prev) => [{ ...slot, status: "Booked" }, ...prev]);

    // send email
    try {
      setSendingId(slot.id);
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
        {emailMsg.text && (
          <Alert variant={emailMsg.type}>{emailMsg.text}</Alert>
        )}

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
                    <option key={a} value={a}>
                      {a === "all" ? "All Advisors" : a}
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
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* SLOTS GRID */}
        <Row className="g-4 find-grid">
          {filteredSlots.map((slot) => (
            <Col md={6} lg={4} key={slot.id}>
              <SlotCard
                slot={slot}
                actionLabel={
                  sendingId === slot.id ? "Sending Email..." : "Book Appointment"
                }
                onAction={handleBook}
                disabled={sendingId === slot.id}
              />
            </Col>
          ))}

          {filteredSlots.length === 0 && (
            <Col>
              <div className="find-empty">
                No appointments match your filter.
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}
