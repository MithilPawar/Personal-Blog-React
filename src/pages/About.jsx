import PageHero from "../components/ui/PageHero";
import SurfaceCard from "../components/ui/SurfaceCard";

const About = () => {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 md:py-6">

      <PageHero
        title="About Me"
        subtitle="Full-stack developer focused on building scalable web applications using Spring Boot and React."
        titleClassName="text-xl sm:text-xl md:text-2xl lg:text-2xl font-semibold"
      />

      <div className="grid gap-6 lg:grid-cols-12">

        {/* LEFT SIDE */}
        <section className="space-y-6 lg:col-span-8">

          {/* WHO I AM */}
          <SurfaceCard className="p-6" padding="sm">
            <h2 className="text-2xl font-semibold text-gray-900">
              Who I Am
            </h2>

            <p className="mt-4 text-base leading-relaxed text-gray-700 md:text-lg">
              Hi, I’m{" "}
              <span className="font-semibold text-gray-900">
                Mithil Pawar
              </span>
              , a Full-Stack Developer specializing in building modern web
              applications using{" "}
              <span className="font-medium">
                Java, Spring Boot, React, and MySQL
              </span>.
            </p>

            <p className="mt-4 text-base leading-relaxed text-gray-700 md:text-lg">
              I focus on writing clean, maintainable code and designing systems
              that are scalable, secure, and production-ready. My work combines
              strong backend architecture with responsive, user-friendly
              frontend interfaces.
            </p>

            <p className="mt-4 text-base leading-relaxed text-gray-700 md:text-lg">
              I continuously improve my skills by building real-world projects,
              learning modern development practices, and understanding how
              software works in production environments.
            </p>
          </SurfaceCard>

          {/* TECH STACK */}
          <SurfaceCard className="p-6" padding="sm">
            <h2 className="text-2xl font-semibold text-gray-900">
              Technical Skills
            </h2>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">

              <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                ⚛️ React, JavaScript, Tailwind CSS
              </div>

              <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                ☕ Java, Spring Boot, REST APIs
              </div>

              <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                🗄️ MySQL, Database Design
              </div>

              <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                🔐 JWT Authentication, Security
              </div>

              <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                🐙 Git, GitHub, Version Control
              </div>

              <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                🐳 Learning Docker & DevOps
              </div>

            </div>
          </SurfaceCard>

          {/* BLOG PURPOSE */}
          <SurfaceCard className="p-6" padding="sm">
            <h2 className="text-2xl font-semibold text-gray-900">
              Why This Blog Exists
            </h2>

            <p className="mt-4 text-base leading-relaxed text-gray-700 md:text-lg">
              This blog documents my journey as a developer — sharing practical
              lessons, real project experiences, and solutions to problems I
              encounter while building applications.
            </p>

            <p className="mt-4 text-base leading-relaxed text-gray-700 md:text-lg">
              My goal is to create content that is clear, practical, and useful
              for developers who want to learn real-world development beyond
              tutorials.
            </p>
          </SurfaceCard>

        </section>


        {/* RIGHT SIDE */}
        <aside className="space-y-6 lg:col-span-4">

          {/* CURRENT FOCUS */}
          <SurfaceCard className="p-6" padding="sm">
            <h3 className="text-xl font-semibold text-gray-900">
              Current Focus
            </h3>

            <ul className="mt-4 space-y-2 text-gray-700">
              <li>• Building full-stack production-ready applications</li>
              <li>• Improving backend architecture skills</li>
              <li>• Learning Docker and deployment workflows</li>
              <li>• Preparing for Software Developer roles</li>
            </ul>
          </SurfaceCard>


          {/* CAREER GOAL */}
          <SurfaceCard className="p-6" padding="sm">
            <h3 className="text-xl font-semibold text-gray-900">
              Career Objective
            </h3>

            <p className="mt-3 text-gray-700">
              I am currently seeking opportunities as a Software Developer
              where I can contribute to real-world projects, grow as an
              engineer, and build impactful software solutions.
            </p>
          </SurfaceCard>


          {/* CONNECT */}
          <SurfaceCard className="border-blue-100 bg-blue-50 p-6" padding="sm">
            <h3 className="text-xl font-semibold text-blue-900">
              Let’s Connect
            </h3>

            <p className="mt-3 text-blue-800">
              Feel free to connect with me for collaboration, discussion,
              or opportunities.
            </p>

            <p className="mt-4 font-semibold text-blue-900">
              Thank you for visiting.
            </p>
          </SurfaceCard>

        </aside>

      </div>
    </div>
  );
};

export default About;