import axios from "axios";

import { useNavigate } from "react-router-dom";
import useAuth from "../useAuth";
import Swal from 'sweetalert2'
const axiosSecure = axios.create({
    baseURL:"https://cash-flow-backend-lilac.vercel.app"
})

const useAxiosSexure = () => {
    const navigate = useNavigate() 
    const {logout} = useAuth()
    axiosSecure.interceptors.request.use(function (config){
        const token = localStorage.getItem('access-token')
        console.log('request stopped by interceptors',token);
        config.headers.authorization = `bearersers ${token}`
        return config;
   }, function(error){
       return Promise.reject(error)
   })

   axiosSecure.interceptors.response.use(function (response) {
       
       return response;
     }, async (error)=> {
       const status = error.response.status 
       console.log(error.response.data.message)
       if(status === 401 || status === 403){
             await logout()
             .then(res=>{
                console.log(res)
             })
             .catch(error =>{
                console.log(error)
             })
             Swal.fire({
                title: `${error.response.data.message}`,
                text: "You are logout!",
                icon: "error",
                showConfirmButton: false,
                timer: 4000
              });
             navigate('/login')
       }
       return Promise.reject(error);
     });

    return (
        axiosSecure
    );
};

export default useAxiosSexure ;