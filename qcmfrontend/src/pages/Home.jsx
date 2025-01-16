import React from 'react'
import { Link } from 'react-router-dom'
import { STUDENT_EXAM_ROUTE } from '../router'

export default function Home() {
  return (
      <div className='w-full h-[80vh] flex flex-col justify-center items-center'>
        <div className="bg-primary text-primary-foreground p-4 rounded-md">
          <p className="text-2xl font-bold text-center">Bienvenue dans l'application éducative</p>
        </div>
        
              <Link to={STUDENT_EXAM_ROUTE} 
                    // className={"bg-primary !text-white mb-4 block lg:inline-block lg:mt-0 text-primary hover:bg-primary p-2 rounded hover:text-white mr-4"}
              >
                <button className="bg-blue-400  text-white m-4 hover:bg-blue-500 transition duration-300 p-2 rounded">
                    Commencer
                </button>

              </Link>
      </div>
  )
}
