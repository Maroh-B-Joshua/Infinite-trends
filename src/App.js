import React,{useState, useContext, useRef, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import axios from './api/axios';
import Layout from './Layout';
import PersistLogin from './PersistLogin'; 
import Forgetpwd from './Forgetpwd';
import TopNavbar from './Comps/TopNavbar';
import BottomNavbar from './Comps/BottomNavbar';
import Sidebar from './Comps/Sidebar'
import MobileSidebar from './Comps/MobileSidebar'; 
import Dashboard from './pages/Dashboard' 
import Analytics from './pages/Analytics' 
import Account from './pages/Account';
import Btc from './pages/AnalyticsPairs/Btc';
import Eth from './pages/AnalyticsPairs/Eth';
import Xau from './pages/AnalyticsPairs/Xau';
import Doge from './pages/AnalyticsPairs/Doge';
import Ltc from './pages/AnalyticsPairs/Ltc';
import Trends from './pages/Trends' 
import BtcTrend from './pages/Trends/BtcTrend';
import EthTrend from './pages/Trends/EthTrend';
import DogeTrend from './pages/Trends/DogeTrend';
import LtcTrend from './pages/Trends/LtcTrend';
import XauTrend from './pages/Trends/XauTrend';
import Mails from './pages/Mails' 
import Settings from './pages/Settings' 
import UpGrade from './pages/UpGrade';
import SignUp from './SignUp'; 
import Login from './Login'; 
import Missing from './Missing';
import Loading from './Comps/Loading';
import './css/App.css'; 
import DataContext from './Context/DataProvider';
import { NavContext } from './Context/NavContext'; 
import { StyleProvider } from './Context/StyleProvider';
import StyleContext from './Context/StyleProvider';


function App() {
  
const {theme, morphism} = useContext(StyleContext)
  const [openNav, setOpenNav] = useState(false)
  const display = {...theme, ...morphism}
  
  return (
    <React.Fragment>
      <StyleProvider> 
        <main id={display.bg}>
          <React.Fragment> 
            <Router> 
              <NavContext.Provider value={{openNav, setOpenNav}}>
                <MobileSidebar/>
                <TopNavbar/>
              </NavContext.Provider>
              <BottomNavbar/> 
              <Loading/>

              <Routes>
                <Route path="/" element={<Layout/>}>
                  <Route path='login' element={<Login />} />
                  <Route path='signup' element={<SignUp/>}/>
                  <Route path='forgotpassword' element={<Forgetpwd/>}/>

                  <Route element={<PersistLogin />}>
                    <Route path="/" element={<Dashboard/>} /> 
                    <Route path="/analytics" element={<Analytics/>}>
                      <Route path='/analytics/' element={<Btc/>}/>
                      <Route path='/analytics/xau' element={<Xau/>}/>
                      <Route path='/analytics/eth' element={<Eth/>}/>
                      <Route path='/analytics/doge' element={<Doge/>}/>
                      <Route path='/analytics/ltc' element={<Ltc/>}/>
                    </Route>
                    <Route path="/trends" element={<Trends/>} >
                      <Route path="/trends/" element={<BtcTrend/>} />
                      <Route path="/trends/xau" element={<XauTrend/>} />
                      <Route path="/trends/ltc" element={<LtcTrend/>} />
                      <Route path="/trends/doge" element={<DogeTrend/>} />
                      <Route path="/trends/eth" element={<EthTrend/>} />
                    </Route>
                    <Route path="/mails" element={<Mails/>} />
                    <Route path="/settings" element={<Settings/>} />
                    <Route path="/upgrade" element={<UpGrade/>} />
                    <Route path="/account" element={<Account/>} />
                  </Route>

                  {/* catch all */}
                  <Route path="*" element={<Missing />} />
                </Route>
              </Routes>
            </Router>
          </React.Fragment>
        </main> 
      </StyleProvider>
    </React.Fragment> 
  )
}

export default App;