import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaCalendarCheck, FaClock, FaListAlt } from "react-icons/fa";
import "../css/Home.css";

import UniversityImage from "../assets/Uni.png";

export default function Home() {
  return (
    <div className="home-page">
      {/* ================= HERO SECTION ================= */}
      <section className="home-hero">
        <Container fluid className="home-fluid">
          <Container>
            <Row className="align-items-center g-5">
              <Col lg={6}>
                <h1 className="home-title">
                  Book Your Academic <br />
                  Advising Appointment <br />
                  Online
                </h1>

                <p className="home-description">
                  Connect with your academic advisor seamlessly. Browse
                  available time slots, book appointments instantly, and manage
                  your schedule all in one place. No more waiting in lines or
                  playing phone tag.
                </p>

                <div className="home-actions">
                  <Button
                    as={Link}
                    to="/student/find"
                    className="home-primary-btn"
                  >
                    Book Appointment
                  </Button>

                  <Button as={Link} to="/login" variant="outline-primary">
                    Login
                  </Button>
                </div>
              </Col>

              <Col lg={6}>
                <div className="home-image-wrapper">
                  <img
                    src={UniversityImage}
                    alt="Graduation"
                    className="home-hero-image"
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </Container>
      </section>

      {/* ================= WHY USE SECTION ================= */}
      <section className="home-why">
        <Container fluid className="home-fluid">
          <Container>
            <div className="home-section-header">
              <h2>Why Use Our Booking System?</h2>
              <p>
                Designed to make your academic journey smoother with convenient
                appointment scheduling
              </p>
            </div>

            <Row className="g-4">
              <Col md={4}>
                <Card className="home-feature-card">
                  <div className="home-icon">
                    <FaCalendarCheck />
                  </div>
                  <Card.Body>
                    <Card.Title>Easy Booking</Card.Title>
                    <Card.Text>
                      Browse available time slots and book appointments with
                      your advisor in just a few clicks.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card className="home-feature-card">
                  <div className="home-icon">
                    <FaClock />
                  </div>
                  <Card.Body>
                    <Card.Title>No Waiting</Card.Title>
                    <Card.Text>
                      Skip the lines and long phone calls. Get instant
                      confirmation for your selected time slot.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card className="home-feature-card">
                  <div className="home-icon">
                    <FaListAlt />
                  </div>
                  <Card.Body>
                    <Card.Title>Organized Schedule</Card.Title>
                    <Card.Text>
                      Keep track of all your appointments in one place. Cancel
                      or reschedule when needed.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Container>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="home-cta">
        <Container fluid className="home-fluid">
          <Container>
            <h2>Ready to Get Started?</h2>
            <p>
              Join hundreds of students who have simplified their academic
              advising experience
            </p>

            <div className="home-cta-actions">
              <Button as={Link} to="/register" className="home-primary-btn">
                Create Account
              </Button>

              <Button
                as={Link}
                to="/student/find"
                variant="outline-primary"
              >
                View Available Slots
              </Button>
            </div>
          </Container>
        </Container>
      </section>
    </div>
  );
}
