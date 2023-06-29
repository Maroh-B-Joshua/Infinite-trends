import React,{useState, createContext} from "react";

export const NavContext = createContext(false)


  
// export const NavProvider = ({children}) =>{
//   const {openNav, setOpenNav} = useState(false)

//   return(
//     <NavContext.Provider value={{ openNav, setOpenNav }}>
//       {children}
//     </NavContext.Provider>
//   )

// }

// export default NavContext