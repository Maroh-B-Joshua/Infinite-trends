import { useContext, useDebugValue } from 'react'
import DataContext from '../Context/DataProvider'

const useAuth = () => {
  const { auth } = useContext(DataContext);
  useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out")
  return useContext(DataContext) 
}

export default useAuth