import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSun } from 'react-icons/fi';
import { FaMoon } from 'react-icons/fa';
import { setMode, keepMode } from '../utils/theme';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState('dark')
  let theme = localStorage.getItem('theme');

  const handleClick = () => {
    if (localStorage.getItem('theme') === 'theme-dark') {
      setMode('theme-light')
      setDarkMode('light');
    } else {
      setMode('theme-dark');
      setDarkMode('dark');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('theme') === 'theme-dark') {
      setDarkMode('dark');
    } else {
      setDarkMode('light');
    }
  }, [theme])

  return (
    <nav
      className="sm:absolute relative sm:border-none border-b-[1px] border-b-[cyan] flex top-0 w-full sm:flex-row flex-col sm:justify-start justify-center items-center"
    >
      <span className="logo p-4 text-[18px] sm:inline-block hidden">
        <Link to="/" className="text-[#15DBFB] hover:text-white">Songify</Link>
      </span>
      <ul className="flex sm:flex-row flex-col">
        <li className="sm:py-2 py-4 px-4 text-center sm:border-none border-b-[1px] border-b-[cyan]"><Link to="/">Home</Link></li>
        <li className="sm:py-2 py-4 px-4 text-center"><Link to="/favorites">Favorites</Link></li>
      </ul>
      <p className="p-4">
        <span className="cursor-pointer">
          {darkMode ? (
            <FiSun
              size={24}
              onClick={handleClick}
            />
          ) : (
            <FaMoon
              size={24}
              onClick={handleClick}
            />
          )}
        </span>
      </p>
    </nav>
  );
};

export default Navbar;