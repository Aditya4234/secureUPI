"use client";

export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required = false,
  className = "",
  ...props
}) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-zinc-700">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition ${
          error
            ? "border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500"
            : "border-zinc-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

