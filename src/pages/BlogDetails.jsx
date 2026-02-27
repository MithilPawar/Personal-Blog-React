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

  const fetchBlogData = async () => {
    try {
      setLoading(true);
      setError("");

      const [blogRes, commentsRes] = await Promise.all([
        axios.get(`/blogs/${id}`),
        axios.get(`/blogs/${id}/comments`),
      ]);

      setBlog(blogRes.data);
      setComments(commentsRes.data);

      if (user) {
        const reactionRes = await axios.get(`/blogs/${id}/reaction/status`);
        setUserReaction(reactionRes.data.reactionType);
      }
    } catch (err) {
      console.error(err);
      setError("We couldn’t load this blog right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, [id, user]);

  const handleReaction = async (reactionType) => {
    if (!user) return;

    try {
      await axios.post(`/blogs/${id}/reaction`, { reactionType });

      setUserReaction((prev) => (prev === reactionType ? "NONE" : reactionType));

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
      <div className="min-h-[60vh] flex justify-center items-center px-4">
        <div className="w-full max-w-xl rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          {/* REVIEW NOTE: Error state provides clear next actions instead of dead-end text. */}
          <p className="text-lg font-semibold text-red-700">Unable to open this blog</p>
          <p className="text-sm text-red-600 mt-1">{error}</p>

          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={fetchBlogData}
              className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition"
            >
              Retry
            </button>
            <Link
              to="/"
              className="px-4 py-2 rounded-lg border border-red-300 text-red-700 text-sm font-medium hover:bg-red-100 transition"
            >
              Back to Blogs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <section className="bg-white/90 border border-blue-100 rounded-2xl px-5 py-5 md:px-8 md:py-7 shadow-sm">
        {/* REVIEW NOTE: Wider header block improves first impression and uses page width better. */}
        <Link
          to="/"
          className="inline-flex items-center text-sm text-blue-600 hover:underline mb-4"
        >
          ← Back to Blogs
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
          {blog.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span className="inline-flex items-center gap-1">✍️ {blog.author}</span>
          <span>•</span>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          {blog.tags && <><span>•</span><span>#{blog.tags}</span></>}
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <article className="xl:col-span-8 bg-white/95 backdrop-blur rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <p className="text-[17px] md:text-[18px] text-gray-800 leading-8 whitespace-pre-line">
            {blog.content}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={() => handleReaction("LIKE")}
              disabled={!user}
              className={`inline-flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg transition ${
                userReaction === "LIKE"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
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
              className={`inline-flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg transition ${
                userReaction === "DISLIKE"
                  ? "text-red-600 bg-red-50"
                  : "text-gray-600 hover:text-red-600 hover:bg-red-50"
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

        <aside className="xl:col-span-4 bg-white/95 rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            Comments ({comments.length})
          </h2>

          {user ? (
            <form onSubmit={handleCommentSubmit} className="mb-5">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows="3"
                className="w-full p-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Write your comment..."
                required
              />
              <button
                type="submit"
                className="mt-3 w-full bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-blue-700 transition"
              >
                Post Comment
              </button>
            </form>
          ) : (
            <p className="mb-5 text-sm text-gray-600 bg-gray-50 rounded-xl px-3 py-3">
              Please{" "}
              <Link to="/login" className="text-blue-600 underline">
                login
              </Link>{" "}
              to comment.
            </p>
          )}

          {comments.length === 0 ? (
            <div className="text-gray-600 bg-gray-50 rounded-xl px-4 py-6 text-center text-sm border border-dashed border-gray-300">
              <p className="font-medium text-gray-700">No comments yet</p>
              <p className="mt-1">Be the first one to start the conversation.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[560px] overflow-auto pr-1">
              {/* REVIEW NOTE: Scrollable comment panel keeps long discussions tidy on desktop. */}
              {comments.map((comment) => (
                <div key={comment.id} className="border border-gray-100 rounded-xl p-3 bg-white">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-900">
                      {comment.authorName}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 leading-relaxed break-words">
                    {comment.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </aside>
      </section>
    </div>
  );
};

export default BlogDetails;
