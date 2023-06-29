import React,{useState, createContext} from "react";
import { lightTheme} from "../Comps/Themes";
import {lightNeumorphism} from "../Comps/morphism";
import { blue, pink, green, gold } from "../Comps/PrimaryColors";

const StyleContext = createContext({})

export const StyleProvider = ({children}) =>{
  const [theme, setTheme] = useState(lightTheme)
  const [primaryColor, setPrimaryColor] = useState(blue)
  const [morphism, setMorphism] = useState(lightNeumorphism)
  const [glassBg, setGlassBg] = useState(false)
  const [load, setLoad] = useState(false)
  return(
    <StyleContext.Provider value={{
      morphism, setMorphism,
      theme, setTheme,
      glassBg, setGlassBg,
      primaryColor, setPrimaryColor,
      load, setLoad
      }}>
        {children}
    </StyleContext.Provider>
  )
}

export default StyleContext