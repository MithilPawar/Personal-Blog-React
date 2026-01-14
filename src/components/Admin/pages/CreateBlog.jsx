import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../api/axios";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    content: "",
    tags: "",
    author: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/admin/blogs", form);
    navigate("/admin/blogs");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl bg-white p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Create Blog</h2>

      <input name="title" placeholder="Title" onChange={handleChange} className="w-full mb-3 p-2 border" />
      <input name="author" placeholder="Author" onChange={handleChange} className="w-full mb-3 p-2 border" />
      <input name="tags" placeholder="Tags" onChange={handleChange} className="w-full mb-3 p-2 border" />

      <textarea
        name="content"
        placeholder="Content"
        rows="6"
        onChange={handleChange}
        className="w-full mb-3 p-2 border"
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Save as Draft
      </button>
    </form>
  );
};

export default CreateBlog;
