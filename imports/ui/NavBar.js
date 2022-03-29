import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <div className="hamburger"
        onClick={() => OpenNav()}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <ul>
        <li>
          <Link to="/calendar" onClick={() => OpenNav()}>Calendar</Link>
        </li>
        <li>
          <Link to="/create-new-event" onClick={() => OpenNav()}>Create New Event</Link>
        </li>
        <li>
          <Link to="/payment-management" onClick={() => OpenNav()}>Payment Management</Link>
        </li>
        <li>
          <Link to="/edit-vendors" onClick={() => OpenNav()}>Edit Vendors</Link>
        </li>
        <li>
          <Link to="/reports" onClick={() => OpenNav()}>Reports</Link>
        </li>
        <li>
          <Link to="/activity-stream" onClick={() => OpenNav()}>Activity Stream</Link>
        </li>
        <li>
          <Link to="/logout" onClick={() => OpenNav()}>Logout</Link>
        </li>
      </ul>
    </nav>
  );
};


function OpenNav() {
  // const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector("nav > ul");
  const links = document.querySelectorAll("nav > ul > li");

  navLinks.classList.toggle("open");
  links.forEach(link => {
    link.classList.toggle("fade");
  });
}

export default NavBar;
