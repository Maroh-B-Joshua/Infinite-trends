import React,{useState, useContext, useEffect} from 'react' 
import { useNavigate, useLocation } from 'react-router'
import axios from '../api/axios'
import StyleContext from '../Context/StyleProvider'
import DataContext from '../Context/DataProvider'
import Sidebar from '../Comps/Sidebar'
import "../css/Dashboard.css"
import "../css/pages.css"


const Dashboard = () => {
  const {theme, morphism, glassBg, primaryColor, setLoad} = useContext(StyleContext)
  const display = {...theme, ...morphism}
  
  const {userData , setUserData, logInEmail} = useContext(DataContext)

  const userUrl = `https://intrendsanalytics.herokuapp.com/users/email/${logInEmail}`

  const getUserData =  () =>{
    axios.get(userUrl)
   .then((response) => {
     console.log(response)
     setUserData(response.data)
   })
   .catch(error =>{
     console.error(error)
   })
  }
   
  useEffect(() =>{
    getUserData()
  }, [])
  
  const navigate = useNavigate();
  const location = useLocation();
  const toLogin = location.state?.from?.pathname || "/login";
  const toHome = location.state?.from?.pathname || "/";

  useEffect(()=>{
    if(userData === "" || null){
      navigate(toLogin, { replace: true })
    }else{ 
      navigate(toHome, { replace: true })
      console.log("in")
    }
  },[])

  const preload =()=>{
    setLoad(true)
    setTimeout(() => {
      setLoad(false)
    }, 1500)
  }
  
  return (
    <React.Fragment>
      <span style={glassBg? {display:'block'}:{display:'none'}} className='glass-bg'></span>
      <div 
        id={display.bg} 
        className='body'
        onLoad={preload}
      >
        <Sidebar/>
        <div className='main'>
          <h1 id={display.color}>
            Welcome,  { userData === null? "": userData.username}
          </h1>

          {/* Add Random quote generator and also include the speakers */}
         
        </div>
      </div>
    </React.Fragment>
  )
}

export default Dashboard