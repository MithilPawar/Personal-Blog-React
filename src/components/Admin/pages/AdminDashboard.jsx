import { lazy, Suspense, useEffect, useState } from "react";
import API from "../../../api/axios";
import SurfaceCard from "../../ui/SurfaceCard";
import StatusAlert from "../../ui/StatusAlert";

const BlogsOverviewChart = lazy(() => import("../components/BlogsOverviewChart.jsx"));

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
      <SurfaceCard className="text-gray-600" padding="sm">
        Loading dashboard...
      </SurfaceCard>
    );
  }

  if (error) {
    return (
      <StatusAlert variant="error" className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
        {/* REVIEW NOTE: Retry button keeps dashboard recoverable after transient API errors. */}
        <p className="text-red-700 text-sm">{error}</p>
        <button
          type="button"
          onClick={fetchDashboard}
          className="px-3 py-1.5 rounded-lg border border-red-300 text-red-700 text-sm font-medium hover:bg-red-100 transition"
        >
          Retry
        </button>
      </StatusAlert>
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

        <Suspense
          fallback={
            <StatusAlert className="text-gray-600">Loading chart...</StatusAlert>
          }
        >
          <BlogsOverviewChart data={chartData} />
        </Suspense>
      </div>

      {/* Recent Blogs */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Recently Created Blogs</h3>

        {recentBlogs.length === 0 ? (
          <StatusAlert className="border-gray-200 bg-gray-50 text-gray-600">No blogs yet</StatusAlert>
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
          <StatusAlert className="border-gray-200 bg-gray-50 text-gray-600">
            No blog data available yet.
          </StatusAlert>
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
