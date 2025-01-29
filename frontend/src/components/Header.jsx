import React from "react";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
const Header = () => {
  return (
    <div className="header__container">
      <div className="nav_container">
        <nav className="menu__container">
          <li className="nav__item">
            <Link to="/create-parcel">Send</Link>
          </li>
          <li className="nav__item">
            <Link to="/track">Track</Link>
          </li>
        </nav>
      </div>
      <div className="header__logo">
        <Link to="/">
          <img src="/image1.png" alt="" />
        </Link>
      </div>
      <div className="header__user">
        <Link to="/register">
          <FontAwesomeIcon icon={faUser} size="lg" />
        </Link>
      </div>
    </div>
  );
};

export default Header;