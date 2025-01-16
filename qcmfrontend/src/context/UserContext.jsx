import React, { createContext, useContext, useState } from 'react'
import LoginApi from '../services/LoginApi'


export const UserStateContext = createContext({
    user : {},
    authenticated: false,
    isLogout:false,
    setIsLogout:()=>{},
    setUser: ()=>{},
    setToken: () => {},
    logout : ()=>{},
    login: (email, password)=>{},
    setAuthenticated: () => {},

})

export default function UserContext({children}) {
    const [user, setUser] = useState({nom: "fayssal"})
    const [isLogout, setIsLogout] = useState(false)
    const [authenticated, _setAuthenticated] = useState( "true" === window.localStorage.getItem("AUTHENICATED"))
    const login = async(email, password)=>{
        // await LoginApi.getCsrfToken()
        return await LoginApi.login(email, password)
    }
    const setToken = (token) => {
        window.localStorage.setItem("token", token);
    };
    const logout = ()=>{
        setAuthenticated(false)
        setIsLogout(false)
        setUser({})
    }
    const setAuthenticated = (isAuthenticated) => {
        _setAuthenticated(isAuthenticated);
        window.localStorage.setItem("AUTHENICATED", isAuthenticated);
    };
  return <>
    <UserStateContext.Provider
        value={{ 
            user,
            authenticated,
            setAuthenticated,
            setToken,
            setUser,
            login,
            logout,
            isLogout,
            setIsLogout
         }}
    >
        {children}
    </UserStateContext.Provider>
  </>
}

export const useUserContext = ()=> useContext(UserStateContext);