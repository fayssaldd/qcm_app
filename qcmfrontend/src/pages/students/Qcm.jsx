import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ExamsApi from '../../services/ExamsApi';

export default function Qcm() {
    const {id} = useParams()
      const [exam, setExam] = useState()
      const [isloading, setIsLoading] = useState(true);
    const fetchData = async ()=>{
        try{
          const res = await ExamsApi.getExam();
          setExam(res.data)
        }catch(err){
          console.log("Error : ", err);
        }finally{
          setIsLoading(false);
        }
      }
    
      useEffect(()=>{
        fetchData()
        
      },[])
  return (
    <div>Qcm</div>
  )
}
