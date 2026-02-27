const stylesByVariant = {
  neutral: "border-blue-100 bg-blue-50 text-blue-700",
  success: "border-green-200 bg-green-50 text-green-700",
  error: "border-red-200 bg-red-50 text-red-700",
};

const StatusAlert = ({ children, variant = "neutral", className = "" }) => {
  return (
    <div className={`rounded-xl border px-4 py-3 text-sm ${stylesByVariant[variant] || stylesByVariant.neutral} ${className}`}>
      {children}
    </div>
  );
};

export default StatusAlert;
