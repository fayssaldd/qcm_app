import React, { useEffect, useState } from 'react'
import { ExamsListColumn } from './ExamsListColumn'
import { LoaderCircle } from 'lucide-react'
import ExamsApi from '../../../services/ExamsApi';
import { toast } from 'sonner';
import { useToast } from '../../../hooks/use-toast';
import { DataTable } from '../DataTable';
import SupprimerExam from './SupprimerExam';
import AjouterExam from './AjouterExam';


export default function ExamsList() {
    const [exams, setExams] = useState()
    const [isloading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false)
    const { toast:tst } = useToast()
    const fetchData = async ()=>{
        try{
          // const res = await ExamsApi.getExamsForProf();
          const res = await ExamsApi.getExamsProfs()
          setExams(res.data)
        }catch(err){
          console.log("Error : ", err);
        }finally{
          setIsLoading(false);
        }
    }
    const deleteExam = (id)=>{
        setIsDeleting(true)
        if(confirm("Are you sur")){
          const deletingLoader = toast.loading("Deletion progress...");
              ExamsApi.S(id).then(res=>{
                fetchData()
                toast("Exam selected well delete", {
                  className: "!bg-red-500 !text-white",
                  description: (
                      <span className="text-white">Deleted successfuly</span>
                  ),
                });
                toast.dismiss(deletingLoader);   
                setIsDeleting(false)
        }).catch(err=>{
          console.log(err);
          setIsDeleting(false)
        })
        }
    
      }
    const [ids, setId] = useState([]);
    const handleCallback = (idFromChild)=>{
        setId(idFromChild);
    }
      
    useEffect(()=>{
        fetchData()
    },[])
  return (
    <>
    {
      isloading ? (
        <div
          style={{ height: "70vh" }}
          className="flex flex-col justify-center items-center"
        >
          <LoaderCircle className={"animate-spin"} />  <p>s'il vous plaîs, attendez ...</p>
        </div>
      ) : (
      <>
        <div className='bg-green-500 w-full  text-white p-4 shadow border rounded mt-4 flex items-center justify-between'>
            <p>List des exams</p>
            <AjouterExam fetchData={fetchData} />
        </div>
        <div className={"flex mb-3 mt-4 w-full flex-wrap"}>

                    {/* <div className='mr-3'>{ids.length === 1 && <ModifierProduct id={parseInt(ids)} />}</div> */}
                   
          <div>{ids.length >= 1 && <SupprimerExam fetchData={fetchData} ids={ids} />}</div> 
            
        </div>
            <DataTable  columns={ExamsListColumn} data={exams} paparentCallback={handleCallback} />
            </>)
        }
    </>
  )
}
