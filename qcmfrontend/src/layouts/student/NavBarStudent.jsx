import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { STUDENT_EXAM_ROUTE } from '../../router'
import { Brain } from 'lucide-react'

export default function NavBarStudent() {
    const [isShow, setIsShow] = useState(false)
  return (
    <>
        <nav className="flex backdrop-blur-sm fixed w-full top-0 items-center shadow dark:border-b z-40 justify-between flex-wrap p-6">
            <div className="flex items-center flex-shrink-0 text-primary mr-6">
            
                <span className="font-semibold text-xl tracking-tight flex items-center"><Brain className='mr-2 '/>  EduQuiz </span>
            </div>
            <div className="block lg:hidden">
                <button onClick={()=>setIsShow(!isShow)} className="flex items-center px-3 py-2 border rounded text-primary border-primary hover:text-primary-foreground hover:bg-primary">
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
            </div>
            <div className={`w-full ${!isShow && 'hidden'} block flex-grow lg:flex lg:items-center lg:w-auto`}>
                <div className="text-sm flex  lg:flex-grow max-md:flex-col max-md:items-start max-md:border-t max-md:mt-4 max-md:pt-4 items-center justify-end ">
                <NavLink end to={'/'} 
                    className={({ isActive }) =>
                        `${isActive && "bg-primary !text-white" } mb-4 block lg:inline-block lg:mt-0 text-primary hover:bg-primary p-2 rounded hover:text-white mr-4`
                    }
                >
                    Home
                </NavLink>
                <NavLink to={STUDENT_EXAM_ROUTE} 
                    className={({ isActive }) =>
                        `${isActive && "bg-primary !text-white" } mb-4 block lg:inline-block lg:mt-0 text-primary hover:bg-primary p-2 rounded hover:text-white mr-4`
                    }
                >
                    exams
                </NavLink>
            
                </div>
            
            </div>
        </nav>
    </>
  )
}
