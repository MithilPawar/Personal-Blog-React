import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="w-full">
      {/* ---------------------- HERO SECTION ---------------------- */}
      <section className="bg-gradient-to-b from-white to-blue-50/40 pt-14 pb-12 px-6 text-center rounded-2xl border border-blue-100/60">
        {/* REVIEW NOTE: Hero badge mirrors the new navbar logo text-mark for brand consistency. */}
        <div className="inline-flex items-center gap-2 bg-white border border-blue-100 rounded-full px-3 py-1 text-sm text-gray-700 mb-6 shadow-sm">
          <span className="h-6 w-6 rounded-full bg-blue-600 text-white grid place-items-center text-xs font-bold">LL</span>
          Lambda Life
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-snug">
          Build, Learn, and Share on <span className="text-blue-600">Lambda Life</span>
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          Share your ideas, explore meaningful stories, and discover insights
          written by creators from around the world.
        </p>

        <div className="flex justify-center gap-3 flex-wrap">
          <Link
            to="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg text-base font-medium hover:bg-blue-700 transition"
          >
            Explore Blogs
          </Link>

          <Link
            to="/login"
            className="px-6 py-3 border border-gray-300 rounded-lg text-base font-medium hover:bg-gray-100 transition"
          >
            Sign In
          </Link>

          <Link
            to="/register"
            className="px-6 py-3 border border-blue-200 text-blue-700 rounded-lg text-base font-medium hover:bg-blue-50 transition"
          >
            Create Account
          </Link>
        </div>

        <div className="mt-14 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2"
            alt="People collaborating on ideas"
            className="rounded-2xl shadow-xl w-full max-w-4xl h-auto border border-gray-100"
          />
        </div>
      </section>

      {/* ---------------------- FEATURES SECTION ---------------------- */}
      <section className="py-16 px-8 bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Why Choose Lambda Life?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="text-4xl mb-4">📖</div>
            <h3 className="text-xl font-semibold mb-2">Discover Stories</h3>
            <p className="text-gray-600">
              Explore diverse topics and insights from passionate writers worldwide.
            </p>
          </div>

          <div className="text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-2">Easy to Navigate</h3>
            <p className="text-gray-600">
              Find and read blogs effortlessly with our clean, user-friendly interface.
            </p>
          </div>

          <div className="text-center">
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
            <p className="text-gray-600">
              Connect with like-minded readers and join the conversation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
