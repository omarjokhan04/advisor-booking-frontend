import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { FiCheckCircle, FiCalendar, FiClock, FiMapPin } from "react-icons/fi";
import API_BASE from "../api";
import "../css/AdvisorAppointments.css";

function getAdvisorId() {
  return Number(localStorage.getItem("advisor_id")) || 1;
}

// Add 1 hour to HH:MM
function addOneHour(time) {
  if (!time || typeof time !== "string") return time;
  const [h, m] = time.split(":");
  let hour = Number(h);
  if (Number.isNaN(hour)) return time;
  hour = (hour + 1) % 24;
  return `${String(hour).padStart(2, "0")}:${m}`;
}

// Map backend appointment → UI item
function mapFromBackend(a) {
  const start = String(a.slot_time).slice(0, 5);
  const end = addOneHour(start);

  return {
    id: a.appointment_id,
    student: a.student_name,
    role: "Student",
    date: String(a.slot_date), // YYYY-MM-DD
    time: `${start} - ${end}`,
    location: a.location,
    status: a.status,
  };
}

export default function AdvisorAppointments() {
  const [items, setItems] = useState([]);

  // Load advisor appointments
  useEffect(() => {
    const advisorId = getAdvisorId();

    fetch(`${API_BASE}/appointments/advisor/${advisorId}`)
      .then((res) => res.json())
      .then((data) => {
        const mapped = Array.isArray(data)
          ? data.map(mapFromBackend)
          : [];
        setItems(mapped);
      })
      .catch((err) => console.log(err));
  }, []);

  // Mark appointment as completed (backend)
  async function markCompleted(id) {
    try {
      const res = await fetch(
        `${API_BASE}/appointments/${id}/complete`,
        { method: "PUT" }
      );

      const data = await res.json();

      if (!res.ok) {
        console.log(data?.message || "Complete failed");
        return;
      }

      // Update UI locally (same behavior as before)
      setItems((prev) =>
        prev.map((x) =>
          x.id === id ? { ...x, status: "Completed" } : x
        )
      );
    } catch (err) {
      console.log(err);
    }
  }

  const statusClass = (status) => {
    if (status === "Booked")
      return "advapps-status advapps-status-booked";
    if (status === "Canceled")
      return "advapps-status advapps-status-canceled";
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
                <span className={statusClass(a.status)}>
                  {a.status}
                </span>

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

        {items.length === 0 && (
          <div className="advapps-empty">
            No appointments yet.
          </div>
        )}
      </div>
    </div>
  );
}
