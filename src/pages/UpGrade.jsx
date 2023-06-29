import React,{useContext, useState} from 'react'
import Sidebar from '../Comps/Sidebar'
import PriceCards from '../Comps/PriceCards'
import "../css/pages.css"
import "../css/prices.css"
import StyleContext from '../Context/StyleProvider'

const UpGrade = () => {
  const {theme, morphism, glassBg, primaryColor} = useContext(StyleContext)
  const display = {...theme, ...morphism}
  
  return (
    <React.Fragment>
      <span style={glassBg? {display:'block'}:{display:'none'}} className='glass-bg'></span>
      <div className='body' id={display.bg}>
        <Sidebar/>
        <div className='main'>
          <h1 id={display.color}>UpGrade</h1>
          <PriceCards
            display={display}
            primaryColor = {primaryColor}
          />

        </div>
      </div>
    </React.Fragment>
  )
}

export default UpGrade