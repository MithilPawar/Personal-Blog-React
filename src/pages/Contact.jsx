import { useState } from "react";
import axios from "../api/axios";
import PageHero from "../components/ui/PageHero";
import SurfaceCard from "../components/ui/SurfaceCard";
import StatusAlert from "../components/ui/StatusAlert";

const Contact = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      await axios.post("/contact", formData);
      setSuccess("Thanks for reaching out! I’ll get back to you soon.");
      setFormData({ username: "", email: "", message: "" });
    } catch (err) {
      console.error("Contact form error:", err);
      setError("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 md:py-10">
      {/* REVIEW NOTE: Wide two-column composition to align Contact with BlogDetails scale and spacing. */}
      <PageHero
        title="Get in Touch"
        subtitle="Have a question, feedback, or just want to say hello? 👋"
      />

      <div className="grid gap-6 lg:grid-cols-12">
        <aside className="space-y-6 lg:col-span-4">
          <SurfaceCard padding="sm">
            <h2 className="text-xl font-semibold text-gray-900">Why contact me?</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-gray-700 md:text-base">
              <li>• Collaboration ideas and project discussions</li>
              <li>• Questions about React, Spring Boot, or architecture</li>
              <li>• Feedback to improve article quality and clarity</li>
            </ul>
          </SurfaceCard>

          <SurfaceCard className="border-blue-100 bg-blue-50" padding="sm">
            <h2 className="text-xl font-semibold text-blue-900">Response time</h2>
            <p className="mt-3 text-sm leading-relaxed text-blue-800 md:text-base">
              Usually replies within 24 hours.
            </p>
          </SurfaceCard>
        </aside>

        <div className="lg:col-span-8">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6 px-6 py-7 md:px-8 md:py-8">
              {!success && !error && (
                <StatusAlert>
                  {/* REVIEW NOTE: Neutral idle state to guide users before first submit. */}
                  Share as much context as you want and I’ll respond with practical suggestions.
                </StatusAlert>
              )}

              <div className="relative">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder=" "
                  required
                  className="peer w-full rounded-lg border border-gray-300 px-3 py-3 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
                <label className="absolute left-3 top-3 text-sm text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500">
                  Name
                </label>
              </div>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=" "
                  required
                  className="peer w-full rounded-lg border border-gray-300 px-3 py-3 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
                <label className="absolute left-3 top-3 text-sm text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500">
                  Email
                </label>
              </div>

              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  placeholder=" "
                  required
                  className="peer w-full rounded-lg border border-gray-300 px-3 py-3 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
                <label className="absolute left-3 top-3 text-sm text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500">
                  Message
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-blue-500 py-2.5 font-medium text-white transition hover:bg-blue-600 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {success && (
                <StatusAlert variant="success" className="text-center">
                  {success}
                </StatusAlert>
              )}
              {error && (
                <StatusAlert variant="error" className="text-center">
                  {error}
                </StatusAlert>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
