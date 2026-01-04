// src/pages/admin/CreateBlog.jsx
import { useState } from "react";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Simulated blog creation: " + title);
    setTitle("");
    setContent("");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="w-full px-3 py-2 border rounded-lg"
          rows="6"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
