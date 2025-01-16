import { axiosClient } from "../api/axios";

const QuestionApi = {
    ajouterQuestion: async (idExam,payload)=>{
        return await axiosClient.post(`/exams/${idExam}/questions`,payload,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
    })
    },
    ajouterAnsewer: async (idQ,payload)=>{
        return await axiosClient.post(`/questions/${idQ}/answers`,{...payload})
    },
    deleteQuestion: async (id)=>{
        return await axiosClient.delete(`/questions/${id}`)
    },
}

export default QuestionApi;