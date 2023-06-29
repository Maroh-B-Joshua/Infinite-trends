import React,{useContext, useState} from 'react'
import { Outlet } from 'react-router'
import Sidebar from '../Comps/Sidebar'
import PairSidebar from './AnalyticsPairs/PairSidebar'
import "../css/Analytics.css"
import "../css/pages.css"
import StyleContext from '../Context/StyleProvider'

const Analytics = () => {
  const {theme, morphism, glassBg, primaryColor} = useContext(StyleContext)
  const display = {...theme, ...morphism}
  
  return (
    <React.Fragment>
      <span style={glassBg? {display:'block'}:{display:'none'}} className='glass-bg'></span>
      <div className='body' id={display.bg}>
        <Sidebar/>
        <div className='main'>
          <PairSidebar 
            ulColor={display.color}
            navBg={display.subBg} 
            linkColor={primaryColor.link} 
            primaryColor={primaryColor.color}
          />
          <div className="main-analytics">
            <Outlet/>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Analytics