import { axiosClient } from "../api/axios";

const ExamsApi = {
    getExams: async ()=>{
        return await axiosClient.get('/exams');
    },
    getExam: async (id)=>{
        return await axiosClient.get(`/exams/${id}`);
    },
    getExamsProfs: async ()=>{
        return await axiosClient.get('/professor-exams');
    },
    getExamsForProf: async (id)=>{
        return await axiosClient.get(`/professor-exams/${id}`);
    },  
    ajouterExam: async (payload)=>{
        return await axiosClient.post('/exams',{...payload})
    },
    deleteExam: async (id)=>{
        return await axiosClient.delete(`/exams/${id}`);
    },  
    supprimerExamsSelected: async (id) => {
        return await axiosClient.delete("/deleteExamsSelected", {
          data: { selectedIds: id },
        });
    },
    sendAnsewers: async (examId,selectedAnswers)=>{
        return await axiosClient.post(`/exams/${examId}/submit`,{
            answers: selectedAnswers,
          });
    },
    setIsShow: async (id, payload)=>{
        return await axiosClient.post(`/exams/${id}/setIsShow`,{...payload});
    },

    getExamPdf: async (id)=>{
        return await axiosClient.get(`/qcm/${id}`,
            {
                responseType: 'blob', // Important pour les fichiers binaires
            }
        );
    },


}

export default ExamsApi;