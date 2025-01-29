// Footer.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons"; // Import icons

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Left Section - Logo & Socials */}
        <div className="footer__section footer__section--left">
          <div className="footer__socials">
            <a
              href="https://www.facebook.com/novapostpl.official"
              className="footer__socials-icon"
            >
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>
            <a
              href="https://instagram.com/novapostpl.official?igshid=NDRkN2NkYzU="
              className="footer__socials-icon"
            >
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
            <a
              href="https://www.linkedin.com/company/82983464"
              className="footer__socials-icon"
            >
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
          </div>
          <div className="footer__logo">
            <img src="/image1.png" alt="Company Logo" />
          </div>
        </div>

        {/* Center Section - Navigation */}
        <div className="footer__section footer__section--center">
          <ul className="footer__nav">
            <li>
              <a href="https://novapost.com/en-pl/receive/">Contact</a>
            </li>
            <li>
              <a href="https://novapost.com/en-pl/more/privacy-policy">
                Policy
              </a>
            </li>
            <li>
              <a href="https://novapost.com/en-pl/more/about">About Us</a>
            </li>
          </ul>
        </div>

        {/* Right Section - Partners & Mobile Apps */}
        <div className="footer__section footer__section--right">
          <div className="footer__partners">
            <span>Cooperate with:</span>
            <img src="/partner1.png" alt="Partner 1" />
            <img src="/partner2.png" alt="Partner 2" />
          </div>
          <div className="footer__apps">
            <span>Find us on:</span>
            <img src="/google-play.png" alt="Google Play" />
            <img src="/app-store.png" alt="App Store" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
