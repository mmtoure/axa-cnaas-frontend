import { forwardRef } from "react";

const Input = forwardRef(({ label, error, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-500 font-semibold">{label}</label>

      <input
        ref={ref}
        {...props}
        className={`border rounded px-3 py-2 focus:outline-none focus:ring-1
          ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}
        `}
      />

      {error && (
        <span className="text-xs text-red-500">{error}</span>
      )}
    </div>
  );
});

export default Input;