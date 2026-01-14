import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../api/axios";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  useEffect(() => {
    API.get(`/admin/blogs`).then(res => {
      const blog = res.data.find(b => b.id === Number(id));
      setForm(blog);
    });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.put(`/admin/blogs/${id}`, form);
    navigate("/admin/blogs");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl bg-white p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Edit Blog</h2>

      <input name="title" value={form.title || ""} onChange={handleChange} className="w-full mb-3 p-2 border" />
      <input name="author" value={form.author || ""} onChange={handleChange} className="w-full mb-3 p-2 border" />
      <input name="tags" value={form.tags || ""} onChange={handleChange} className="w-full mb-3 p-2 border" />

      <textarea
        name="content"
        rows="6"
        value={form.content || ""}
        onChange={handleChange}
        className="w-full mb-3 p-2 border"
      />

      <button className="bg-green-600 text-white px-4 py-2 rounded">
        Update Blog
      </button>
    </form>
  );
};

export default EditBlog;
