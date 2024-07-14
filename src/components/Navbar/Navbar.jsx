// NavBar.jsx
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="border-none shadow-md">
      <div className="border-none relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-none flex justify-between h-16">
          <div className="border-none shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-500">
              JobBee
            </Link>
          </div>
          <div className="border-none hidden md:flex md:space-x-8">
            <a href="https://github.com/HarshilMistry23" className="black_btn" role='button'>
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;