import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-6">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      <nav className="flex flex-col gap-3">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `p-2 rounded-lg ${
              isActive ? "bg-gray-700" : "hover:bg-gray-800"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/blogs"
          className={({ isActive }) =>
            `p-2 rounded-lg ${
              isActive ? "bg-gray-700" : "hover:bg-gray-800"
            }`
          }
        >
          Manage Blogs
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
