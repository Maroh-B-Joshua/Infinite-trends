import React,{useState, useContext} from 'react'
// import axios from 'axios'
import axios from '../api/axios'
import * as AiIcons from "react-icons/ai"
import StyleContext from '../Context/StyleProvider'
import DataContext from '../Context/DataProvider'
import Sidebar from '../Comps/Sidebar'
import "../css/Account.css"
import "../css/pages.css"

const Account = () => {
  const {theme, morphism, glassBg, primaryColor} = useContext(StyleContext)
  const display = {...theme, ...morphism}

  const {userData} = useContext(DataContext)

  const [username, setUserName] = useState(userData.username)
  const [email, setEmail] = useState(userData.email)

  const [updateSuccess, setUpdateSuccess] = useState(false)

  let updateUrl = `https://intrendsanalytics.herokuapp.com/users/update-user/${userData._id}`

  
  const setAcc = async e =>{
    e.preventDefault()  
    
    const formData = new FormData()
    formData.append("username", username)
    formData.append("email", email)
  
    try {
      await axios.post(updateUrl,
          formData,
          {
              headers: { 'Content-Type': 'application/json'},
              withCredentials: true
          }
      );

      setUpdateSuccess(true)

      setTimeout(()=>{
        setUpdateSuccess(false)
      }, 3000)
    
    }
      catch(err){
        console.log(err)
      }
  }

  return (
    <React.Fragment>
      <span style={glassBg? {display:'block'}:{display:'none'}} className='glass-bg'></span>
      <div id={display.bg} className='body'>
        <Sidebar/>
        <div className='main'>
          <h1 className='acc-head' id={display.color}>Account</h1>

          <section className='account-sec'>
          
            <div
              className='update-msg'
              style={updateSuccess? {opacity:"1", zIndex:"10"} : {opacity:"0", zIndex:"0"}}
            > 
              <span>
                <p>Update Successful</p>
                <AiIcons.AiOutlineCheckCircle/>
              </span>
            </div>

            <form
              onSubmit={setAcc}
              id={display.primaryBg}
            >
              <span>
                <label id={display.color} htmlFor="username">User Name</label>
                <input
                  type="text"
                  name='username'
                  value={username} 
                  onChange={e => setUserName(e.target.value)}
                  id={display.input}
                />
              </span>

              <span>
                <label id={display.color} htmlFor="email">Email</label>
                <input 
                  type="email"
                  name='email'
                  value={email} 
                  onChange={e => setEmail(e.target.value)}
                  id={display.input}
                />
              </span>

              <button id={primaryColor.bgColor}>Submit</button>
            </form>


            <div className='user-details' id={display.primaryBg}>
              {/* <div>
                <h3 id={display.color}>Country</h3>
                <p id={display.color}>{userData.country}</p>
              </div> */}

              <div className='acc-type'>
                <h3 id={display.color}>Account Type</h3>
                <p id={display.color}>{userData.accountType}</p>
                <button 
                  id={primaryColor.bgColor}
                  style = {userData.accountType === "Free" ? {display:"block"}:{display:"none"}}
                >
                  Upgrade
                </button>

                <button 
                  id={primaryColor.bgColor} 
                  style = {userData.accountType === "Premium" ? {display:"block"}:{display:"none"}}
                >
                  Renew Subscription
                </button>

                <div 
                  style = {userData.accountType === "Premium" ? {display:"block"}:{display:"none"}}
                >
                  <h4 id={display.color}>Subscription date: {""}</h4>
                  <h4 id={display.color}>Expiration date: {""}</h4>
                </div>
              </div>

            </div>



          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          </section>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Account