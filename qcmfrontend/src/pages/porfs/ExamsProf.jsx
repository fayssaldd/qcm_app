import React, { useEffect, useState } from 'react'
import ExamsList from '../../components/data-table/exams/ExamsList';


export default function ExamsProf() {
  
  return (
    <>
      <div className='flex flex-col w-full items-center justify-center  '>  
        <ExamsList/>
      </div>
    </>
  )
}
