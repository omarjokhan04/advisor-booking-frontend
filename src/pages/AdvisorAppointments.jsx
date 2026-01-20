import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { FiCheckCircle, FiCalendar, FiClock, FiMapPin } from "react-icons/fi";
import "../css/AdvisorAppointments.css";

export default function AdvisorAppointments() {
  const [items, setItems] = useState([
    {
      id: 1,
      student: "Sara Ahmad",
      role: "Student",
      date: "Wednesday, January 15, 2025",
      time: "09:00 - 10:00",
      location: "Office 305",
      status: "Booked",
    },
    {
      id: 2,
      student: "Omar Khaled",
      role: "Student",
      date: "Wednesday, January 15, 2025",
      time: "10:00 - 10:30",
      location: "Zoom Meeting",
      status: "Booked",
    },
    {
      id: 3,
      student: "Lina Samir",
      role: "Student",
      date: "Sunday, January 12, 2025",
      time: "12:00 - 12:30",
      location: "Office 210",
      status: "Canceled",
    },
  ]);

  function markCompleted(id) {
    setItems((prev) =>
      prev.map((x) => (x.id === id ? { ...x, status: "Completed" } : x))
    );
  }

  const statusClass = (status) => {
    if (status === "Booked") return "advapps-status advapps-status-booked";
    if (status === "Canceled") return "advapps-status advapps-status-canceled";
    return "advapps-status advapps-status-completed";
  };

  return (
    <div className="advapps">
      <h1 className="advapps-title">Student Appointments</h1>
      <p className="advapps-subtitle">
        View and manage appointments booked by students
      </p>

      <div className="advapps-list">
        {items.map((a) => (
          <Card key={a.id} className="advapps-card">
            <Card.Body className="advapps-body">
              {/* LEFT */}
              <div className="advapps-left">
                <div className="advapps-name">{a.student}</div>
                <div className="advapps-role">{a.role}</div>

                <div className="advapps-meta">
                  <div className="advapps-row">
                    <FiCalendar className="advapps-icon" />
                    <span>{a.date}</span>
                  </div>
                  <div className="advapps-row">
                    <FiClock className="advapps-icon" />
                    <span>{a.time}</span>
                  </div>
                  <div className="advapps-row">
                    <FiMapPin className="advapps-icon" />
                    <span>{a.location}</span>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="advapps-right">
                <span className={statusClass(a.status)}>{a.status}</span>

                {a.status === "Booked" && (
                  <Button
                    className="advapps-btn"
                    onClick={() => markCompleted(a.id)}
                  >
                    <FiCheckCircle className="advapps-btn-icon" />
                    Mark as Completed
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}
