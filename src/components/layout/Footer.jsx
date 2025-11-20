import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand / About */}
        <div>
          <h2 className="text-xl font-semibold text-white">Mithil's Personal Blog</h2>
          <p className="mt-3 text-sm leading-6">
            Sharing thoughts, tutorials, and experiences on Web Development, Java,
            React, and my learning journey. Stay connected!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-white transition">Home</a>
            </li>
            <li>
              <a href="/blogs" className="hover:text-white transition">Blogs</a>
            </li>
            <li>
              <a href="/about" className="hover:text-white transition">About Me</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white transition">Contact</a>
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
        © {new Date().getFullYear()} Mithil’s Personal Blog • All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
