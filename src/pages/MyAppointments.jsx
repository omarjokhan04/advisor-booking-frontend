import { useState } from "react";
import { Container, Card, Button, Badge } from "react-bootstrap";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([
    {
      id: 10,
      advisor: "Dr. Ahmad Saleh",
      date: "Wed, Jan 15, 2025",
      time: "09:00 - 10:00",
      location: "Office 305",
      status: "Booked",
    },
    {
      id: 11,
      advisor: "Dr. Rania Khalil",
      date: "Fri, Jan 10, 2025",
      time: "11:00 - 11:30",
      location: "Zoom Meeting",
      status: "Completed",
    },
  ]);

  function cancelAppointment(id) {
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: "Canceled" } : a
      )
    );
  }

  return (
    <Container className="py-4">
      <h1 className="mb-1">My Appointments</h1>
      <p className="text-muted mb-4">
        View and manage your upcoming and past appointments
      </p>

      {appointments.map((a) => (
        <Card key={a.id} className="mb-3">
          <Card.Body>
            <Card.Title>{a.advisor}</Card.Title>
            <div className="mb-2">📅 {a.date}</div>
            <div className="mb-2">⏰ {a.time}</div>
            <div className="mb-3">📍 {a.location}</div>

            <Badge
              bg={
                a.status === "Booked"
                  ? "primary"
                  : a.status === "Completed"
                  ? "success"
                  : "danger"
              }
              className="me-3"
            >
              {a.status}
            </Badge>

            {a.status === "Booked" && (
              <Button
                variant="outline-danger"
                onClick={() => cancelAppointment(a.id)}
              >
                Cancel Appointment
              </Button>
            )}
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}
