import { useEffect, useState } from "react";
import API from "../../../api/axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0 });

  useEffect(() => {
    API.get("/admin/blogs").then((res) => {
      const blogs = res.data;
      setStats({
        total: blogs.length,
        published: blogs.filter(b => b.published).length,
        drafts: blogs.filter(b => !b.published).length
      });
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <StatCard title="Total Blogs" value={stats.total} />
        <StatCard title="Published" value={stats.published} />
        <StatCard title="Drafts" value={stats.drafts} />
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-xl shadow">
    <h3 className="text-sm text-gray-500">{title}</h3>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

export default AdminDashboard;
