import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { ModeToggle } from '../components/mode-toggle'
import { useUserContext } from '../context/UserContext'


export default function GuestLayout() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const {authenticated} = useUserContext()
  useEffect(()=>{
    if(authenticated){
      setIsLoading(true)
      navigate('/profs')
    }
  },[])
  return (
    <div>
    <div className="absolute right-0">
      <ModeToggle />
    </div>
    <main>
      <Outlet />
    </main>
  </div>
  )
}
