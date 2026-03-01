import { Link, NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { FiMenu, FiX, FiUser } from "react-icons/fi";
import { useAuth } from "../../contexts/AuthContext";

const BrandLogo = () => {
  // REVIEW NOTE: Replaced image logo with a clean text-mark for consistent rendering across devices.
  return (
    <Link to="/" className="flex items-center gap-3">
      <div className="h-9 w-9 rounded-xl bg-blue-600 text-white grid place-items-center font-bold text-sm shadow-sm">
        PB
      </div>
      <div className="leading-tight">
        <p className="text-base font-semibold text-gray-900">Personal Blog</p>
        <p className="text-xs text-gray-500">Personal Blog</p>
      </div>
    </Link>
  );
};

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

  // REVIEW NOTE: Keep user-facing top nav simple and consistent.
  const navItems = user
    ? [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
      ]
    : [{ name: "Home", path: "/" }];

  return (
    <nav className="bg-white/95 backdrop-blur border-b border-gray-100 sticky top-0 z-50">
      <div className="relative w-full px-3 md:px-5 lg:px-6 py-3 flex items-center gap-4">

        <div className="shrink-0">
          <BrandLogo />
        </div>

        {/* REVIEW NOTE: Nav links are absolutely centered against viewport midpoint for consistent centering. */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex items-center justify-end gap-3 border-l border-gray-200 pl-5 ml-auto min-w-0">
          {user ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 rounded-md px-2 py-1.5 transition max-w-[190px] cursor-pointer"
              >
                <FiUser className="text-lg shrink-0" />
                <span className="truncate">{user.username}</span>
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
            <>
              <Link
                to="/login"
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition whitespace-nowrap"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition whitespace-nowrap"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-2xl text-gray-700 ml-auto"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-white px-6 pb-4 shadow-sm">
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
                <div className="text-sm font-medium text-gray-700">{user.username}</div>
                <button
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition text-left"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="border border-gray-300 text-gray-700 text-center px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="bg-blue-600 text-white text-center px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
