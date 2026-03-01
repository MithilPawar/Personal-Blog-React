import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../../api/axios";
import StatusAlert from "../../ui/StatusAlert";

const AdminBlogComments = () => {
  const { id } = useParams();

  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await API.get(
        `/admin/blogs/comment/${id}?page=${page}&size=10`
      );
      setComments(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Failed to load comments", err);
      setError("Failed to load comments. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [id, page]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // 🔁 Hide / Unhide toggle
  const toggleHide = async (commentId) => {
    try {
      await API.patch(`/admin/blogs/comment/${commentId}/toggle-hide`);

      // Optimistic UI update
      setComments((prev) =>
        prev.map((c) =>
          c.id === commentId ? { ...c, hidden: !c.hidden } : c
        )
      );
    } catch (err) {
      console.error("Failed to toggle hide", err);
      setError("Could not update comment visibility. Please retry.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Blog Comments
        </h1>

        <Link
          to={`/admin/blogs/preview/${id}`}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back to Preview
        </Link>
      </div>

      {error && (
        <StatusAlert variant="error" className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* REVIEW NOTE: Retry keeps moderation workflow resilient during request failures. */}
          <p className="text-sm text-red-700">{error}</p>
          <button
            type="button"
            onClick={fetchComments}
            className="px-3 py-1.5 text-sm font-medium rounded-lg border border-red-300 text-red-700 hover:bg-red-100 transition"
          >
            Retry
          </button>
        </StatusAlert>
      )}

      {/* Comments List */}
      <div className="bg-white rounded-xl shadow divide-y">
        {loading ? (
          <div className="p-6">
            <StatusAlert className="text-center">Loading comments...</StatusAlert>
          </div>
        ) : comments.length === 0 ? (
          <div className="p-6">
            <StatusAlert className="border-gray-200 bg-gray-50 text-center text-gray-600">
              No comments available on this page.
            </StatusAlert>
          </div>
        ) : (
          comments.map((c) => (
            <div
              key={c.id}
              className={`p-4 flex justify-between items-start ${
                c.hidden ? "bg-gray-50 opacity-75" : ""
              }`}
            >
              <div>
                <p className="font-medium text-gray-800">
                  {c.authorName}
                  {c.hidden && (
                    <span className="ml-2 text-xs text-red-600 font-semibold">
                      (Hidden)
                    </span>
                  )}
                </p>

                <p className="text-gray-700 mt-1">
                  {c.text}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {new Date(c.createdAt).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => toggleHide(c.id)}
                className={`text-sm px-3 py-1 rounded border transition ${
                  c.hidden
                    ? "border-green-500 text-green-600 hover:bg-green-50"
                    : "border-red-500 text-red-600 hover:bg-red-50"
                }`}
              >
                {c.hidden ? "Unhide" : "Hide"}
              </button>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-3">
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-sm text-gray-600 self-center">
            Page {page + 1} of {totalPages}
          </span>

          {loading && <span className="text-sm text-gray-500 self-center">Loading...</span>}

          <button
            disabled={page + 1 >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminBlogComments;
