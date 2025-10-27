import React from "react";
import { Container } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";

export default function FooterBar() {
  return (
    <footer className="footer-bar text-white mt-auto">
      <Container className="text-center py-1">
        <small>
          © {new Date().getFullYear()} <strong>Smart Sales</strong> — Built with{" "}
          <FaHeart className="text-danger" /> by Your Team
        </small>
      </Container>
    </footer>
  );
}
