import React from 'react'

const Forgetpwd = () => {

  const forgot = () =>{

  }
  
  return (
    <React.Fragment>
      <div>
        <form onSubmit={forgot}>
          <label htmlFor="email">Enter Your Email</label>
          <input type="email" />
          <button>send</button>
        </form>
      </div>
    </React.Fragment>

  )
}

export default Forgetpwd