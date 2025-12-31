const LandingPage = () => {
  return (
    <div className="w-full">
      {/* ---------------------- HERO SECTION ---------------------- */}
      <section className="bg-gray-50 pt-10 pb-10 px-6 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-snug">
          Welcome to <span className="text-blue-600">Lambda Life</span>
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          Share your ideas, explore meaningful stories, and discover insights
          written by creators from around the world.
        </p>

        <div className="flex justify-center space-x-4">
          <a
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition"
          >
            Explore Blogs
          </a>

          <a
            href="/login"
            className="px-6 py-3 border border-gray-300 rounded-lg text-lg font-medium hover:bg-gray-200 transition"
          >
            Sign In
          </a>
        </div>

        <div className="mt-14 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2"
            alt="People collaborating on ideas"
            className="rounded-2xl shadow-xl w-full max-w-4xl h-auto"
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
