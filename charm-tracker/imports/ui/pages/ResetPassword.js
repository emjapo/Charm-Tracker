import React from "react"
import { Meteor } from "meteor/meteor"
import LoginHeader from "../LoginHeader"

export default class ResetPassword extends React.Component {
  render() {
    // OAuth URI is not compatable with localhost:3000
    return (
      <div className="login">
        <LoginHeader />
        <form className="login">
          <label>New Password</label>
          <input type="text" id="npassword" name="npassword"></input>
          <label>Confirm Password</label>
          <input type="password" id="cpassword" name="cpassword"></input>
          <input type="submit" id="reset" value="Reset Password"></input>
        </form>
      </div>
    )
  }
}
