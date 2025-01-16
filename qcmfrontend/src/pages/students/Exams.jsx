import React, { useEffect, useState } from 'react'
import ExamsApi from '../../services/ExamsApi';
import { LoaderCircle, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function Exams() {
  const [exams, setExams] = useState()
  const [isloading, setIsLoading] = useState(true);
  const fetchData = async ()=>{
    try{
      const res = await ExamsApi.getExams();
      setExams(res.data)
    }catch(err){
      console.log("Error : ", err);
    }finally{
      setIsLoading(false);
    }
  }
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} H ${mins} min`;
  };
  useEffect(()=>{
    fetchData()

    
  },[])
  return (
    <>
    <div> <h1 className="text-2xl font-bold mb-6">List des examens</h1> </div>
    {
      isloading ? <p className='flex justify-center items-center w-full h-[80vh]'>
        <LoaderCircle className={"animate-spin"}/>
        </p> :
        <>
        <div className='flex max-sm:flex-col w-full flex-wrap items-center justify-center '>
                      
        {
          exams?.map(exam=>
              // <div className="relative p-4 lg:w-[50rem] w-full shadow border rounded m-2" key={exam.id}>
              //   <Link
              //     to={`${exam.id}`}
              //     className="absolute inset-0"
              //   >
              //     <span className="sr-only">Navigate to {exam.title}</span>
              //   </Link>
              //   <div className="z-10">
              //     {exam.title}
              //   </div>
              // </div>
            <Link
                  to={`${exam.id}`}
                  // className="absolute inset-0"
            >

                <div className="bg-card m-4 text-card-foreground border border-border shadow-sm rounded-lg p-4 hover:shadow-md transition">
                <h2 className="text-lg font-bold mb-2">{exam.title}</h2>
                <p className="text-sm text-muted-foreground mb-1">
                  Description: {exam.description}
                </p>
                <p className="text-sm text-muted-foreground mb-1">
                  Durée : {formatDuration(exam.duration)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Prof de l'examen : {exam.prof}
                </p>
                </div>
            </Link>
            
          )
        }
        </div>
        </>
      
      
    }
    </>
  )
}
