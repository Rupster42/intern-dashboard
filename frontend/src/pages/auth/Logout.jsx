import React from 'react'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../constants'
import { Navigate } from 'react-router-dom'

const Logout = () => {
    localStorage.clear()
    return <Navigate to="/login" />
}

export default Logout