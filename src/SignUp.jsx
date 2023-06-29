import React,{useContext, useState, useEffect, useRef} from 'react' 
import { Link } from 'react-router-dom';
import axios from './api/axios';
import DataContext from './Context/DataProvider'; 
import Countries from './Comps/Countries';
import * as AiIcons from "react-icons/ai" 
import * as FaIcons from "react-icons/fa" 
import ReCAPTCHA from 'react-google-recaptcha'
import './css/Signup.css'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,17}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = 'https://intrendsanalytics.herokuapp.com/users/add-user'

const SignUp = () => {

  const userRef = useRef();
  const errRef = useRef();

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const [username, setUserName] = useState('')
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState('')
  const [dob, setDob] = useState('')

  const [password, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [country, setCountry] = useState('');


  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [redirectSuccess, setRedirectSuccess] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  // const [success, setSuccess] = useState(false);
  
  const {registerSuccess, setRegisterSuccess} = useContext(DataContext)

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setValidName(USER_REGEX.test(username));
  }, [username])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidMatch(password === matchPwd);
  }, [password, matchPwd])

  useEffect(() => {
    setErrMsg('');
  }, [username, password, matchPwd])

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

  const handleSignUp = async e =>{
    e.preventDefault()
    
    const formData = new FormData()
    formData.append("firstName", firstName)
    formData.append("lastName", lastName)
    formData.append("username", username)
    formData.append("email", email)
    formData.append("password", password)
    formData.append("dob", dob)
    formData.append("country", country)

    try {
      const response = await axios.post(REGISTER_URL,
          formData,
          {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
          }
      );
      console.log(response?.data);
      console.log(response?.token);
      console.log(JSON.stringify(response))
      
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setFirstName('')
      setLastName('')
      setUserName('')
      setEmail('')
      setDob('')
      setCountry('')
      setPwd('');
      setMatchPwd('');
      
      setSignUpSuccess(true);
      
      setTimeout(()=>{
        setRedirectSuccess(true);
      },2000)

      setTimeout(()=>{
        setRegisterSuccess(false);
        setSignUpSuccess(false);
      },4500)

  }
  catch (err) {
    if (!err?.response) {
        setErrMsg('No Server Response or No Connection');
    } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
    } else if (err.response?.status === 408) {
        setErrMsg('Email Address Already Taken');
    } 
    else {
        setErrMsg('Registration Failed')
    }
    errRef.current.focus();
  }

}

  return (
    <React.Fragment>
      <section  
        className='registration-comp'
      >

        <div 
          className='err-msg'
          style={errMsg.length > 2? {opacity:"1", zIndex:"10"}:{opacity:"0", zIndex:"0"}}
        >
          <span>
            <p ref={errRef} aria-live="assertive">{errMsg}</p>
            <FaIcons.FaTimes/>
          </span>
        </div>

        <div 
          className='welcome-msg'
          style={signUpSuccess? {opacity:"1", zIndex:"10"} : {opacity:"0", zIndex:"0"}}
        > 
          <div>
            <span>
              <p>Registration Successful</p>
              <AiIcons.AiOutlineCheckCircle/>
            </span>
            <p style={redirectSuccess? {opacity:'1'}: {opacity:'0'}}>Redirecting to log in. . .</p>
          </div>
        </div>



        <h2>
          Welcome !
          <br />
          Let's get you signed up
        </h2>

        <form onSubmit={handleSignUp}>

          <label htmlFor="first-name">First Name</label>
          <input 
            type="text"
            autoComplete="off"
            ref={userRef}
            name="first-name" 
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required 
          />

          <label htmlFor="last-name">Last Name</label>
          <input 
            type="text"
            autoComplete="off"
            ref={userRef}
            name="last-name" 
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
          />

          <label htmlFor="user-name">User Name</label>
          <input 
            type="text"
            autoComplete="off"
            ref={userRef}
            name="user-name" 
            value={username}
            onChange={e => setUserName(e.target.value)}
            required
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />

          <p id="note" style={userFocus && username && !validName ? {display:"block"} : {display:"none"}}>
            <AiIcons.AiFillInfoCircle />
            4 to 18 characters.<br />
            Must begin with a letter.<br />
            Letters, numbers, underscores, hyphens allowed.
          </p>

          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            name="email" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            required 
          />

          <label htmlFor="date">Date Of Birth</label>
          <input 
            type="date" 
            value={dob}
            onChange={e => setDob(e.target.value)}
            name="date"
            required

          />
          
          <label htmlFor="country">Country</label>
          <Countries country={country} setCountry={setCountry} /> 

          <label htmlFor="password">
            Password
            <FaIcons.FaCheck className='check' style={validPwd ? {display:"block"}: {display:"none"}}/>
            <FaIcons.FaTimes className='times' style={validPwd || !password ? {display:"none"}: {display:"block"}} />
          </label>

          <div className='pswrd'>
            <input 
              type={type}
              value={password}
              onChange={e => setPwd(e.target.value)}
              name="password" 
              required
              aria-invalid={validPwd ? "false" : "true"}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <span onClick={togglePassword}>
              { type==='password'?
              <AiIcons.AiOutlineEye/>:<AiIcons.AiOutlineEyeInvisible />
              }
            </span>
          </div>

          <p id="note" style={pwdFocus && !validPwd ? {display:"block"} : {display:"none"}}>
            <AiIcons.AiFillInfoCircle />
            8 to 24 characters.<br />
            Must include uppercase and lowercase letters, a number and a special character.<br />
            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
          </p>

          <label htmlFor="confirm-password">
            Confirm Password
            <FaIcons.FaCheck className='check' style={validMatch && matchPwd? {display:"block"}: {display:"none"}}/>
            <FaIcons.FaTimes className='times' style={validMatch || !matchPwd? {display:"none"}: {display:"block"}} />
          </label>

          <div className='pswrd'>
            <input 
              type={type} 
              value={matchPwd}
              onChange={e => setMatchPwd(e.target.value)}
              name="confirm-password" 
              required
              aria-invalid={validMatch ? "false" : "true"}
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <span onClick={togglePassword}>
              { type==='password'?
              <AiIcons.AiOutlineEye />:<AiIcons.AiOutlineEyeInvisible/>
              }
            </span>
          </div>

          <p id="note" style={matchFocus && !validMatch ? {display:"block"} : {display:"none"}}>
            <AiIcons.AiFillInfoCircle />
            Must match the first password input field.
          </p>

          {/* These should be found in the landing page */}
          <br /> 
          <div className='check-box'>
            <input type="checkbox" name="t&c" required />
            <label htmlFor='t&c'>Do you accept our <a href="">Terms and coditions</a></label>
          </div>
          
          <div className='check-box'>
            <input type="checkbox" name="policy" required />
            <label htmlFor='policy'>Do you accept our <a href="">Privacy Policy</a></label>
          </div>

          <br />

          {/* Dont forget to add a bot confirmation input like the recaptcher thing */}
          {/* <ReCAPTCHA
            sitekey="6LfRFEQkAAAAAC6JaUvt1GGVqITp-7rpcQSoA-Hc"
            onChange={(e)=>e.target.value}  
          /> */}

          <button
            className='register-btn'
            disabled={!validName || !validPwd || !validMatch ? true : false}
          >
            Sign up
          </button>

          <p>
            Already signed up ?
            <br />
            <Link to="/login">Login</Link>
          </p>
        </form>
      </section>
    </React.Fragment>
  )
}


export default SignUp