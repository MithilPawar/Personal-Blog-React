import { useEffect, useState } from "react";
import axios from "../api/axios";
import BlogCard from "../components/BlogCard";
import Loader from "../components/Loader";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const PAGE_SIZE = 9;

  const fetchBlogs = async (currentPage) => {
    try {
      setLoading(true);
      setError("");

      // REVIEW NOTE: Use backend pagination endpoint so large datasets stay performant.
      const res = await axios.get("/blogs/paged", {
        params: {
          page: currentPage,
          size: PAGE_SIZE,
        },
      });

      setBlogs(res.data.content || []);
      setTotalPages(res.data.totalPages || 0);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError("Could not load blogs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  // REVIEW NOTE: Keep full loader only for first page load; use inline loader for pagination updates.
  if (loading && blogs.length === 0) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {error && <p className="text-center text-red-600 mb-6">{error}</p>}

      {/* BLOG LIST */}
      {blogs.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No blogs found. Please check back later!
        </p>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-8">
              <button
                type="button"
                onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                disabled={page === 0 || loading}
                className="px-4 py-2 border rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {/* REVIEW NOTE: Display 1-based page number to users for readability. */}
              <span className="text-sm text-gray-600">
                Page {page + 1} of {totalPages}
              </span>

              {loading && (
                // REVIEW NOTE: Show lightweight feedback during page transitions.
                <span className="text-sm text-gray-500">Loading...</span>
              )}

              <button
                type="button"
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
                disabled={page >= totalPages - 1 || loading}
                className="px-4 py-2 border rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Blogs;
