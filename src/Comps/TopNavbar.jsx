import React,{useState, useContext} from 'react'
import { NavLink} from "react-router-dom"
import {NavContext} from '../Context/NavContext'
import Logo from './Logo' 
import "../css/navbar.css"
import "../css/Color.css"
import DataContext from '../Context/DataProvider'
import StyleContext from '../Context/StyleProvider'

const TopNavbar = () => {
  const {openNav, setOpenNav} = useContext(NavContext)
  const openSideNav = () => {setOpenNav(true)}
  
  const {theme, morphism, primaryColor} = useContext(StyleContext)
  const display = {...theme, ...morphism}

  const {userData} = useContext(DataContext)

   
  return (
    <nav className='top-navbar' id={display.navBar}> 
      <span className='user'>
        <h4 onClick={openSideNav} id={primaryColor.bgColor}>
          <span>
            {
              userData === null?
              ""
              :
              userData.username?.charAt(0).toUpperCase()
            }
          </span>
        </h4>
      </span>
      {/* h4 will be a big circle of the first letter of the username or their image perhaps*/}

      <NavLink to={'/'} className='logo'>
        {/* <img src={logo} className='logo-img'/> */}
        <Logo className='logo-img'/>
      </NavLink>
    </nav>
  )
}

export default TopNavbar