import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from './components/authContext.tsx'

import Dashboard from './screens/Dashboard.tsx'
import BookingsPage from './screens/bookingsPage.tsx'
import Login from './screens/auth/login.tsx'
import Register from './screens/auth/register.tsx'
import NeedLogin from './screens/needlogin.tsx'

import CalendarPage from './screens/calendarPage.tsx'



createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Dashboard />}/>
        <Route path='/Bookninger' element={<BookingsPage />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/forbidden' element={<NeedLogin />}/>
        <Route path='/booking' element={<CalendarPage />}/>

      </Routes>
    </AuthProvider>
  </BrowserRouter>
)
