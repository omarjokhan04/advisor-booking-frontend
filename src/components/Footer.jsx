import "../css/Footer.css";

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        {/* Left */}
        <div className="footer-col">
          <h5 className="footer-title">University Name</h5>
          <p className="footer-text">
            Making academic advising accessible and convenient
            <br />
            for all students.
          </p>
        </div>

        {/* Middle */}
        <div className="footer-col">
          <h5 className="footer-title">Contact</h5>
          <p className="footer-text">
            Email: advising@university.edu
            <br />
            Phone: (555) 123-4567
          </p>
        </div>

        {/* Right */}
        <div className="footer-col">
          <h5 className="footer-title">Office Hours</h5>
          <p className="footer-text">
            Monday - Friday
            <br />
            9:00 AM - 5:00 PM
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 University Advisor. All rights reserved.
      </div>
    </footer>
  );
}
