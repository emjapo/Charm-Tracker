import React, { useCallback, useContext } from "react"
import ReactDom from "react-dom"
import { withRouter, Redirect } from "react-router"
import auth from "../../../api/Auth"
import { signInWithEmailAndPassword } from "firebase/auth"
import { AuthContext } from "../../AuthManagement"
import { Link } from "react-router-dom"
import LoginHeader from "../../LoginHeader"

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault()
      const { email, password } = event.target.elements
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value)
        history.push("/calendar")
      } catch (error) {
        console.log(error.code)
        let element = <p className="err">{error.code}</p>
        ReactDom.render(element, document.getElementById("error"))
      }
    },
    [history]
  )

  const { currentUser } = useContext(AuthContext)

  if (currentUser) {
    return <Redirect to="/calendar" />
  }

  return (
    <div className="login">
      <LoginHeader />
      <form className="login" onSubmit={handleLogin}>
        <div id="error"></div>
        <label>Email</label>
        <input type="text" id="email" name="email"></input>
        <label>Password</label>
        <input type="password" id="password" name="password"></input>
        <Link to="/reset-password" className="login-link">
          Forgot Password?
        </Link>
        <Link to="/register" className="login-link">
          Create Account
        </Link>
        <input type="submit" id="login"></input>
      </form>
    </div>
  )
}

export default withRouter(Login)
