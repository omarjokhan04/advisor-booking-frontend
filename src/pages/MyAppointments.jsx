import { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTimesCircle } from "react-icons/fa";
import API_BASE from "../api";
import "../css/MyAppointments.css";

function getStudentId() {
  return Number(localStorage.getItem("student_id")) || 1;
}

// add 1 hour to HH:MM
function addOneHour(time) {
  if (!time || typeof time !== "string") return time;
  const parts = time.split(":");
  if (parts.length < 2) return time;

  let h = Number(parts[0]);
  const m = parts[1];
  if (Number.isNaN(h)) return time;

  h = (h + 1) % 24;
  return `${String(h).padStart(2, "0")}:${m}`;
}

// map backend appointment -> UI
function mapFromBackend(a) {
  const start = String(a.slot_time).slice(0, 5);
  const end = addOneHour(start);

  return {
    id: a.appointment_id,
    advisor: a.advisor_name,
    date: String(a.slot_date), // YYYY-MM-DD
    time: `${start} - ${end}`,
    location: a.location,
    status: a.status,
  };
}

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  async function loadAppointments() {
    try {
      const studentId = getStudentId();
      const res = await fetch(`${API_BASE}/appointments/student/${studentId}`);
      const data = await res.json();

      const mapped = Array.isArray(data) ? data.map(mapFromBackend) : [];
      setAppointments(mapped);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadAppointments();
  }, []);

  async function cancelAppointment(id) {
    try {
      const res = await fetch(`${API_BASE}/appointments/${id}/cancel`, {
        method: "PUT",
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data?.message || "Cancel failed");
        return;
      }

      // update UI locally (same behavior as before)
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: "Canceled" } : a))
      );
    } catch (err) {
      console.log(err);
    }
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

                  <span className={`status-badge ${String(a.status).toLowerCase()}`}>
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

          {appointments.length === 0 && (
            <div className="myap-empty">No appointments yet.</div>
          )}
        </div>
      </Container>
    </div>
  );
}
