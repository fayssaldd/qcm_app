import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBarProfs from './NavBarProfs'
import { useUserContext } from '../../context/UserContext';
import LoginApi from '../../services/LoginApi';
import { Loader, Loader2 } from 'lucide-react';

export default function ProfLayouts() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true);
  const {authenticated,setAuthenticated,isLogout,setUser} = useUserContext();
  
  useEffect(()=>{
    setIsLoading(true)
    LoginApi.getUser().then(({data})=>{
      
      setUser(data)
      setIsLoading(false)
      setAuthenticated(true)
    }).catch(()=>{ 
      setUser({})
      setAuthenticated(false)
      navigate('/login')
    })
  },[])
  useEffect(()=>{
    if(!authenticated){
      setIsLoading(true)  
      navigate('/login')
    }
  },[authenticated])
  // if (isLoading) {
  //   return (
  //     <div
  //       style={{ width: "100%", height: "95vh" }}
  //       className="flex justify-center items-center"
  //     >
  //       <Loader className={"mx-2 my-2 animate-spin"} />
  //     </div>
  //     // <></>
  //   );
  // }
  if (isLogout) {
    return (
      <div className="absolute w-full h-full z-50 flex flex-col items-center justify-center backdrop-blur-sm ">
        <Loader2 size={40} className={"mx-2 my-2 animate-spin"} />
        <br /> <span>Deconnexion...</span>
      </div>
    );
  }
  return (
    <>
      <header>
          <NavBarProfs/>
      </header>
      <div className="p-4 relative top-11">
        <div className="p-10  rounded-l  rounded-lg ">
          <Outlet />
        </div>
      </div> 
    </>
  )
}
