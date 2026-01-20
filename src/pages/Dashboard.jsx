import { Card, Row, Col } from "react-bootstrap";
import { FaCalendarAlt, FaClock, FaCheckCircle } from "react-icons/fa";
import "../css/Dashboard.css";

export default function Dashboard() {
  const recent = [
    { id: 1, name: "John Smith", date: "1/21/2026 at 09:00", status: "Booked" },
    { id: 2, name: "John Smith", date: "1/27/2026 at 10:00", status: "Canceled" },
  ];

  return (
    <div className="dash-page">
      <h1 className="dash-title">Dashboard</h1>
      <p className="dash-subtitle">Welcome back, Dr. Sarah Johnson</p>

      <Row className="g-3 dash-cards-row">
        <Col md={4}>
          <Card className="dash-stat-card">
            <Card.Body className="dash-stat-body">
              <div className="dash-stat-top">
                <div className="dash-stat-label">Total Slots Created</div>
                <FaCalendarAlt className="dash-stat-icon" />
              </div>

              <div className="dash-stat-value">3</div>
              <div className="dash-stat-hint">Available time slots</div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="dash-stat-card">
            <Card.Body className="dash-stat-body">
              <div className="dash-stat-top">
                <div className="dash-stat-label">Today's Appointments</div>
                <FaClock className="dash-stat-icon" />
              </div>

              <div className="dash-stat-value">0</div>
              <div className="dash-stat-hint">Scheduled for today</div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="dash-stat-card">
            <Card.Body className="dash-stat-body">
              <div className="dash-stat-top">
                <div className="dash-stat-label">Upcoming Appointments</div>
                <FaCheckCircle className="dash-stat-icon" />
              </div>

              <div className="dash-stat-value">1</div>
              <div className="dash-stat-hint">Total upcoming</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="dash-recent-card">
        <Card.Body className="dash-recent-body">
          <h3 className="dash-recent-title">Recent Appointments</h3>

          <div className="dash-recent-list">
            {recent.map((r) => (
              <div key={r.id} className="dash-recent-item">
                <div className="dash-recent-left">
                  <div className="dash-recent-name">{r.name}</div>
                  <div className="dash-recent-date">{r.date}</div>
                </div>

                <span className={`status-badge ${r.status.toLowerCase()}`}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
