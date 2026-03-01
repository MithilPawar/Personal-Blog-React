import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800/60">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand / About */}
        <div>
          <h2 className="text-xl font-semibold text-white">Personal Blog</h2>
          <p className="mt-3 text-sm leading-6">
            A personal space for stories, tutorials, and practical notes on
            Java, Spring Boot, React, and full-stack development.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition">Home</Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white transition">Blogs</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition">About</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Connect with Me</h3>
          <div className="flex gap-5 mt-2 text-xl">
            <a href="#" className="hover:text-white transition">
              <FaGithub />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaLinkedin />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaInstagram />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Minimal Bar */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        {/* REVIEW NOTE: Footer brand text aligned with navbar brand for consistent identity. */}
        © {new Date().getFullYear()} Personal Blog • All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
