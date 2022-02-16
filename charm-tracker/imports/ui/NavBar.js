import React from "react"
import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/calendar">Calendar</Link>
        </li>
        <li>
          <Link to="/create-new-event">Create New Event</Link>
        </li>
        <li>
          <Link to="/payment-management">Payment Management</Link>
        </li>
        <li>
          <Link to="/edit-vendors">Edit Vendors</Link>
        </li>
        <li>
          <Link to="/reports">Reports</Link>
        </li>
        <li>
          <Link to="/remove-events">Remove Events</Link>
        </li>
        <li>
          <Link to="/activity-stream">Activity Stream</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
