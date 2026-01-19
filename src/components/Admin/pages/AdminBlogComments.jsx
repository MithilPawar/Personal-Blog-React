import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../../api/axios";

const AdminBlogComments = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchComments = async () => {
    const res = await API.get(
      `/admin/blogs/comment/${id}?page=${page}&size=10`
    );
    setComments(res.data.content);
    setTotalPages(res.data.totalPages);
  };

  useEffect(() => {
    fetchComments();
  }, [page]);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">All Comments</h1>
        <Link to={`/admin/blogs/preview/${id}`} className="text-blue-600">
          ← Back to Preview
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow divide-y">
        {comments.length === 0 ? (
          <p className="p-6 text-gray-500">No comments</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="p-4 flex justify-between">
              <div>
                <p className="font-medium">{c.authorName}</p>
                <p className="text-gray-700">{c.text}</p>
                <p className="text-xs text-gray-500">
                  {new Date(c.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-3">
        <button
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminBlogComments;
