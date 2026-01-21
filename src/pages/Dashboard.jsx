import { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FaCalendarAlt, FaClock, FaCheckCircle } from "react-icons/fa";
import API_BASE from "../api";
import "../css/Dashboard.css";

function getAdvisorInfo() {
  return {
    id: Number(localStorage.getItem("advisor_id")) || 1,
    name: localStorage.getItem("advisor_name") || "Dr. Advisor",
  };
}

function isSameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export default function Dashboard() {
  const advisor = getAdvisorInfo();

  const [totalSlots, setTotalSlots] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [upcomingCount, setUpcomingCount] = useState(0);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    async function loadDashboard() {
      try {
        // 1) Available slots (this endpoint returns Available only)
        const slotsRes = await fetch(`${API_BASE}/slots?advisorId=${advisor.id}`);
        const slotsData = await slotsRes.json();
        const availableSlotsCount = Array.isArray(slotsData) ? slotsData.length : 0;
        setTotalSlots(availableSlotsCount);

        // 2) Advisor appointments (Booked / Completed / Canceled)
        const apptRes = await fetch(`${API_BASE}/appointments/advisor/${advisor.id}`);
        const apptData = await apptRes.json();
        const list = Array.isArray(apptData) ? apptData : [];

        const now = new Date();

        // Booked appointments only (for today/upcoming)
        const booked = list.filter((a) => a.status === "Booked");

        const todayBooked = booked.filter((a) => {
          const d = new Date(a.slot_date);
          return isSameDay(d, now);
        });

        const upcomingBooked = booked.filter((a) => {
          const d = new Date(a.slot_date);
          // upcoming = after today
          return d.setHours(0, 0, 0, 0) > new Date(now.setHours(0, 0, 0, 0)).getTime();
        });

        setTodayCount(todayBooked.length);
        setUpcomingCount(upcomingBooked.length);

        // Recent appointments: latest 5 by date (simple sort)
        const recentList = [...list]
          .sort((a, b) => {
            const da = new Date(a.slot_date);
            const db = new Date(b.slot_date);
            return db - da;
          })
          .slice(0, 5)
          .map((a) => {
            const time = String(a.slot_time).slice(0, 5);
            return {
              id: a.appointment_id,
              name: a.student_name || "Student",
              date: `${a.slot_date} at ${time}`,
              status: a.status,
            };
          });

        setRecent(recentList);
      } catch (err) {
        console.log(err);
      }
    }

    loadDashboard();
  }, [advisor.id]);

  return (
    <div className="dash-page">
      <h1 className="dash-title">Dashboard</h1>
      <p className="dash-subtitle">Welcome back, {advisor.name}</p>

      <Row className="g-3 dash-cards-row">
        <Col md={4}>
          <Card className="dash-stat-card">
            <Card.Body className="dash-stat-body">
              <div className="dash-stat-top">
                <div className="dash-stat-label">Total Slots Created</div>
                <FaCalendarAlt className="dash-stat-icon" />
              </div>

              <div className="dash-stat-value">{totalSlots}</div>
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

              <div className="dash-stat-value">{todayCount}</div>
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

              <div className="dash-stat-value">{upcomingCount}</div>
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

                <span className={`status-badge ${String(r.status).toLowerCase()}`}>
                  {r.status}
                </span>
              </div>
            ))}

            {recent.length === 0 && (
              <div className="dash-recent-item">
                <div className="dash-recent-left">
                  <div className="dash-recent-name">No appointments yet</div>
                  <div className="dash-recent-date">—</div>
                </div>
                <span className="status-badge booked">---</span>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
