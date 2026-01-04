// src/pages/admin/AdminLayout.jsx
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const AdminLayout = () => {
  const { logout } = useAuth();
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-100 p-4 flex justify-between">
        <div className="space-x-4">
          <Link to="/admin" className="font-semibold">Dashboard</Link>
          <Link to="/admin/blogs" className="font-semibold">Manage Blogs</Link>
        </div>
        <button onClick={logout} className="text-red-600">Logout</button>
      </nav>
      <main className="flex-grow p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;