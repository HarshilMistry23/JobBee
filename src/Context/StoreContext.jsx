import { createContext,useState,useEffect } from "react";

export const StoreContext = createContext()

const StoreContextProvider = (props) => {
    
    const [jobTitle, setJobTitle] = useState('');
    const [jobLocation, setJobLocation] = useState('');
    const [minSalary, setMinSalary] = useState(0);
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState({});
    const handleJobClick = (job) => {
        setSelectedJob(job);
        };
    
    useEffect(()=>{
        if(localStorage.getItem('jobs')){
            setJobs(JSON.parse(localStorage.getItem('jobs')));
        }
        if(localStorage.getItem('selectedjob')){
            setSelectedJob(JSON.parse(localStorage.getItem('selectedjob')));
        }
        if(localStorage.getItem('jobtitle')){
            setJobTitle(JSON.parse(localStorage.getItem('jobtitle')));
        }
        if(localStorage.getItem('joblocation')){
            setJobLocation(JSON.parse(localStorage.getItem('joblocation')));
        }
    },[])
    
    const contextValue = {
        minSalary,
        setMinSalary,
        jobs,
        setJobs,
        selectedJob,
        setSelectedJob,handleJobClick,
        jobTitle,setJobTitle,
        jobLocation,setJobLocation
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider