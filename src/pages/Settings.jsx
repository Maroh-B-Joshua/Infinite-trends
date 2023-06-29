import React,{useContext, useState} from 'react'
import Sidebar from '../Comps/Sidebar' 
import '../css/Settings.css'
import "../css/pages.css"
import * as AiIcons from "react-icons/ai"
import StyleContext from '../Context/StyleProvider'
import { lightTheme, darkTheme } from '../Comps/Themes'
import { blue, pink, green, gold, cyan, purple } from '../Comps/PrimaryColors'
import { glassmorphism, lightNeumorphism, darkNeumorphism } from '../Comps/morphism'


const Settings = () => {
  const {morphism, setMorphism, theme, setTheme, glassBg, setGlassBg, primaryColor, setPrimaryColor} = useContext(StyleContext)
  
  //  Theme 
  const toggleLight = () =>{ 
      setTheme(lightTheme)

      if(morphism !== glassmorphism){
        setMorphism(lightNeumorphism)
      }else{
        setMorphism(glassmorphism)
      }
  }

  const toggleDark = () =>{
      setTheme(darkTheme)

      if(morphism !== glassmorphism){
        setMorphism(darkNeumorphism)
      }else{
        setMorphism(glassmorphism)
      } 
  }

  // Primary Colors
  const [currColor, setCurrColor] = useState(primaryColor)

  const setBlue = () =>{
    setPrimaryColor(blue)
    setCurrColor(blue)
  }
  const setGreen = () =>{
    setPrimaryColor(green)
    setCurrColor(green)
  }
  const setPink = () =>{
    setPrimaryColor(pink)
    setCurrColor(pink)
  }
  const setGold = () =>{
    setPrimaryColor(gold)
    setCurrColor(gold)
  }

  const setCyan = () =>{
    setPrimaryColor(cyan)
    setCurrColor(cyan)
  }
  const setPurple = () =>{
    setPrimaryColor(purple)
    setCurrColor(purple)
  }

  // Morphism
 
  const toggleNeumorphism = () =>{
    if(theme === lightTheme){
      setMorphism(lightNeumorphism)
      setGlassBg(false)
    }
    else if(theme === darkTheme){
      setMorphism(darkNeumorphism)
      setGlassBg(false)
    }
  }
  
  const toggleGlassmorphism = () =>{
    setMorphism(glassmorphism)
    setGlassBg(true)
  }

  const display = {...theme, ...morphism}

  return (
    <React.Fragment>
      <span style={glassBg? {display:'block'}:{display:'none'}} className='glass-bg'></span>
      <div 
        className='body' 
        id={display.bg} 
      >
        <Sidebar />
        <div className='main'>
          <div id='setting-container'>

            <div className='theme-option' id={display.primaryBg}>
              <h3 id={display.color}>Theme :</h3>
              <div>
                <button className='light-btn' onClick={toggleLight}>
                  <AiIcons.AiOutlineCheck style={theme === lightTheme? {display:"block"}:{display:"none"}}/>
                </button>

                <button className='dark-btn' onClick={toggleDark}>
                  <AiIcons.AiOutlineCheck style={theme === darkTheme? {display:"block"}:{display:"none"}}/>
                </button>

              </div>
            </div>
            
            <div className='style-option' id={display.primaryBg}>
              <h3 id={display.color}> Interface Style :</h3>
              <button id={primaryColor.bgColor} onClick={toggleNeumorphism}>
                <span>Neumorphism</span>
                <AiIcons.AiOutlineCheckCircle style={morphism === glassmorphism? {opacity:"0"}:{opacity:"1"}}/>
              </button>

              <button id={primaryColor.bgColor} onClick={toggleGlassmorphism}>
                <span>Glassmorphism</span> 
                <AiIcons.AiOutlineCheckCircle style={morphism === glassmorphism? {opacity:"1"}:{opacity:"0"}}/>
              </button>
            </div>

            <div className='color-options' id={display.primaryBg}>
              <h3 id={display.color}>Color :</h3>
              <div>
                <button id={blue.bgColor} onClick={setBlue}>
                  <AiIcons.AiOutlineCheck style={currColor === blue? {display:"block"}:{display:"none"}}/>
                </button>

                <button id={green.bgColor} onClick={setGreen}>
                  <AiIcons.AiOutlineCheck style={currColor === green? {display:"block"}:{display:"none"}}/>
                </button>

                <button id={pink.bgColor} onClick={setPink}>
                  <AiIcons.AiOutlineCheck style={currColor === pink? {display:"block"}:{display:"none"}}/>
                </button>

                <button id={gold.bgColor} onClick={setGold}>
                  <AiIcons.AiOutlineCheck style={currColor === gold? {display:"block"}:{display:"none"}}/>
                </button>

                <button id={cyan.bgColor} onClick={setCyan}>
                  <AiIcons.AiOutlineCheck style={currColor === cyan? {display:"block"}:{display:"none"}}/>
                </button>

                <button id={purple.bgColor} onClick={setPurple}>
                  <AiIcons.AiOutlineCheck style={currColor === purple? {display:"block"}:{display:"none"}}/>
                </button>
              </div>
            </div>
              
          </div>
        </div>
      </div>
    </React.Fragment>

  )
}

export default Settings