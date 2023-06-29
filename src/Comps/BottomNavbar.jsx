import React,{useContext,useState} from 'react'
import { NavLink} from "react-router-dom"
import * as AiIcons from "react-icons/ai"
import * as CgIcons from "react-icons/cg"
import * as FiIcons from "react-icons/fi"
import * as RxIcons from "react-icons/rx"
import "../css/navbar.css"
import StyleContext from '../Context/StyleProvider' 

 
const BottomNavbar = () => {
  const {morphism, theme, primaryColor} = useContext(StyleContext)
  const display = {...morphism, ...theme}

  
  return (
    <nav className='bottom-navbar' id={display.navBar}>
      <ul>
        <li>
          <NavLink to={"/"} id={primaryColor.link}>
            <CgIcons.CgHome id={display.color}/> 
          </NavLink>
        </li>
        <li>
          <NavLink to={"/analytics"} id={primaryColor.link}>
            <AiIcons.AiOutlineLineChart id={display.color}/>
            <sup className='new-indicator' id={primaryColor.bgColor}></sup>
          </NavLink>
        </li>

        {/* only premium users can have access to the trends */}
        <li>
          <NavLink to={"/trends"} id={primaryColor.link}>
            <FiIcons.FiTrendingUp id={display.color}/>
            <sup className='new-indicator' id={primaryColor.bgColor}></sup>
          </NavLink>
        </li>

        {/* Only free users Can see the upgrade page  */}
        {/* <li>
          <NavLink to={"/upgrade"} id={primaryColor.link}>
            <RxIcons.RxDoubleArrowUp id={display.color}/> 
          </NavLink>
        </li> */}
      </ul>
    </nav>
  )
}

export default BottomNavbar