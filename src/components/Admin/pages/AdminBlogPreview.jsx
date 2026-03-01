import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../../api/axios";

const AdminBlogPreview = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [recentComments, setRecentComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogRes, commentsRes, countRes] = await Promise.all([
          API.get(`/admin/blogs/${id}`),
          API.get(`/admin/blogs/${id}/comments/recent`),
          API.get(`/admin/blogs/${id}/comments/count`),
        ]);

        setBlog(blogRes.data);
        setRecentComments(commentsRes.data);
        setCommentCount(countRes.data);
      } catch (err) {
        console.error("Failed to load admin blog preview", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Loading preview...</p>;
  }

  if (!blog) {
    return <p className="text-center mt-10">Blog not found</p>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-start">
          <h1 className="text-3xl font-bold text-gray-800">{blog.title}</h1>

          <Link
            to="/admin/blogs"
            className="text-sm text-blue-600 hover:underline"
          >
            ← Back
          </Link>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-3">
          <span>
            Status:
            <span
              className={`ml-1 font-semibold ${
                blog.published ? "text-green-600" : "text-yellow-600"
              }`}
            >
              {blog.published ? "Published" : "Draft"}
            </span>
          </span>

          <span>Created: {new Date(blog.createdAt).toLocaleDateString()}</span>

          {blog.updatedAt && (
            <span>
              Updated: {new Date(blog.updatedAt).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      {/* Blog Content */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-semibold text-lg mb-4">Blog Content</h2>
        <div className="prose max-w-none">{blog.content}</div>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InsightCard icon="❤️" label="Likes" value={blog.likes ?? 0} />
        <InsightCard icon="👎" label="Dislikes" value={blog.dislikes ?? 0} />
        <InsightCard icon="💬" label="Comments" value={commentCount} />
      </div>

      {/* Recent Comments */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-semibold text-lg mb-4">Recent Comments</h2>

        {recentComments.length === 0 ? (
          <p className="text-sm text-gray-500">No comments yet</p>
        ) : (
          <ul className="space-y-4">
            {recentComments.map((comment) => (
              <li key={comment.id} className="border p-4 rounded-lg">
                <p className="text-gray-800">{comment.text}</p>

                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>By: {comment.authorName}</span>
                  <span>{new Date(comment.createdAt).toLocaleString()}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
        <Link
        to={`/admin/blogs/${id}/comments`}
        className="text-blue-600 text-sm hover:underline"
      >
        View all comments →
      </Link>
      </div>
    </div>
  );
};

const InsightCard = ({ icon, label, value }) => (
  <div className="bg-white p-6 rounded-xl shadow text-center">
    <div className="text-3xl mb-1">{icon}</div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-3xl font-bold text-gray-800">{value}</p>
  </div>
);

export default AdminBlogPreview;
