import React, { useState } from "react"
import { Meteor } from "meteor/meteor"
import LoginHeader from "../LoginHeader"

// async function loginUser(credentials) {
//   return fetch("http://localhost:8080/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(credentials),
//   }).then(data => data.json())
// }

const Login = props => {
  const { setLoggedIn } = props
  const [username, setUserName] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = async e => {
    // e.preventDefault()
    // const token = await loginUser({
    //   username,
    //   password,
    // })
    // setLoggedIn(token)
    setLoggedIn(true)
  }

  return (
    <div className="login">
      <LoginHeader />
      <form className="login" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={e => setUserName(e.target.value)}
        ></input>
        <label>Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={e => setPassword(e.target.value)}
        ></input>
        <a href="#" className="login-link">
          Forgot Password?
        </a>
        <input type="submit" id="login"></input>
      </form>
    </div>
  )
}

export default Login
