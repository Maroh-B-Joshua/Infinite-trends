import React,{useContext, useEffect, useState, useRef} from 'react'  
import { Link, useNavigate, useLocation} from 'react-router-dom';
import axios from './api/axios';
import * as AiIcons from "react-icons/ai"  
import StyleContext from './Context/StyleProvider';
import DataContext from './Context/DataProvider';
import SignUp from './SignUp';
import './css/Login.css';
import { lightTheme, darkTheme } from './Comps/Themes';
import { lightNeumorphism, darkNeumorphism, glassmorphism } from './Comps/morphism';
import { blue, pink, green, gold, cyan, purple } from './Comps/PrimaryColors'
import Logo from './Comps/LsLogo';
import bgImg from './Ui-bg/bull-bear.png'
import useAuth from './hooks/useAuth';
const LOGIN_URL = "https://intrendsanalytics.herokuapp.com/auth/"

const Login = () => {
  const {setAuth} = useAuth();
  const {setLogInEmail, persist, setPersist, userData} = useContext(DataContext)
  const {morphism, setMorphism, theme, setTheme, glassBg, setGlassBg, primaryColor, setPrimaryColor, setLoad} = useContext(StyleContext)
  const display = {...theme, ...morphism}
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const toLogin = location.state?.from?.pathname || "/login";

  const[loginTheme, setLoginTheme] = useState()
  const[loginMorph, setLoginMorph] = useState()
  const[loginColor, setLoginColor] = useState(Math.floor(Math.random() * 30))

  useEffect(()=>{
    setLoginTheme( Math.floor(Math.random() * 10))
    setLoginMorph(Math.floor(Math.random() * 15))
    setLoginColor(Math.floor(Math.random() * 30))
  },[])
 
  // Randomizing Theme
  if(loginTheme >= 4){
    setTheme(darkTheme)

    if(morphism !== glassmorphism){
      setMorphism(darkNeumorphism)
    }else{
      setMorphism(glassmorphism)
    }
  }else{
    setTheme(lightTheme)

    if(morphism !== glassmorphism){
      setMorphism(lightNeumorphism)
    }else{
      setMorphism(glassmorphism)
    }
  }

  // Randomizing Morphism
  if(loginMorph >= 11){
    setMorphism(glassmorphism)
    setGlassBg(true)
  }else{
    if(theme === lightTheme){
      setMorphism(lightNeumorphism)
    }else{
      setMorphism(darkNeumorphism)
    }
  }

  // Randomizing Color
  switch(loginColor){
    case 0:
      setPrimaryColor(blue)
      break
    
    case 10:
      setPrimaryColor(green)
      break

    case 15:
      setPrimaryColor(cyan)
      break 
    
    case 20:
      setPrimaryColor(gold)
      break
    
    case 25:
      setPrimaryColor(purple)
      break
    
    case 30:
      setPrimaryColor(pink)
      break
  }

  // Password input

  const [type, setType]=useState('password'); 

  const togglePassword =() =>{    
    if(type==='password'){ 
      setType('text');
    }
    else{ 
      setType('password');
    }
  }

  const userRef = useRef()
  const errRef = useRef()

  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [errMsg, setErrMsg] = useState("") 


  useEffect(()=>{
    userRef.current.focus()
  },[])

  useEffect(()=>{
    setErrMsg("")
  },[user, password])


  const handleSubmit = async e =>{
    e.preventDefault() 
    
    setLogInEmail(user)
    
    const formData = new FormData()
    formData.append("email", user)
    formData.append("password", password)

    try {
      const response = await axios.post(LOGIN_URL,
          formData,
          {
              headers: { 'Content-Type': 'application/json'},
              withCredentials: true
          }
      );
      console.log(JSON.stringify(response?.data));
      console.log(JSON.stringify(response?.data?.token)); 
      // set(JSON.stringify(response?.data));
      const accessToken = response?.data?.token;
      const roles = response?.data?.roles;
      setAuth({ user, password, roles, accessToken });
      setUser('');
      setPassword('');
      setLoad(true)
      navigate(from, { replace: true });
      setTimeout(()=>{
        setLoad(false)
      },3000)
    }
    catch (err) {
      if (!err?.response) {
          setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
          setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
          setErrMsg('Unauthorized');
      } else {
          setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  }

  const togglePersist = () => {
    setPersist(prev => !prev);
  }

  useEffect(() => {
      localStorage.setItem("persist", persist);
  }, [persist])

  useEffect(()=>{
    if(userData === "" || null){
      // setLoad(true)
      navigate(toLogin, { replace: true });
    }
    else{
      navigate(from, { replace: true });
    }
  },[])

  return (
    <React.Fragment>
 
      <div
        className='login-comp' 
        id={display.bg}
        style={glassBg? {backgroundImage:`url(${bgImg})`}:{backgroundImage:'none'}}
      >
        
        <p ref={errRef} arai-live="assertive" className={errMsg? "errmsg": "offscreen"}>{errMsg}</p>
        
        <form id={display.primaryBg} className='form' onSubmit={handleSubmit}>
          <div className='login-logo'>
            <Logo/>
          </div>
          <label id={display.color} htmlFor='email'>Email</label>
          <input
            type="email"
            name="email"
            id={display.input}
            ref={userRef}
            autoComplete="off"
            onChange={e => setUser(e.target.value)}
            value={user}
            required
          />

          <label id={display.color}  htmlFor='password'>Password</label>
          <div className='pswd' id={display.input}>
            <input 
              type={type}
              name="password"
              id={display.color} 
              onChange={e => setPassword(e.target.value)}
              value={password}
              required
            />
            <span onClick={togglePassword}>
              { type==='password'?
                <AiIcons.AiOutlineEye id={display.color}/>:<AiIcons.AiOutlineEyeInvisible id={display.color}/>
              }
            </span>
          </div>

          <p className='forget' id={display.color}>
            <Link to='/forgotpassword' id={display.color}>
             Forgot password?
            </Link>
          </p>

          <div className="persistCheck">
            <input
              type="checkbox"
              id="persist"
              onChange={togglePersist}
              checked={persist}
            />
            <label id={display.color} htmlFor="persist">Remember me</label>
          </div>

          <button id={primaryColor.bgColor}>Login</button> 

          <p id={display.color}>
            Not signed up yet ? 
            <br />
            <Link to="/signup" id={display.color}>Sign up</Link>
          </p>

        </form>
      </div>
    </React.Fragment>
  )
}

export default Login