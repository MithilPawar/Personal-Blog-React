import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

const Layout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50/30 text-gray-900">
      <Navbar />
      {/* REVIEW NOTE: Auth pages stay full-width; normal pages use consistent centered spacing without extra footer gap. */}
      {isAuthPage ? (
        <main className="flex-grow">
          <Outlet />
        </main>
      ) : (
        <main className="flex-grow w-full">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <Outlet />
          </div>
        </main>
      )}
      <Footer />
    </div>
  );
};

export default Layout;