import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white/80 text-gray-700 border-t border-gray-100 
                   dark:bg-slate-900/90 dark:text-gray-300 dark:border-slate-800">

  <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
    
    <div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Personal Blog
      </h2>
      <p className="mt-3 text-sm leading-6">
        A personal space for stories, tutorials, and practical notes on
        Java, Spring Boot, React, and full-stack development.
      </p>
    </div>

    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
        Quick Links
      </h3>
      <ul className="space-y-2 text-sm">
        <li>
          <Link to="/" className="hover:text-gray-900 dark:hover:text-gray-100 transition">
            Home
          </Link>
        </li>
        <li>
          <Link to="/" className="hover:text-gray-900 dark:hover:text-gray-100 transition">
            Blogs
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-gray-900 dark:hover:text-gray-100 transition">
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-gray-900 dark:hover:text-gray-100 transition">
            Contact
          </Link>
        </li>
      </ul>
    </div>

    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
        Connect with Me
      </h3>
      <div className="flex gap-5 mt-2 text-xl">
        <a href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition">
          <FaGithub />
        </a>
        <a href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition">
          <FaLinkedin />
        </a>
        <a href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition">
          <FaInstagram />
        </a>
      </div>
    </div>

  </div>

  <div className="border-t border-gray-200 py-4 text-center text-sm 
                  text-gray-500 dark:border-slate-700 dark:text-gray-400">
    © {new Date().getFullYear()} Personal Blog • All rights reserved.
  </div>

</footer>
  );
};

export default Footer;
