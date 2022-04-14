import React from "react"
import PageRoutes from "./PageRoutes"
import '../api/Firebase'
import { AuthProvider } from "./AuthManagement.js"


const App = () => {
  return (
    <>
      <AuthProvider>
        <PageRoutes />
      </AuthProvider>
    </>
  )
}

export default App
