import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from './components/authContext.tsx'

import Dashboard from './screens/Dashboard.tsx'
import BookingPage from './screens/bookingPage.tsx'
import BookingsPage from './screens/bookingsPage.tsx'
import Login from './screens/auth/login.tsx'
import Register from './screens/auth/register.tsx'
import NeedLogin from './screens/needlogin.tsx'

import Padel from './screens/bookingPages/padel.tsx'
import Tennis from './screens/bookingPages/tennis.tsx'
import Bordtennis from './screens/bookingPages/bordtennis.tsx'
import Badminton from './screens/bookingPages/badminton.tsx'
import Fodbold from './screens/bookingPages/fodbold.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Dashboard />}/>
        <Route path='/booking' element={<BookingPage />}/>
        <Route path='/Bookninger' element={<BookingsPage />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/forbidden' element={<NeedLogin />}/>

        <Route path='/booking/padel' element={<Padel />}/>
        <Route path='/booking/tennis' element={<Tennis />}/>
        <Route path='/booking/bordtennis' element={<Bordtennis />}/>
        <Route path='/booking/badminton' element={<Badminton />}/>
        <Route path='/booking/foldbold' element={<Fodbold />}/>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
)
