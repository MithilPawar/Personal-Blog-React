import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import Loader from "../components/Loader";

const BlogDetails = () => {
  const { id } = useParams(); // blog ID from URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        setError("Blog not found!");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <Loader />;

  if (error)
    return (
      <div className="min-h-[60vh] flex justify-center items-center text-red-500 text-xl">
        {error}
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5">
      
      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

      {/* Author + Date */}
      <div className="flex justify-between items-center text-sm text-gray-600 mb-6">
        <span>✍️ {blog.author}</span>
        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>

      {/* Image (optional later) */}
      {/* <img src="image-url" className="rounded-xl mb-6" /> */}

      {/* Content */}
      <p className="text-lg leading-relaxed text-gray-800 whitespace-pre-line">
        {blog.content}
      </p>

      {/* Likes */}
      <div className="mt-6 text-xl flex items-center gap-2 text-red-500 font-semibold">
        ❤️ <span>{blog.likes} Likes</span>
      </div>
    </div>
  );
};

export default BlogDetails;
