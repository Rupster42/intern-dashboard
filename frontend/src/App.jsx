import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LandingPage from './pages/Landing'

import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Logout from './pages/auth/Logout'

import ProtectedRoutes from './components/ProtectedRoutes'

import Profile from './pages/Profile'

import Company from './pages/dashboard/Company'
import Teams from './pages/dashboard/Teams'
import EmpTable from './pages/dashboard/EmpTable'
import Calendar from './pages/dashboard/Calendar'
import Kanban from './pages/dashboard/Kanban'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />

          {/* Private Routes */}
          <Route
            path="/company"
            element={
              <ProtectedRoutes>
                <Company />
              </ProtectedRoutes>}
          />
          <Route
            path="/teams"
            element={
              <ProtectedRoutes>
                <Teams />
              </ProtectedRoutes>}
          />
          <Route
            path="/employees"
            element={
              <ProtectedRoutes>
                <EmpTable />
              </ProtectedRoutes>}
          />
          <Route
            path="/calendar"
            element={
              <ProtectedRoutes>
                <Calendar />
              </ProtectedRoutes>}
          />
          <Route
            path="/kanban"
            element={
              <ProtectedRoutes>
                <Kanban />
              </ProtectedRoutes>}
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App