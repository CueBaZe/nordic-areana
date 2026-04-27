import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Dashboard from './screens/Dashboard.tsx'
import BookingPage from './screens/bookingPage.tsx'
import BookingsPage from './screens/bookingsPage.tsx'
import Login from './screens/auth/login.tsx'
import Register from './screens/auth/register.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Dashboard />}/>
      <Route path='/booking' element={<BookingPage />}/>
      <Route path='/Bookninger' element={<BookingsPage />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
    </Routes>
  </BrowserRouter>
)
