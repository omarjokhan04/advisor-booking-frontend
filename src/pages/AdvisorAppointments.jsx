import { useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";

export default function AdvisorAppointments() {
  const [items, setItems] = useState([
    {
      id: 1,
      student: "Sara Ahmad",
      date: "Wednesday, January 15, 2025",
      time: "09:00 - 10:00",
      location: "Office 305",
      status: "Booked",
    },
    {
      id: 2,
      student: "Omar Khaled",
      date: "Wednesday, January 15, 2025",
      time: "10:00 - 10:30",
      location: "Zoom Meeting",
      status: "Booked",
    },
    {
      id: 3,
      student: "Lina Samir",
      date: "Sunday, January 12, 2025",
      time: "12:00 - 12:30",
      location: "Office 210",
      status: "Completed",
    },
  ]);

  function markCompleted(id) {
    setItems((prev) =>
      prev.map((x) => (x.id === id ? { ...x, status: "Completed" } : x))
    );
  }

  return (
    <>
      <h1 className="mb-1">Student Appointments</h1>
      <p className="text-muted mb-4">
        View and manage appointments booked by students
      </p>

      {items.map((a) => (
        <Card key={a.id} className="mb-3">
          <Card.Body className="d-flex justify-content-between align-items-center">
            <div>
              <div className="fw-bold">{a.student}</div>
              <div className="text-muted" style={{ fontSize: 13 }}>
                📅 {a.date}
              </div>
              <div className="text-muted" style={{ fontSize: 13 }}>
                ⏰ {a.time}
              </div>
              <div className="text-muted" style={{ fontSize: 13 }}>
                📍 {a.location}
              </div>
            </div>

            <div className="text-end">
              <Badge bg={a.status === "Completed" ? "success" : "primary"} className="mb-2">
                {a.status}
              </Badge>

              {a.status === "Booked" && (
                <div>
                  <Button variant="success" onClick={() => markCompleted(a.id)}>
                    ✅ Mark as Completed
                  </Button>
                </div>
              )}
            </div>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}
