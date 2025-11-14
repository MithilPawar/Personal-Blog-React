import { useEffect, useState } from "react";
import axios from "../api/axios";
import BlogCard from "../components/BlogCard";
import Loader from "../components/Loader";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch blogs on page load
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/blogs"); 
      setBlogs(res.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* HERO SECTION */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Mithil's Blog
        </h1>
        <p className="text-gray-600 text-lg">
          Explore insightful articles, tech tutorials, and personal stories.
        </p>
      </div>

      {/* BLOG LIST */}
      {blogs.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No blogs found. Please check back later!
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
