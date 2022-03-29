import React, { useState } from "react"
// import { UP_Collection_Access } from './../api/user_posts.js';
import Login from "./pages/Login.js"
import ResetPassword from "./pages/ResetPassword.js"
import PageRoutes from "./PageRoutes.js"

const App = () => {
  const [loggedIn, setLoggedIn] = useState()

  if (!loggedIn) {
    return <Login setLoggedIn={setLoggedIn} />
  }
  return (
    <>
      <PageRoutes />
      {/* <Title title={this.props.passedPropTitle} /> */}
    </>
  )
}

export default App
