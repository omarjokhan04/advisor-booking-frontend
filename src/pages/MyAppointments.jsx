import { useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTimesCircle } from "react-icons/fa";
import "../css/MyAppointments.css";

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
      prev.map((a) => (a.id === id ? { ...a, status: "Canceled" } : a))
    );
  }

  return (
    <div className="myap-page">
      <Container className="myap-container">
        <h1 className="myap-title">My Appointments</h1>
        <p className="myap-subtitle">
          View and manage your upcoming and past appointments
        </p>

        <div className="myap-list">
          {appointments.map((a) => (
            <Card key={a.id} className="myap-card">
              <Card.Body className="myap-card-body">
                <div className="myap-card-top">
                  <div>
                    <h3 className="myap-advisor">{a.advisor}</h3>
                  </div>

                  <span className={`status-badge ${a.status.toLowerCase()}`}>
                    {a.status}
                  </span>
                </div>

                <div className="myap-details">
                  <div className="myap-line">
                    <FaCalendarAlt className="myap-ico" />
                    <span>{a.date}</span>
                  </div>

                  <div className="myap-line">
                    <FaClock className="myap-ico" />
                    <span>{a.time}</span>
                  </div>

                  <div className="myap-line">
                    <FaMapMarkerAlt className="myap-ico" />
                    <span>{a.location}</span>
                  </div>
                </div>

                <div className="myap-actions">
                  {a.status === "Booked" && (
                    <Button
                      variant="danger"
                      className="myap-cancel-btn"
                      onClick={() => cancelAppointment(a.id)}
                    >
                      <FaTimesCircle className="myap-cancel-ico" />
                      Cancel Appointment
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}
