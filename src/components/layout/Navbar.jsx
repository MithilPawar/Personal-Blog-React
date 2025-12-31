import { Link, NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { FiMenu, FiX, FiUser } from "react-icons/fi";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/download.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = user ? [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ] : [];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="w-full max-w-6xl px-6 py-3 flex justify-between items-center">

        {/* Logo + Text */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Lambda Life Logo"
            className="h-8 w-8 object-contain"
          />

          <div className="flex flex-col leading-tight">
            <span className="text-xl font-bold text-gray-800">Lambda</span>
            <span className="text-xs font-medium text-blue-600 -mt-1">
              Life
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 ml-auto">
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

          {/* Profile Section */}
          {user ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition"
              >
                <FiUser className="text-lg" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <button
                    onClick={() => { logout(); setProfileOpen(false); }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Login
            </Link>
          )}
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

            {/* Profile Section Mobile */}
            {user ? (
              <div className="flex flex-col space-y-2">
                <div className="text-sm font-medium text-gray-700">Profile</div>
                <button
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition text-left"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="bg-blue-600 text-white text-center px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
