import React from "react";
import { Link } from "react-router";

const Header = () => {
  return (
    <div className="header__container">
      <div className="nav_container">
        <nav className="menu__container">
            <li className="nav__item"><Link to="/create-parcel">Send</Link></li>
            <li className="nav__item"><Link to="/track">Track</Link></li>
        </nav>
      </div>
    </div>
  );
};

export default Header;
