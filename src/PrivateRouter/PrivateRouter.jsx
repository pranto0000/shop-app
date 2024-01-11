/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider.jsx'
import { Navigate, useLocation } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner.jsx'


const PrivateRouter = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    const location = useLocation();

    if(loading){
        return (
            <LoadingSpinner/>
        )
    }
    if(user){
        return children
    }
  return (
    <Navigate to="/signup" state={{from:location}} replace></Navigate>
  )
}

export default PrivateRouter

