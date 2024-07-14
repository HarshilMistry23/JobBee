import { useState,useContext } from 'react';
import { format } from 'date-fns';
import { StoreContext } from '../../Context/StoreContext';

const convertExperienceToMonths = (experience) => {
  if (experience === null) {
    return 'Not specified';
  } else {
    return `${experience} months`;
  }
};

const JobDetail = () => {
  const { selectedJob } = useContext(StoreContext);
  const job = selectedJob;
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Function to toggle full description view
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Function to truncate description to 300 characters
  const truncateDescription = (description) => {
    const truncated = description.substring(0, 300);
    return showFullDescription ? description : truncated + (description.length > 300 ? '... ' : '');
  };

  return (
    <div className="max-w-screen-md mx-auto mt-8 list_box shadow-md rounded-lg overflow-hidden">
      <div className="p-6 flex">
        {job.employer_logo && (
          <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
            <img
              src={job.employer_logo}
              alt="Employer Logo"
              className="h-8 w-8 object-contain"
            />
          </div>
        )}
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{job.employer_name}</h1>
          <h2 className="text-lg text-gray-600">{job.job_title}</h2>
          <div className="mt-4">
            {job.job_description && (
              <p className="text-sm text-gray-700">
                {truncateDescription(job.job_description)}
                {job.job_description.length > 300 && (
                  <button
                    onClick={toggleDescription}
                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                  >
                    {showFullDescription ? ' Read less' : ' Read more'}
                  </button>
                )}
              </p>
            )}
            <div className="mt-2">
              <p className="text-sm text-gray-700">
                <span className="font-bold">Remote:</span> {job.job_is_remote ? 'Yes' : 'No'}
              </p>
              {job.job_city && job.job_state && job.job_country && (
                <p className="text-sm text-gray-700">
                  <span className="font-bold">Location:</span> {job.job_city}, {job.job_state}, {job.job_country}
                </p>
              )}
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-700">
                <span className="font-bold">Salary:</span>{' '}
                {job.min_salary && job.max_salary ? `$${job.min_salary} - $${job.max_salary} ${job.job_salary_currency}` : 'Salary not specified'}
              </p>
              {job.job_publisher && (
                <p className="text-sm text-gray-700">
                  <span className="font-bold">Posted By:</span> {job.job_publisher}
                </p>
              )}
              {job.job_posted_at_datetime_utc && (
                <p className="text-sm text-gray-700">
                  <span className="font-bold">Posted on:</span>{' '}
                  {format(new Date(job.job_posted_at_datetime_utc), 'MMMM do, yyyy')}
                </p>
              )}
              {job.job_required_education && (
                <p className="text-sm text-gray-700">
                  <span className="font-bold">Education:</span>{' '}
                  {job.job_required_education.degree ? job.job_required_education.degree : 'Not Specified'}
                </p>
              )}
              {job.job_required_experience && (
                <p className="text-sm text-gray-700">
                  <span className="font-bold">Experience Required:</span>{' '}
                  {job.job_required_experience.no_experience_required === 'true' ? (
                    <span>No</span>
                  ) : (
                    <span>Yes - {convertExperienceToMonths(job.job_required_experience.required_experience_in_months)}</span>
                  )}
                  {localStorage.setItem('selectedjob', JSON.stringify(job))}
                </p>
              )}
            </div>
            {job.job_apply_link && (
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => window.open(job.job_apply_link, '_blank')}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded focus:outline-none focus:shadow-outline self-end"
                >
                  Apply Here
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
