const PageHero = ({
  title,
  subtitle,
  className = "",
  titleClassName = "",
  subtitleClassName = "",
}) => {
  const resolvedTitleClassName =
    titleClassName || "text-3xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl lg:text-5xl";

  const resolvedSubtitleClassName =
    subtitleClassName || "mt-3 max-w-3xl text-base leading-relaxed text-gray-600 dark:text-gray-300 md:text-lg";

  return (
    <section
      className={`mb-6 rounded-3xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-6 py-8 shadow-sm md:px-10 md:py-10 ${className}`}
    >
      <h1 className={resolvedTitleClassName}>
        {title}
      </h1>
      {subtitle ? (
        <p className={resolvedSubtitleClassName}>
          {subtitle}
        </p>
      ) : null}
    </section>
  );
};

export default PageHero;
