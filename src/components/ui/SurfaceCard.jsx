const paddingBySize = {
  md: "p-6 md:p-8",
  sm: "p-6 md:p-7",
};

const SurfaceCard = ({ children, className = "", padding = "md" }) => {
  return (
    <article className={`rounded-2xl border border-gray-200 bg-white shadow-sm ${paddingBySize[padding] || paddingBySize.md} ${className}`}>
      {children}
    </article>
  );
};

export default SurfaceCard;
