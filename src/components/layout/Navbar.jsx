import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          PersonalBlog
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <Link to="/create" className="hover:text-blue-500">Create</Link>
          <Link to="/about" className="hover:text-blue-500">About</Link>
          <Link to="/login" className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
