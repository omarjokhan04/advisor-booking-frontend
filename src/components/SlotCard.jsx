import { Card, Button } from "react-bootstrap";
import "../css/SlotCard.css";

export default function SlotCard() {
  return (
    <Card className="slot-card">
      <Card.Body>
        <Card.Title>Dr. Ahmad Saleh</Card.Title>
        <p>Wed, Jan 15 • 09:00 - 10:00</p>
        <p>Office 305</p>
        <Button className="w-100">Book Appointment</Button>
      </Card.Body>
    </Card>
  );
}
