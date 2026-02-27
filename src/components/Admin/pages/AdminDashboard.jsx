import { useEffect, useState } from "react";
import API from "../../../api/axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await API.get("/admin/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
      setError("Unable to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-6 text-gray-600">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* REVIEW NOTE: Retry button keeps dashboard recoverable after transient API errors. */}
        <p className="text-red-700 text-sm">{error}</p>
        <button
          type="button"
          onClick={fetchDashboard}
          className="px-3 py-1.5 rounded-lg border border-red-300 text-red-700 text-sm font-medium hover:bg-red-100 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  const total = blogs.length;
  const published = blogs.filter((b) => b.published).length;
  const drafts = blogs.filter((b) => !b.published).length;

  // 📅 Blogs created this week
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - 7);

  const blogsThisWeek = blogs.filter(
    (b) => new Date(b.createdAt) >= startOfWeek
  ).length;

  // 📊 Recently created (last 3)
  const recentBlogs = [...blogs]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  // 📊 Chart data
  const chartData = [
    { name: "Published", count: published },
    { name: "Drafts", count: drafts },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Blogs" value={total} />
        <StatCard title="Published" value={published} />
        <StatCard title="Drafts" value={drafts} />
        <StatCard title="Created This Week" value={blogsThisWeek} />
      </div>

      {/* 📊 Published vs Draft Chart */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Blogs Overview</h3>

        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Blogs */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Recently Created Blogs</h3>

        {recentBlogs.length === 0 ? (
          <p className="text-sm text-gray-500">No blogs yet</p>
        ) : (
          <ul className="space-y-3">
            {recentBlogs.map((blog) => (
              <li
                key={blog.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium">{blog.title}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    blog.published
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {blog.published ? "Published" : "Draft"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 🔥 Future Ready */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Most Liked Blogs</h3>

        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .slice(0, 3)
          .map((blog) => (
            <div key={blog.id} className="flex justify-between py-2 border-b">
              <span>{blog.title}</span>
              <span className="text-sm">❤️ {blog.likes}</span>
            </div>
          ))}

        {blogs.length === 0 && (
          <p className="text-sm text-gray-500">No blog data available yet.</p>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-xl shadow">
    <h3 className="text-sm text-gray-500">{title}</h3>
    <p className="text-3xl font-bold text-gray-800">{value}</p>
  </div>
);

export default AdminDashboard;
