import axios from '../api/axios'
import useAuth from './useAuth'

const refreshToken = "https://intrendsanalytics.herokuapp.com/refreshToken"

const useRefreshToken = () => {
  const {setAuth} = useAuth()

  const refresh = async () =>{
    const response = await axios.get(refreshToken,{
      withCredentials:true
    })
    setAuth(prev =>{
      console.log(JSON.stringify(prev))
      console.log(response.data)
      return {...prev, 
        accessToken: response.data}
    })

    return response.data
  }

  return refresh
}

export default useRefreshToken