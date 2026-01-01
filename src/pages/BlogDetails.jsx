import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../api/axios";
import Loader from "../components/Loader";
import { useAuth } from "../contexts/AuthContext";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userLiked, setLikedByUser] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Blog not found!");
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await axios.get(`/blogs/${id}/comments`);
        setComments(res.data);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };

    const fetchUserLikeStatus = async () => {
      if (!user) return;

      try {
        const res = await axios.get(`/blogs/${id}/like/status`);
        setLikedByUser(res.data.liked);
      } catch (err) {
        if (err.response?.status === 401) {
          setLikedByUser(false);
        } else {
          console.error("Error fetching user like status:", err);
        }
      }
    };

    fetchBlog();
    fetchComments();
    fetchUserLikeStatus();
  }, [id, user]);

  const handleLike = async () => {
    if (!user) {
      alert("Please login to like the blog.");
      return;
    }

    try {
      const res = await axios.post(`/blogs/${id}/like`);
      const { liked, totalLike } = res.data;
      console.log(res.data);
      setLikedByUser(liked);
      setBlog((prev) => ({
        ...prev,
        likes: totalLike,
      }));
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to comment.");
      return;
    }
    if (!newComment.trim()) return;
    try {
      const res = await axios.post(`/blogs/${id}/comments`, {
        text: newComment,
      });
      setComments([...comments, res.data]);
      setNewComment("");
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out this blog: ${blog.title}`;
    if (platform === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          text
        )}&url=${encodeURIComponent(url)}`
      );
    } else if (platform === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`
      );
    } else if (platform === "linkedin") {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`
      );
    }
  };

  if (loading) return <Loader />;

  if (error)
    return (
      <div className="min-h-[60vh] flex justify-center items-center text-red-500 text-xl">
        {error}
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-block mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
      >
        ← Back to Blogs
      </Link>

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

      {/* Likes and Share */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 font-semibold transition duration-200 ${
            userLiked ? "text-red-600" : "text-gray-600 hover:text-red-600"
          }`}
        >
          {userLiked ? (
            <SolidHeartIcon className="w-5 h-5" />
          ) : (
            <OutlineHeartIcon className="w-5 h-5" />
          )}
          <span>{blog.likes}</span>
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => handleShare("twitter")}
            className="text-blue-500 hover:text-blue-700 transition duration-200"
          >
            Twitter
          </button>
          <button
            onClick={() => handleShare("facebook")}
            className="text-blue-600 hover:text-blue-800 transition duration-200"
          >
            Facebook
          </button>
          <button
            onClick={() => handleShare("linkedin")}
            className="text-blue-700 hover:text-blue-900 transition duration-200"
          >
            LinkedIn
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {comments.length === 0 ? (
          <p className="text-gray-600">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-gray-100 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{comment.authorName}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p>{comment.text}</p>
              </div>
            ))}
          </div>
        )}

        {/* Add Comment Form */}
        {user ? (
          <form onSubmit={handleCommentSubmit} className="mt-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows="4"
              required
            />
            <button
              type="submit"
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Post Comment
            </button>
          </form>
        ) : (
          <p className="mt-6 text-gray-600">
            Please{" "}
            <a href="/login" className="text-blue-600 underline">
              login
            </a>{" "}
            to comment.
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
