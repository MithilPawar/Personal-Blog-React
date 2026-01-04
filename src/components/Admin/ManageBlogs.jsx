// src/pages/admin/ManageBlogs.jsx
import { Link } from "react-router-dom";

const ManageBlogs = () => {
  // For now we just simulate
  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Blogs</h1>
        <Link
          to="/admin/blogs/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Create Blog
        </Link>
      </div>
      <p>Here you would list blogs with edit/delete options.</p>
    </div>
  );
};

export default ManageBlogs;
