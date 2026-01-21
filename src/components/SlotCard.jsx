import { Card, Button } from "react-bootstrap";
import "../css/SlotCard.css";

export default function SlotCard({
  slot,
  actionLabel = "Book Appointment",
  onAction,
  disabled = false,
}) {
  return (
    <Card className="slot-card">
      <Card.Body>
        <Card.Title className="slot-title">
          {slot.advisor}
        </Card.Title>

        <p className="slot-time">
          {slot.date} • {slot.time}
        </p>

        <p className="slot-location">
          {slot.location}
        </p>

        <Button
          className="slot-btn w-100"
          onClick={() => onAction(slot)}
          disabled={disabled}
        >
          {actionLabel}
        </Button>
      </Card.Body>
    </Card>
  );
}
