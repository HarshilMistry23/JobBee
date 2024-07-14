import { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const JobList = () => {
  const { jobs, setSelectedJob, minSalary } = useContext(StoreContext);
  const navigate = useNavigate();

  const filteredJobs = jobs.filter((job) => {
    if (!job.min_salary || !job.max_salary) {
      return true; // Display if min_salary or max_salary is not specified
    }
    return job.min_salary >= minSalary || job.max_salary >= minSalary; // Filter based on minSalary prop
  });

  return (
    <div className="mt-4">
      {filteredJobs.length === 0 && (
        <div className="bg-white shadow-md rounded-lg p-4">
          <p className="text-gray-600">No jobs found matching your criteria.</p>
        </div>
      )}
      {filteredJobs.map((job) => (
        <div
          key={job.job_id}
          className="list_box shadow-md rounded-lg overflow-hidden mb-4"
        >
          <div className="p-4 flex items-center">
            <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
              <img
                src={job.employer_logo}
                alt="Employer Logo"
                className="h-8 w-8 object-contain"
              />
            </div>
            <div>
              <h2 className="text-lg font-bold">{job.employer_name}</h2>
              <h3 className="text-base text-gray-600">{job.job_title}</h3>
            </div>
          </div>
          <div className="p-4 border-t border-gray-200">
            <p className="text-sm text-gray-700">
              {job.job_description.substring(0, 150)}...
            </p>
            <div className="flex items-center mt-2">
              <span className="mr-2">
                Remote: {job.job_is_remote ? "Yes" : "No"}
              </span>
              {job.job_city && job.job_state && job.job_country && (
                <span className="text-gray-600">
                  | Location: {job.job_city}, {job.job_state}, {job.job_country}
                </span>
              )}
            </div>
            <p className="mt-2">
              Salary:{" "}
              {job.min_salary && job.max_salary
                ? `$${job.min_salary} - $${job.max_salary} ${job.job_salary_currency}`
                : "Specified on Portal"}
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  setSelectedJob(job);
                  navigate("/details");
                }}
                className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded focus:outline-none focus:shadow-outline"
              >
                View
              </button>
              {localStorage.setItem('jobs', JSON.stringify(filteredJobs))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobList;
