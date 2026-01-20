import { Card, Row, Col } from "react-bootstrap";

export default function Dashboard() {
  return (
    <>
      <h1 className="mb-1">Dashboard</h1>
      <p className="text-muted mb-4">Welcome back, Advisor</p>

      <Row className="g-3 mb-4">
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <div className="text-muted">Total Slots Created</div>
              <div className="display-6 fw-bold">12</div>
              <div className="text-muted">Available time slots</div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <div className="text-muted">Today's Appointments</div>
              <div className="display-6 fw-bold">2</div>
              <div className="text-muted">Scheduled for today</div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <div className="text-muted">Upcoming Appointments</div>
              <div className="display-6 fw-bold">5</div>
              <div className="text-muted">Total upcoming</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card>
        <Card.Body>
          <h4 className="mb-3">Recent Appointments</h4>

          <div className="d-flex justify-content-between border-bottom py-2">
            <div>
              <div className="fw-bold">Sara Ahmad</div>
              <div className="text-muted" style={{ fontSize: 13 }}>
                Wed, Jan 15, 2025 • 09:00 - 10:00
              </div>
            </div>
            <span className="badge bg-primary">Booked</span>
          </div>

          <div className="d-flex justify-content-between border-bottom py-2">
            <div>
              <div className="fw-bold">Omar Khaled</div>
              <div className="text-muted" style={{ fontSize: 13 }}>
                Wed, Jan 15, 2025 • 10:00 - 10:30
              </div>
            </div>
            <span className="badge bg-primary">Booked</span>
          </div>

          <div className="d-flex justify-content-between py-2">
            <div>
              <div className="fw-bold">Lina Samir</div>
              <div className="text-muted" style={{ fontSize: 13 }}>
                Sun, Jan 12, 2025 • 12:00 - 12:30
              </div>
            </div>
            <span className="badge bg-success">Completed</span>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
