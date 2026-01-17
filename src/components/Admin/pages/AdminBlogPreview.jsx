import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../../api/axios";

const AdminBlogPreview = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/admin/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Loading preview...</p>;
  }

  if (!blog) {
    return <p className="text-center mt-10">Blog not found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{blog.title}</h1>

        <Link to="/admin/blogs" className="text-blue-600 hover:underline">
          ← Back
        </Link>
      </div>

      <div className="text-sm text-gray-500 mb-4">
        <span>
          Status:{" "}
          <span
            className={`font-semibold ${
              blog.published ? "text-green-600" : "text-yellow-600"
            }`}
          >
            {blog.published ? "Published" : "Draft"}
          </span>
        </span>
        <span className="ml-4">
          Created: {new Date(blog.createdAt).toLocaleDateString()}
        </span>
      </div>

      <hr className="my-4" />

      {/* Content */}
      <div className="prose max-w-none">{blog.content}</div>
    </div>
  );
};

export default AdminBlogPreview;
