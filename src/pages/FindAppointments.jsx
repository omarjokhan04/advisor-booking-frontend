import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SlotCard from "../components/SlotCard";
import { availableSlots as initialSlots } from "../data/mockAppointments";

export default function FindAppointments() {
  const [slots, setSlots] = useState(initialSlots);
  const [myAppointments, setMyAppointments] = useState([]);

  function handleBook(slot) {
    setSlots((prev) => prev.filter((s) => s.id !== slot.id));
    setMyAppointments((prev) => [
      { ...slot, status: "Booked" },
      ...prev,
    ]);
  }

  return (
    <Container className="py-4">
      <h1 className="mb-1">Available Advisor Appointments</h1>
      <p className="text-muted mb-4">
        Browse and book available time slots with academic advisors
      </p>

      <Row className="g-4">
        {slots.map((slot) => (
          <Col md={6} lg={4} key={slot.id}>
            <SlotCard
              slot={slot}
              actionLabel="Book Appointment"
              onAction={handleBook}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
