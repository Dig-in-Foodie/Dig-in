import React from  'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { HomePage } from "./components/HomePage";
import 'bootstrap/dist/css/bootstrap.min.css'
import CustomNav from './components/CustomNav';
import DashboardPage from './components/DashboardPage';


function App() {
  return(
    <Router>
    
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
      </Routes>
    </Router>
   

    
  )
  
}

export default App