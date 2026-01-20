import { Card, Button, Badge } from "react-bootstrap";

export default function SlotCard({ slot, actionLabel, onAction }) {
  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title>{slot.advisor}</Card.Title>
        <Card.Subtitle className="mb-3 text-muted">
          Academic Advisor
        </Card.Subtitle>

        <div className="mb-2">📅 {slot.date}</div>
        <div className="mb-2">⏰ {slot.time}</div>
        <div className="mb-3">📍 {slot.location}</div>

        <Badge bg="primary" className="mb-3">
          Available
        </Badge>

        <Button className="w-100" onClick={() => onAction(slot)}>
          {actionLabel}
        </Button>
      </Card.Body>
    </Card>
  );
}
