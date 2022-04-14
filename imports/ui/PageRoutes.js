import React from "react"
import {
  Calendar,
  CreateNewEvent,
  PaymentManagement,
  EditVendors,
  Reports,
  ActivityStream,
  Logout,
  EditEvent,
  Register,
  Login,
  ResetPassword,
} from "./pages"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import PrivateRoute from "./PrivateRoutes"

const PageRoutes = () => {
  return (
    
    <Router>
      <div>
        
        <Switch>
          <PrivateRoute exact path="/" component={Calendar} />
          <PrivateRoute path="/calendar" component={Calendar} />
          <PrivateRoute path="/create-new-event" component={CreateNewEvent} />
          <PrivateRoute
            path="/payment-management"
            component={PaymentManagement}
          />
          <PrivateRoute path="/edit-vendors" component={EditVendors} />
          <PrivateRoute path="/reports" component={Reports} />
          <PrivateRoute path="/edit-event/:eventID" component={EditEvent} />
          <PrivateRoute path="/activity-stream" component={ActivityStream} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={Register} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  )
}

export default PageRoutes
