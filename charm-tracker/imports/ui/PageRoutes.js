import React from "react"
import {
  Calendar,
  CreateNewEvent,
  PaymentManagement,
  EditVendors,
  Reports,
  RemoveEvents,
  ActivityStream,
  Logout,
  EditEvent,
} from "./pages"
import NavBar from "./NavBar"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { route } from "express/lib/application"

const PageRoutes = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path="/calendar" component={Calendar} />
          <Route path="/create-new-event" component={CreateNewEvent} />
          <Route path="/payment-management" component={PaymentManagement} />
          <Route path="/edit-vendors" component={EditVendors} />
          <Route path="/reports" component={Reports} />
          <Route path="/remove-events" component={RemoveEvents} />
          <Route path="/edit-event" component={EditEvent} />
          <Route path="/activity-stream" component={ActivityStream} />
          <Route path="/logout" component={Logout} />
          <Route exact path="/" component={Calendar} />
        </Switch>
      </div>
    </Router>
  )
}

export default PageRoutes
