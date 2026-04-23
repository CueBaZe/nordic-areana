import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Dashboard from './screens/Dashboard.tsx'
import BookingPage from './screens/bookingPage.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Dashboard />}/>
      <Route path='/booking' element={<BookingPage />}/>
    </Routes>
  </BrowserRouter>
)
