import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container className="py-4">
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/">Go back home</Link>
    </Container>
  );
}
