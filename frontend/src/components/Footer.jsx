// Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__text">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
        <ul className="footer__links">
          <li>
            <a href="/privacy" className="footer__link">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/terms" className="footer__link">
              Terms of Service
            </a>
          </li>
          <li>
            <a href="/contact" className="footer__link">
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
