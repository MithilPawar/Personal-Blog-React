import PageHero from "../components/ui/PageHero";
import SurfaceCard from "../components/ui/SurfaceCard";

const About = () => {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 md:py-10">
      {/* REVIEW NOTE: Wide hero + content grid to match BlogDetails page proportions. */}
      <PageHero
        title="Personal Blog"
        subtitle="Sharing knowledge, learning by building, and growing together."
      />

      <div className="grid gap-6 lg:grid-cols-12">
        <section className="space-y-6 lg:col-span-8">
          <SurfaceCard>
            <h2 className="text-2xl font-semibold text-gray-900">About this blog</h2>
            <p className="mt-4 text-base leading-relaxed text-gray-700 md:text-lg">
              Hi, I’m <span className="font-semibold text-gray-900">Mithil Pawar</span> 👋 This blog is my personal space where I
              share what I learn while building real-world web applications.
            </p>
            <p className="mt-4 text-base leading-relaxed text-gray-700 md:text-lg">
              The goal of this platform is simple — to document my journey as a developer and help others understand concepts
              through practical, hands-on examples.
            </p>
          </SurfaceCard>

          <SurfaceCard>
            <h2 className="text-2xl font-semibold text-gray-900">What You’ll Find Here</h2>
            <ul className="mt-5 grid gap-3 text-gray-700 sm:grid-cols-2">
              <li className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">⚛️ React & Frontend Development</li>
              <li className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">☕ Spring Boot & REST APIs</li>
              <li className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">🔐 Authentication & Security</li>
              <li className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">🧠 Core Computer Science Concepts</li>
              <li className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 sm:col-span-2">🚀 Full-stack Project Walkthroughs</li>
            </ul>
          </SurfaceCard>
        </section>

        <aside className="space-y-6 lg:col-span-4">
          <SurfaceCard padding="sm">
            <h3 className="text-xl font-semibold text-gray-900">My Approach</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-700 md:text-base">
              I strongly believe in learning by building and writing clean, maintainable code. Every article here is written
              with clarity in mind, especially for beginners who want practical, easy-to-follow guidance.
            </p>
          </SurfaceCard>

          <SurfaceCard className="border-blue-100 bg-blue-50" padding="sm">
            <h3 className="text-xl font-semibold text-blue-900">Let’s Keep Learning</h3>
            <p className="mt-3 text-sm leading-relaxed text-blue-800 md:text-base">
              If you enjoy the content, explore the blog, leave comments, and share your thoughts.
            </p>
            <p className="mt-4 text-base font-semibold text-blue-900">Happy learning! 🚀</p>
          </SurfaceCard>
        </aside>
      </div>
    </div>
  );
};

export default About;
