import React,{useState, useContext} from 'react'
import { NavLink } from 'react-router-dom' 
import DataContext from '../Context/DataProvider'
import {NavContext} from '../Context/NavContext' 
import StyleContext from '../Context/StyleProvider'
import * as BiIcons from "react-icons/bi" 
import * as AiIcons from "react-icons/ai" 
import * as RiIcons from "react-icons/ri" 
import * as BsIcons from "react-icons/bs"
import * as RxIcons from "react-icons/rx"
import * as MdIcons from "react-icons/md"
import "../css/mobilesidebar.css"
import "../css/Color.css"
import { darkTheme, lightTheme } from './Themes'
import { lightNeumorphism, darkNeumorphism, glassmorphism } from './morphism'

const MobileSidebar = () => {
  const {setLoginSuccess, userData} = useContext(DataContext)
  const logout = () =>{
    setOpenNav(false)
    setLoginSuccess(false)
  }
  const {openNav, setOpenNav} = useContext(NavContext)
  const closeNav = () => setOpenNav(false)
  const {theme, setTheme, morphism, setMorphism, primaryColor} = useContext(StyleContext)
  
  const display = {...theme, ...morphism}
  
  const toggleTheme = () =>{ 

    if(theme === lightTheme){
      setTheme(darkTheme)

        if(morphism !== glassmorphism){
          setMorphism(darkNeumorphism)
        }else{
          setMorphism(glassmorphism)
        }
    }
    else if(theme === darkTheme){
      setTheme(lightTheme)

        if(morphism !== glassmorphism){
          setMorphism(lightNeumorphism)
        }else{
          setMorphism(glassmorphism)
        }
    }

  }


  return (
    <React.Fragment>
      <div onClick={closeNav} className={openNav? "overlay-bg": "overlay"}></div>
      <nav 
        style={{boxShadow:"none"}}
        id={display.primaryBg} 
        className={openNav? 'mobile-nav open':'mobile-nav'}
      >
        <div>
          <span>
            <h4 id={primaryColor.bgColor} className='mobile-user'>
              <span>
                {
                  userData === null?
                  ""
                  :
                  userData.username?.charAt(0).toUpperCase()
                }
              </span>
            </h4>
            <span onClick={closeNav} className='close'>
              <BiIcons.BiArrowToLeft id={display.color}/>
            </span>
          </span>

          <div> 
              <h3 id={display.color}>
                {
                  userData === null ?
                  ""
                  :
                  userData.username
                }
              </h3>
            {/* <div>{username}</div> username can't be more than 14 characters */}
          </div>
        </div>

        <section className='layer-2'>
          <h3 id={display.color}>Theme :</h3>
          <div className="switch">
            <label onClick={toggleTheme}>
              <div className='slider' id={display.obj}>
                <span id={primaryColor.bgColor} className={theme !== lightTheme? '': 'slid'}>
                  {theme === lightTheme? < BsIcons.BsSun/>:< BsIcons.BsFillMoonStarsFill/>}
                </span>
              </div> 
            </label> 
          </div>
        </section>

        <ul id={display.color}>
          <li id={primaryColor.link} >
            <NavLink to={'/account'} onClick={closeNav}>
              <RiIcons.RiAccountCircleLine/>
              <span>Account</span>
            </NavLink>
          </li>

          <li id={primaryColor.link} >
            <NavLink to={'/upgrade'} onClick={closeNav}>
              <RxIcons.RxDoubleArrowUp/>
              <span>Upgrade</span>
            </NavLink>
          </li>

          <li id={primaryColor.link}>
            <NavLink to={'/mails'} onClick={closeNav}>
              <AiIcons.AiOutlineMail/>
              <span>Mails</span>
              <sup className='new-indicator' id={primaryColor.bgColor}></sup>
            </NavLink>
          </li>

          <li id={primaryColor.link} >
            <NavLink to={'/settings'} onClick={closeNav}>
              <BsIcons.BsGear/>
              <span>Settings</span>
            </NavLink>
          </li>

          <li id={primaryColor.link} >
            <NavLink to={'/'} onClick={logout}>
              <MdIcons.MdLogout/>
              <span>Logout</span>
            </NavLink>
          </li>
        </ul>

      </nav>
    </React.Fragment>
  )
}

export default MobileSidebar