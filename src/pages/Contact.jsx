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

      setSuccess(
        "Your message has been sent successfully. I will get back to you soon."
      );

      setFormData({
        username: "",
        email: "",
        message: "",
      });

    } catch (err) {
      console.error(err);

      setError(
        "Unable to send message at the moment. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 md:py-10">

      <PageHero
        title="Contact"
        subtitle="Open to software developer opportunities, collaboration, and technical discussions."
        titleClassName="text-xl md:text-2xl font-semibold"
      />

      <div className="grid gap-6 lg:grid-cols-12">

        {/* LEFT SECTION */}
        <aside className="space-y-6 lg:col-span-4">

          {/* WHY CONTACT */}
          <SurfaceCard className="p-6" padding="sm">
            <h2 className="text-xl font-semibold text-gray-900">
              Let's Connect
            </h2>

            <p className="mt-3 text-gray-700">
              Feel free to reach out for:
            </p>

            <ul className="mt-4 space-y-2 text-gray-700">

              <li>• Software Developer opportunities</li>

              <li>• Collaboration on full-stack projects</li>

              <li>• Technical discussions (React, Spring Boot, APIs)</li>

              <li>• Feedback or suggestions</li>

            </ul>
          </SurfaceCard>


          {/* CONTACT INFO */}
          <SurfaceCard className="p-6" padding="sm">
            <h2 className="text-xl font-semibold text-gray-900">
              Contact Information
            </h2>

            <div className="mt-4 space-y-2 text-gray-700">

              <p>
                📧 Email:{" "}
                <span className="font-medium">
                  mithilpawar7044@gmail.com
                </span>
              </p>

              <p>
                💼 Role:{" "}
                <span className="font-medium">
                  Full Stack Developer
                </span>
              </p>

              <p>
                📍 Location:{" "}
                <span className="font-medium">
                  India
                </span>
              </p>

            </div>

          </SurfaceCard>


          {/* RESPONSE TIME */}
          <SurfaceCard className="border-blue-100 bg-blue-50 p-6" padding="sm">

            <h2 className="text-xl font-semibold text-blue-900">
              Response Time
            </h2>

            <p className="mt-3 text-blue-800">
              Typically responds within 24 hours.
            </p>

          </SurfaceCard>

        </aside>


        {/* RIGHT SECTION - FORM */}
        <div className="lg:col-span-8">

          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-6"
            >

              {!success && !error && (
                <StatusAlert>
                  Send a message and I’ll respond as soon as possible.
                </StatusAlert>
              )}


              {/* NAME */}
              <div className="relative">

                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder=" "
                  className="peer w-full rounded-lg border border-gray-300 px-3 py-3 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />

                <label className="absolute left-3 top-3 text-gray-400 text-sm transition-all
                peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500
                peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm">

                  Full Name

                </label>

              </div>


              {/* EMAIL */}
              <div className="relative">

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder=" "
                  className="peer w-full rounded-lg border border-gray-300 px-3 py-3 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />

                <label className="absolute left-3 top-3 text-gray-400 text-sm transition-all
                peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500
                peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm">

                  Email Address

                </label>

              </div>


              {/* MESSAGE */}
              <div className="relative">

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  required
                  placeholder=" "
                  className="peer w-full rounded-lg border border-gray-300 px-3 py-3 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />

                <label className="absolute left-3 top-3 text-gray-400 text-sm transition-all
                peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500
                peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm">

                  Your Message

                </label>

              </div>


              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? "Sending Message..." : "Send Message"}
              </button>


              {/* SUCCESS */}
              {success && (
                <StatusAlert variant="success" className="text-center">
                  {success}
                </StatusAlert>
              )}


              {/* ERROR */}
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