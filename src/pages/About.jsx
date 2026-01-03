const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-3
          bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
          bg-clip-text text-transparent">
          Lambda Life
        </h1>

        <p className="text-gray-600 text-lg">
          Sharing knowledge, learning by building, and growing together.
        </p>
      </div>

      {/* Content Wrapper */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-10">

        {/* Intro Section */}
        <section>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            Hi, I’m{" "}
            <span className="font-semibold text-gray-900">
              Mithil Pawar
            </span>{" "}
            👋  
            This blog is my personal space where I share what I learn while
            building real-world web applications.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            The goal of this platform is simple — to document my journey as a
            developer and help others understand concepts through practical,
            hands-on examples.
          </p>
        </section>

        {/* What This Blog Covers */}
        <section>
          <h2 className="text-2xl font-semibold mb-5 text-gray-900">
            What You’ll Find Here
          </h2>

          <ul className="grid sm:grid-cols-2 gap-4 text-gray-700">
            <li className="flex items-center gap-2">⚛️ React & Frontend Development</li>
            <li className="flex items-center gap-2">☕ Spring Boot & REST APIs</li>
            <li className="flex items-center gap-2">🔐 Authentication & Security</li>
            <li className="flex items-center gap-2">🧠 Core Computer Science Concepts</li>
            <li className="flex items-center gap-2">🚀 Full-stack Project Walkthroughs</li>
          </ul>
        </section>

        {/* Philosophy */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            My Approach
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed">
            I strongly believe in learning by building and writing clean,
            maintainable code. Every article here is written with clarity in
            mind, especially for beginners who want to understand how things
            work behind the scenes.
          </p>
        </section>

        {/* Call to Action */}
        <section className="text-center pt-4 border-t border-gray-100">
          <p className="text-lg text-gray-700 mb-3">
            If you enjoy the content, feel free to explore the blog, leave
            comments, and share your thoughts.
          </p>

          <p className="text-lg font-medium text-gray-900">
            Happy learning! 🚀
          </p>
        </section>

      </div>
    </div>
  );
};

export default About;
