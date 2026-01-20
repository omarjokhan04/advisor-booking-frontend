import { useMemo, useState } from "react";
import { Container, Row, Col, Form, Card } from "react-bootstrap";
import SlotCard from "../components/SlotCard";
import { availableSlots as initialSlots } from "../data/mockAppointments";
import "../css/FindAppointments.css";

export default function FindAppointments() {
  const [slots, setSlots] = useState(initialSlots);
  const [myAppointments, setMyAppointments] = useState([]);

  // filter UI state (frontend only for now)
  const [filters, setFilters] = useState({
    advisor: "all",
    date: "",
  });

  function handleBook(slot) {
    setSlots((prev) => prev.filter((s) => s.id !== slot.id));
    setMyAppointments((prev) => [{ ...slot, status: "Booked" }, ...prev]);
  }

  // build advisor options
  const advisors = useMemo(() => {
    const set = new Set(slots.map((s) => s.advisor));
    return ["all", ...Array.from(set)];
  }, [slots]);

  function handleFilterChange(e) {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  // apply filters (simple)
  const filteredSlots = useMemo(() => {
    return slots.filter((s) => {
      const advisorOk = filters.advisor === "all" || s.advisor === filters.advisor;

      // if your slot has date like "Wed, Jan 15, 2025" we will just do contains check
      const dateOk =
        !filters.date ||
        (typeof s.date === "string" && s.date.includes(filters.date));

      return advisorOk && dateOk;
    });
  }, [slots, filters]);

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

        {/* FILTER BOX */}
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
                actionLabel="Book Appointment"
                onAction={handleBook}
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
