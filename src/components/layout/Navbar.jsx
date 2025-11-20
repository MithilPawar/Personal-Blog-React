import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../assets/download.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Blogs", path: "/blogs" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="w-full max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* Logo + Text */}
        <Link to="/" className="flex items-center h-full space-x-2 min-w-[150px]">
          <img
            src={logo}
            alt="Lambda Life Logo"
            className="h-12 w-12 object-contain"
          />

          <div className="flex flex-col leading-tight">
            <span className="text-xl font-bold text-gray-800">Lamda</span>
            <span className="text-sm font-medium text-blue-600 -mt-1">
              Life
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {/* Login CTA */}
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-1.5 rounded-full font-medium hover:bg-blue-700 transition"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white px-6 pb-4 shadow-sm">
          <div className="flex flex-col space-y-4 mt-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium transition ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="bg-blue-600 text-white text-center px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
