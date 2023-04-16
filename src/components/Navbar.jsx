import { Link } from 'react-router-dom';

const Navbar = () => {
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
    </nav>
  );
};

export default Navbar;