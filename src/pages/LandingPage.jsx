const LandingPage = () => {
  return (
    <div className="w-full">
      {/* ---------------------- HERO SECTION ---------------------- */}
      <section className="bg-gray-50 py-20 px-6 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-snug">
          Welcome to <span className="text-blue-600">Blogify</span>
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          Share your ideas, explore meaningful stories, and discover insights
          written by creators from around the world.
        </p>

        <div className="flex justify-center space-x-4">
          <a
            href="/create"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition"
          >
            Start Writing
          </a>

          <a
            href="/signin"
            className="px-6 py-3 border border-gray-300 rounded-lg text-lg font-medium hover:bg-gray-200 transition"
          >
            Sign In
          </a>
        </div>

        <div className="mt-14 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2"
            alt="blog"
            className="rounded-2xl shadow-xl w-full max-w-3xl"
          />
        </div>
      </section>

      {/* ---------------------- LATEST BLOGS SECTION ---------------------- */}
      <section className="py-16 px-8 bg-white">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Latest Blogs
        </h2>

        <p className="text-gray-500 text-center mb-12">
          Explore some fresh content from our community
        </p>

        {/* blog cards container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">

          {/* --------- Card 1 --------- */}
          <div className="bg-gray-50 p-5 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
            <img
              src="https://source.unsplash.com/random/400x250?writing"
              className="rounded-lg mb-4"
              alt=""
            />
            <h3 className="text-xl font-semibold mb-2">The Future of Blogging</h3>
            <p className="text-gray-600 text-sm">
              Explore how AI and modern tools are changing the way people write.
            </p>
          </div>

          {/* --------- Card 2 --------- */}
          <div className="bg-gray-50 p-5 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
            <img
              src="https://source.unsplash.com/random/400x250?tech"
              className="rounded-lg mb-4"
              alt=""
            />
            <h3 className="text-xl font-semibold mb-2">Tech Trends 2025</h3>
            <p className="text-gray-600 text-sm">
              A quick overview of technology trends shaping the future.
            </p>
          </div>

          {/* --------- Card 3 --------- */}
          <div className="bg-gray-50 p-5 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
            <img
              src="https://source.unsplash.com/random/400x250?travel"
              className="rounded-lg mb-4"
              alt=""
            />
            <h3 className="text-xl font-semibold mb-2">Travel Stories</h3>
            <p className="text-gray-600 text-sm">
              See the world through the eyes of adventure-loving authors.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default LandingPage;
