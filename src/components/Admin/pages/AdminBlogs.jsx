import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import API from "../../../api/axios";

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const debounceRef = useRef(null);

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const params = {};

      if (statusFilter !== "ALL") {
        params.status = statusFilter;
      }

      if (searchTerm.trim() !== "") {
        params.search = searchTerm.trim();
      }

      const res = await API.get("/admin/blogs", { params });
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Debounced search
  useEffect(() => {
    debounceRef.current = setTimeout(fetchBlogs, 500);
    return () => clearTimeout(debounceRef.current);
  }, [statusFilter, searchTerm]);

  // 🔥 Enter key search (instant)
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      clearTimeout(debounceRef.current);
      fetchBlogs();
    }
  };

  const togglePublish = async (id) => {
    await API.patch(`/admin/blogs/${id}/publish`);
    fetchBlogs();
  };

  const deleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    await API.delete(`/admin/blogs/${id}`);
    fetchBlogs();
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Blogs</h2>
        <Link
          to="/admin/blogs/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Create Blog
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-4 items-center">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="border px-3 py-2 rounded-lg w-64 pr-10"
          />

          {loading && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              ⏳
            </span>
          )}
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded-lg"
        >
          <option value="ALL">All</option>
          <option value="PUBLISHED">Published</option>
          <option value="DRAFT">Draft</option>
        </select>
      </div>

      {/* Table */}
      <table className="w-full bg-white rounded-lg shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {blogs.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center p-4 text-gray-500">
                No blogs found
              </td>
            </tr>
          ) : (
            blogs.map((blog) => (
              <tr key={blog.id} className="border-t">
                <td className="p-3">{blog.title}</td>
                <td className="text-center">
                  {blog.published ? "Published" : "Draft"}
                </td>
                <td className="p-3 flex gap-3">
                  <Link
                    to={`/admin/blogs/edit/${blog.id}`}
                    className="text-blue-600"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => togglePublish(blog.id)}
                    className="text-green-600"
                  >
                    {blog.published ? "Unpublish" : "Publish"}
                  </button>

                  <button
                    onClick={() => deleteBlog(blog.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBlogs;
