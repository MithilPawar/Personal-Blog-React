import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* HERO SECTION */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Mithil's Blog
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Explore insightful articles, tech tutorials, and personal stories.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/blogs"
            className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition"
          >
            View Blogs
          </Link>
          <Link
            to="/create"
            className="bg-green-600 text-white px-6 py-2 rounded-full font-medium hover:bg-green-700 transition"
          >
            Create Blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;