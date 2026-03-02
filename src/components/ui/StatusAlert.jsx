const stylesByVariant = {
  neutral: "border-blue-100 bg-blue-50 text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-blue-300",
  success: "border-green-200 bg-green-50 text-green-700 dark:border-green-900/60 dark:bg-green-950/30 dark:text-green-300",
  error: "border-red-200 bg-red-50 text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300",
};

const StatusAlert = ({ children, variant = "neutral", className = "" }) => {
  return (
    <div className={`rounded-xl border px-4 py-3 text-sm ${stylesByVariant[variant] || stylesByVariant.neutral} ${className}`}>
      {children}
    </div>
  );
};

export default StatusAlert;
