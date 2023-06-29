import React from 'react'
import { NavLink } from 'react-router-dom'
import * as AiIcons from "react-icons/ai"
import * as FaIcons from "react-icons/fa"
import * as SiIcons from "react-icons/si"
import "../../css/PairSidebar.css"

const PairSidebar = ({ulColor, navBg, linkColor, primaryColor}) => {

  return (
    <div className='nav-container'>
      <nav id={navBg} className='pair-sidebar'>
        <h2 className='heading' id={ulColor}>Items</h2>
        <ul id={ulColor}>
          <li id={linkColor}>
            <NavLink 
              to={'/analytics/'}
              className={({isActive}) => (isActive ? primaryColor : '')}
            >
              <FaIcons.FaBtc/>
              <span>Bitcoin</span>
            </NavLink>
          </li>

          <li id={linkColor}>
            <NavLink 
              to={'/analytics/xau'} 
              className={({isActive}) => (isActive ? primaryColor : '')}
            >
              <AiIcons.AiFillGolden/>
              <span>Gold</span>
            </NavLink>
          </li>

          <li id={linkColor}>
            <NavLink 
              to={'/analytics/eth'}
              className={({isActive}) => (isActive ? primaryColor : '')}
            >
              <FaIcons.FaEthereum/>
              <span>Ethereum</span>
            </NavLink>
          </li>

          <li id={linkColor} >
            <NavLink 
              to={'/analytics/ltc'}
              className={({isActive}) => (isActive ? primaryColor : '')}
            >
              <SiIcons.SiLitecoin/>
              <span>Litecoin</span>
            </NavLink>
          </li>

          <li id={linkColor} >
            <NavLink 
              to={'/analytics/doge'}
              className={({isActive}) => (isActive ? primaryColor : '')}
            >
              <SiIcons.SiDogecoin/>
              <span>Doge</span>
            </NavLink>
          </li>

        </ul>
      </nav>
    </div>
  )
}

export default PairSidebar