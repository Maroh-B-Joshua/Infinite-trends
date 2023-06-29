import React,{useContext, useState} from 'react'
import StyleContext from '../Context/StyleProvider'
import Sidebar from '../Comps/Sidebar'
import "../css/Trends.css"
import "../css/pages.css"

const Trends = () => {
  const {theme, morphism, glassBg, primaryColor} = useContext(StyleContext)
  const display = {...theme, ...morphism}

  return (
    <React.Fragment>
      <span style={glassBg? {display:'block'}:{display:'none'}} className='glass-bg'></span>
      <div className="body" id={display.bg}>
        <Sidebar/>
        <div className='main'>
          <h1>Trends</h1>
        </div>
      </div>

    </React.Fragment>
  )
}

export default Trends