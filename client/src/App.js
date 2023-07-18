import React from  'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { HomePage } from "./components/HomePage";
import 'bootstrap/dist/css/bootstrap.min.css'
import DashboardPage from './components/DashboardPage';
import MyPostPage from './components/MypostsPage';


function App() {
  return(
    <Router>
    
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        {/* <Route path='/my-posts' element={<MyPostPage />}/> */}
      </Routes>
    </Router>
   

    
  )
  
}

export default App