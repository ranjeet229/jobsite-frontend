
import { setAllAdminJobs, setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import  { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAdminJobs = () => {
  const dispatch = useDispatch();  
  useEffect(()=>{
    const fectchAllAdminJobs = async ()=>{
        try {
            const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`,{withCredentials:true});
            if(res.data.success){
                dispatch(setAllAdminJobs(res.data.jobs));
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    fectchAllAdminJobs();
  },[])
}

export default useGetAdminJobs