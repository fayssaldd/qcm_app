import axios from "axios";

export const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL + '/api',
    withCredentials:true,
})


axiosClient.interceptors.request.use(function(config){
    const token = localStorage.getItem('token')
    if(token){
        config.headers.Authorization = 'Bearer ' + token
    }
    return config
})

axiosClient.interceptors.response.use((response)=>{
    return response
},(error)=>{
    const  {response} = error
    if(response.status === 401){
        localStorage.removeItem('token')
        localStorage.setItem('AUTHENICATED',false)
    }else if(response.status === 404){
        // show not found
    }

    throw error
})



