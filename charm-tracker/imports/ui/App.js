import React, { useState } from "react"
// import { UP_Collection_Access } from './../api/user_posts.js';
import Title from "./Title.js"
import Login from "./pages/Login.js"
import ResetPassword from "./pages/ResetPassword.js"
import PropTypes from "prop-types"
import PageRoutes from "./PageRoutes.js"

const App = props => {
  const { title } = props
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
