import React,{useState, createContext} from "react";

const DataContext = createContext({})

export const DataProvider = ({children}) =>{
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [registerSuccess, setRegisterSuccess] = useState(false)
  const [userData, setUserData] = useState("")
  const [auth, setAuth] = useState({});
  const [logInEmail, setLogInEmail] = useState()
  const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false)

  return(
    <DataContext.Provider value={{
      auth, setAuth,
      loginSuccess, setLoginSuccess,
      registerSuccess, setRegisterSuccess,
      userData, setUserData,
      logInEmail, setLogInEmail,
      persist, setPersist
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
 
export default DataContext