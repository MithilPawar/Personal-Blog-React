import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../api/axios";
import Loader from "../components/Loader";
import { useAuth } from "../contexts/AuthContext";

import {
  HandThumbUpIcon as LikeOutline,
  HandThumbDownIcon as DislikeOutline,
} from "@heroicons/react/24/outline";

import {
  HandThumbUpIcon as LikeSolid,
  HandThumbDownIcon as DislikeSolid,
} from "@heroicons/react/24/solid";

const BlogDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [blog, setBlog] = useState(null);
  const [userReaction, setUserReaction] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogRes, commentsRes] = await Promise.all([
          axios.get(`/blogs/${id}`),
          axios.get(`/blogs/${id}/comments`),
        ]);

        setBlog(blogRes.data);
        setComments(commentsRes.data);
        
        if (user) {
          const reactionRes = await axios.get(`/blogs/${id}/reaction/status`);
          setUserReaction(reactionRes.data.reaction);
        }
      } catch (err) {
        console.error(err);
        setError("Blog not found!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user]);

  const handleReaction = async (reactionType) => {
    if (!user) return;

    try {
      await axios.post(`/blogs/${id}/reaction`, { reactionType });

      setUserReaction((prev) => (prev === reactionType ? null : reactionType));

      const updatedBlog = await axios.get(`/blogs/${id}`);
      setBlog(updatedBlog.data);
    } catch (err) {
      console.error("Error reacting:", err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await axios.post(`/blogs/${id}/comments`, {
        text: newComment,
      });
      setComments((prev) => [...prev, res.data]);
      setNewComment("");
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center text-red-500 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back */}
      <Link
        to="/"
        className="inline-block mb-6 text-sm text-blue-600 hover:underline"
      >
        ← Back to Blogs
      </Link>

      {/* Blog Card */}
      <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{blog.title}</h1>

        {/* Meta */}
        <div className="flex justify-between text-sm text-gray-500 mb-6">
          <span>✍️ {blog.author}</span>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>

        {/* Content */}
        <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-line">
          {blog.content}
        </p>

        {/* Reactions */}
        <div className="flex gap-8 mt-8 pt-6 border-t">
          <button
            onClick={() => handleReaction("LIKE")}
            disabled={!user}
            className={`flex items-center gap-2 text-sm font-medium transition ${
              userReaction === "LIKE"
                ? "text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            {userReaction === "LIKE" ? (
              <LikeSolid className="w-6 h-6" />
            ) : (
              <LikeOutline className="w-6 h-6" />
            )}
            {blog.likes}
          </button>

          <button
            onClick={() => handleReaction("DISLIKE")}
            disabled={!user}
            className={`flex items-center gap-2 text-sm font-medium transition ${
              userReaction === "DISLIKE"
                ? "text-red-600"
                : "text-gray-600 hover:text-red-600"
            }`}
          >
            {userReaction === "DISLIKE" ? (
              <DislikeSolid className="w-6 h-6" />
            ) : (
              <DislikeOutline className="w-6 h-6" />
            )}
            {blog.dislikes}
          </button>

          {!user && (
            <span className="text-sm text-gray-500">Login to react</span>
          )}
        </div>
      </article>

      {/* Comments */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">
          Comments ({comments.length})
        </h2>

        {comments.length === 0 ? (
          <p className="text-gray-600">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          <div className="divide-y divide-gray-200">
            {comments.map((comment) => (
              <div key={comment.id} className="py-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-900">
                    {comment.authorName}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-sm text-gray-700 leading-relaxed">
                  {comment.text}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Add Comment */}
        {user ? (
          <form onSubmit={handleCommentSubmit} className="mt-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows="3"
              className="w-full p-3 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Write your comment..."
              required
            />
            <button
              type="submit"
              className="mt-2 bg-blue-600 text-white px-4 py-2 text-sm rounded-lg hover:bg-blue-700 transition"
            >
              Post Comment
            </button>
          </form>
        ) : (
          <p className="mt-6 text-sm text-gray-600">
            Please{" "}
            <Link to="/login" className="text-blue-600 underline">
              login
            </Link>{" "}
            to comment.
          </p>
        )}
      </section>
    </div>
  );
};

export default BlogDetails;
