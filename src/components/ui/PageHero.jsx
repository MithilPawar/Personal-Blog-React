const PageHero = ({ title, subtitle, className = "" }) => {
  return (
    <section
      className={`mb-6 rounded-3xl border border-gray-200 bg-white px-6 py-8 shadow-sm md:px-10 md:py-10 ${className}`}
    >
      <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">{title}</h1>
      {subtitle ? (
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg">{subtitle}</p>
      ) : null}
    </section>
  );
};

export default PageHero;
