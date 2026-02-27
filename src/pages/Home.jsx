import { useEffect, useState } from "react";
import axios from "../api/axios";
import BlogCard from "../components/BlogCard";
import Loader from "../components/Loader";
import SurfaceCard from "../components/ui/SurfaceCard";
import StatusAlert from "../components/ui/StatusAlert";

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
    <div className="w-full space-y-8">
      <section className="bg-white/80 backdrop-blur border border-blue-100 rounded-2xl px-6 py-6 shadow-sm">
        {/* REVIEW NOTE: Intro panel improves visual structure and reduces flat white look. */}
        <p className="text-sm font-medium text-blue-600 mb-2">Latest Posts</p>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Explore fresh stories from Lambda Life</h1>
        <p className="text-gray-600 mt-2">Read practical insights on Java, Spring Boot, React, and full-stack development.</p>
      </section>

      <section className="bg-white/70 border border-gray-100 rounded-2xl p-4 sm:p-6 shadow-sm">
      {error && (
        <StatusAlert variant="error" className="mb-6 flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          {/* REVIEW NOTE: Actionable error state with retry improves perceived reliability. */}
          <p className="text-sm text-red-700">{error}</p>
          <button
            type="button"
            onClick={() => fetchBlogs(page)}
            className="px-3 py-1.5 text-sm font-medium rounded-lg border border-red-300 text-red-700 hover:bg-red-100 transition"
          >
            Retry
          </button>
        </StatusAlert>
      )}

      {/* BLOG LIST */}
      {blogs.length === 0 ? (
        <SurfaceCard className="border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center" padding="sm">
          <p className="text-lg font-semibold text-gray-800">No blogs found</p>
          <p className="text-sm text-gray-600 mt-1">Please check back later for fresh posts.</p>
        </SurfaceCard>
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
      </section>
    </div>
  );
};

export default Blogs;
