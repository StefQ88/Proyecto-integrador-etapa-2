import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Home from "../pages/Home"
import AboutUs from "../pages/Home"
import Upload from "../pages/Upload"
import ContactUs from '../pages/ContactUs'







function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route>
                <Route index path="/" element={<Home />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/contact-us" element={ContactUs} />
            </Route>
        </Routes>
    
    
    
    </BrowserRouter>
  )
}

export default AppRoutes