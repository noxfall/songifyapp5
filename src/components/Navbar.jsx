import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav
      className="absolute flex top-0 w-full sm:flex-row flex-col sm:justify-start justify-center items-center bg-black"
    >
      <span className="logo p-4">
        <Link to="/">Songify</Link>
      </span>
      <ul className="flex sm:flex-row flex-col">
        <li><Link to="/" className="px-2">Home</Link></li>
        <li><Link to="/favorites" className="px-2">Favorites</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;