import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import API from "../../../api/axios";

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  const debounceRef = useRef(null);

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const params = {};
      if (statusFilter !== "ALL") params.status = statusFilter;
      if (searchTerm.trim()) params.search = searchTerm.trim();
      params.sortBy = sortBy;
      params.order = order;

      const res = await API.get("/admin/blogs", { params });
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    debounceRef.current = setTimeout(fetchBlogs, 500);
    return () => clearTimeout(debounceRef.current);
  }, [statusFilter, searchTerm, sortBy, order]);

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      clearTimeout(debounceRef.current);
      fetchBlogs();
    }
  };

  const togglePublish = async (id, isPublished) => {
    const message = isPublished
      ? "Are you sure you want to unpublish this blog?"
      : "Are you sure you want to publish this blog?";

    if (!window.confirm(message)) return;

    await API.patch(`/admin/blogs/${id}/publish`);
    fetchBlogs();
  };

  const deleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    await API.delete(`/admin/blogs/${id}`);
    fetchBlogs();
  };

  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Manage Blogs</h2>
          <p className="text-sm text-gray-500">
            Create, publish and manage blog posts
          </p>
        </div>

        <Link
          to="/admin/blogs/create"
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg shadow"
        >
          + Create Blog
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-5 flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Search blog title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          className="border rounded-lg px-3 py-2 w-64 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="ALL">All Status</option>
          <option value="PUBLISHED">Published</option>
          <option value="DRAFT">Draft</option>
        </select>

        <select
          value={`${sortBy}-${order}`}
          onChange={(e) => {
            const [sb, ord] = e.target.value.split("-");
            setSortBy(sb);
            setOrder(ord);
          }}
          className="border rounded-lg px-3 py-2"
        >
          <option value="createdAt-desc">Newest First</option>
          <option value="createdAt-asc">Oldest First</option>
          <option value="updatedAt-desc">Recently Updated</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 text-sm text-gray-600">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="text-center">Status</th>
              <th className="text-center">Created</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogs.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-500">
                  No blogs found
                </td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <tr
                  key={blog.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-medium">{blog.title}</td>

                  <td className="text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        blog.published
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {blog.published ? "Published" : "Draft"}
                    </span>
                  </td>

                  <td className="text-center text-sm text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-3 flex justify-center gap-4">
                    {/* Edit */}
                    <Link
                      to={`/admin/blogs/edit/${blog.id}`}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </Link>

                    {/* Publish / Unpublish */}
                    <button
                      onClick={() => togglePublish(blog.id, blog.published)}
                      className="p-2 rounded-full text-green-600 hover:bg-green-100 transition cursor-pointer"
                      title={blog.published ? "Unpublish" : "Publish"}
                    >
                      {blog.published ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => deleteBlog(blog.id)}
                      disabled={blog.published}
                      className={`
    p-2 rounded-full transition
    ${
      blog.published
        ? "text-gray-400 cursor-not-allowed opacity-60"
        : "text-red-600 hover:bg-red-100 cursor-pointer"
    }
  `}
                      title={
                        blog.published
                          ? "Cannot delete a published blog"
                          : "Delete"
                      }
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBlogs;
