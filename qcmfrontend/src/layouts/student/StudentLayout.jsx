import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBarStudent from './NavBarStudent'

export default function StudentLayout() {
  return (
    <>
        <header>
          <NavBarStudent/>
        </header>
        <div className="p-4 relative top-11">
          <div className="p-10  rounded-l  rounded-lg ">
            <Outlet />
          </div>
        </div>
    </>
  )
}
