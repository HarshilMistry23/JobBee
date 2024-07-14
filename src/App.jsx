import './App.css';
import JobSearch from './components/Home/Home';
import JobList from '../src/components/JobsList/JobsList';
import JobDetail from '../src/components/JobDetails/JobDetails';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar/Navbar';



function App() {
  return (
    <>
    <main>
      <div className="main">
        <div className="gradient" />
      </div>
      <NavBar/>
      <div className="app">
     <div className="container mx-auto mt-4 px-4">
        <Routes>
          <Route path="/" element={<JobSearch />} />
          <Route path="/list" element={<><JobSearch /><JobList /></>} />
          <Route path="/details" element={<JobDetail />} />
        </Routes>
      </div>
      </div>
      </main>
    </>
  );
}

export default App;
