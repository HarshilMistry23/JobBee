import { useContext, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const JobSearch = () => {
  
  const { setJobs, jobTitle, setJobTitle, jobLocation, setJobLocation } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleJobTitleChange = (e) => {
    setJobTitle(e.target.value);
  };

  const handleJobLocationChange = (e) => {
    setJobLocation(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem('jobtitle', JSON.stringify(jobTitle));
    localStorage.setItem('joblocation', JSON.stringify(jobLocation));
    setLoading(true);
    try {
      const response = await axios.get('https://jsearch.p.rapidapi.com/search', {
        params: {
          query: `${jobTitle} in ${jobLocation}`,
          page: '1',
          num_pages: '1',
          date_posted: 'all',
        },
        headers: {
          'x-rapidapi-key': '2f1000b9e7msh118611a847a84ebp16a052jsn475f345e817c',
          'x-rapidapi-host': 'jsearch.p.rapidapi.com',
        },
      });
      setJobs(response.data.data);
      navigate('/list');
    } catch (error) {
      console.log('Error:', error);
      alert('Error fetching data. Please try again.');
    } finally {
      setLoading(false);  
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pb-0 py-3">
      <h1 className="head_text">
      <span className="fade-in-animation">Discover Your</span>
      <br />
      <div className="blue_gradient type_text">Next Career Move!</div></h1>
      <form onSubmit={handleSubmit} className="w-full max-w-screen-md bg-transparent shadow-none border-none rounded px-8 pt-6 pb-4 mb-2 flex flex-col items-center">
        <div className="mb-2 w-full flex flex-row items-center">
          <label className="block label w-1/4 text-right pr-4">Job Title:</label>
          <input required type="text" value={jobTitle} onChange={handleJobTitleChange} className="url_input flex-2" placeholder='Enter a Job Role'/>
        </div>
        <div className="mb-2 w-full flex flex-row items-center">
          <label className="block label w-1/4 text-right pr-4">Job Location:</label>
          <input required type="text" value={jobLocation} onChange={handleJobLocationChange} className="url_input flex-2" placeholder='Enter Job Location' />
        </div>
        {/* {setMinSalary(0)} */}
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded focus:outline-none focus:shadow-outline self-end">
          Search
        </button>
      </form>
      {loading && (
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status"></div>
        </div>
      )}
    </div>
  );
};

export default JobSearch;
