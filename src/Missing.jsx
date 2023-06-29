import React from 'react'
import { Link } from "react-router-dom"

const Missing = () => {
  return (
    <div>
      <h1>Oops!</h1>
      <p>Page Not Found</p>
      <div className="">
       <Link to="/">Visit  Homepage</Link>
      </div> 
       <Link to="/login">Login</Link>
    </div>
  )
}

export default Missing