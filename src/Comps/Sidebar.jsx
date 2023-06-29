import React,{useContext, useEffect} from 'react' 
import { useNavigate, NavLink} from "react-router-dom" 
import useLogout from "../hooks/useLogout";
import axios from '../api/axios'
import Logo from './LsLogo'
import * as CgIcons from "react-icons/cg"
import * as AiIcons from "react-icons/ai"
// import * as FaIcons from "react-icons/fa"
import * as BsIcons from "react-icons/bs"
import * as FiIcons from "react-icons/fi"
import * as MdIcons from "react-icons/md"
import * as SlIcons from "react-icons/sl" 
import * as RxIcons from "react-icons/rx" 
import StyleContext from '../Context/StyleProvider'
import DataContext from '../Context/DataProvider'

import "../css/sidebar.css"
import "../css/Color.css"

const Sidebar = () => {
  const { userData, setUserData, logInEmail} = useContext(DataContext)
  const {morphism, theme, primaryColor} = useContext(StyleContext)

  const display = {...morphism, ...theme}

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
  const logout = useLogout();

  const signOut = async () => {
      await logout();
      navigate('/');
  }

  
  
  return (
    <nav className='side-nav' id={display.primaryBg}> 
      <ul id={display.color}>
        <li>
          <NavLink to={'/'} className="logo">
            <Logo/>
            {/* <span>infinite Trends</span> */}
            {/* this img should and will be converted to an svg like the other icons */}
          </NavLink>
        </li>

        <li id={primaryColor.link}>
          <NavLink 
            to={'/'}
            id={display.link}
            className={({isActive}) => (isActive ? primaryColor.color : '')}
          > 
            <CgIcons.CgHome/>
            <span>Home</span>
          </NavLink>
        </li>
        
        <li id={primaryColor.link}>
          <NavLink 
            to={'/analytics'}
            id={display.link}
            className={({isActive}) => (isActive ? primaryColor.color : '')}
          >
            <AiIcons.AiOutlineLineChart/>
            <span>Analytics</span>
          <sup className='new-indicator' id={primaryColor.bgColor}></sup>
          </NavLink>
        </li>

        {/* Only premium users have access to this route */}
        <li id={primaryColor.link}>
          <NavLink 
            to={'/trends'} 
            id={display.link}
            className={({isActive}) => (isActive ? primaryColor.color : '')}
          >
            <FiIcons.FiTrendingUp/>
            <span>Trends</span>
          <sup className='new-indicator' id={primaryColor.bgColor}></sup>
          </NavLink>
        </li>

        {/* Only free users Have access to this route */}
        <li 
          id={primaryColor.link}
          style={(userData === null? "" : userData.accountType)!== "Free"?
           {display:"none"}
           :
           {display:"block"}}
        >
          <NavLink 
            to={'/upgrade'} 
            id={display.link}
            className={({isActive}) => (isActive ? primaryColor.color : '')}
          >
            <RxIcons.RxDoubleArrowUp/>
            <span>Upgrade</span>
          </NavLink>
        </li>

        <li id={primaryColor.link}>
          <NavLink 
            to={'/mails'}
            id={display.link}
            className={({isActive}) => (isActive ? primaryColor.color : '')}
          >
            <AiIcons.AiOutlineMail/>
            <span>Mails</span>
          <sup className='new-indicator' id={primaryColor.bgColor}></sup>
          </NavLink>
        </li>

        <li id={primaryColor.link}>
          <NavLink 
            to={'/settings'} 
            id={display.link}
            className={({isActive}) => (isActive ? primaryColor.color : '')}
            >
            <BsIcons.BsGear/>
            <span>Settings</span>
          </NavLink>
        </li>

        <li>
          <div className='user-name' >
            <h4 id={primaryColor.bgColor}>
              <p>
                {
                  userData === null ? 
                  ""
                  :
                  (userData.username?.charAt(0).toUpperCase())
                }
              </p>
            </h4>

            {/* h3 will be a big circle of the first letter of the username or their image perhaps*/}
            {/* <span>{username}</span> username can't be more than 14 characters */}
            
            <span>
              {
                userData === null?
                ""
                :
                userData.username
              }
            </span>
            <SlIcons.SlOptions/>
            <div id={display.primaryBg}>
              <NavLink to={'/account'}>
                <MdIcons.MdOutlineAccountCircle/>
                <span>Account</span>
              </NavLink>
              <NavLink to={'/'} onClick={signOut}>
                <MdIcons.MdLogout/>
                <span>Logout</span>
              </NavLink>
            </div>
          </div>
        </li>
      </ul>

    </nav>
  )
}

export default Sidebar